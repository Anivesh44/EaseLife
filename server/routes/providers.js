const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ServiceProvider = require('../models/ServiceProvider');
const fileStorage = require('../storage/fileStorage');

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all service providers with filters
router.get('/', async (req, res) => {
  try {
    const {
      area,
      serviceType,
      minPrice,
      maxPrice,
      workType,
      minHours,
      maxHours,
      search
    } = req.query;

    let providers;
    
    // Use MongoDB if connected, otherwise use file storage
    if (isMongoConnected()) {
      try {
        let query = { isActive: true };

        // Area filter
        if (area) {
          query.areas = { $in: [new RegExp(area, 'i')] };
        }

        // Service type filter
        if (serviceType) {
          query.serviceType = serviceType;
        }

        // Price range filter - find providers whose price range overlaps with user's range
        if (minPrice || maxPrice) {
          query.$and = query.$and || [];
          const min = minPrice ? parseInt(minPrice) : 0;
          const max = maxPrice ? parseInt(maxPrice) : Number.MAX_SAFE_INTEGER;
          // Provider's range overlaps if: provider.min <= user.max AND provider.max >= user.min
          query.$and.push({ 'priceRange.min': { $lte: max } });
          query.$and.push({ 'priceRange.max': { $gte: min } });
        }

        // Work type filter
        if (workType) {
          query.workType = workType;
        }

        // Duty hours filter
        if (minHours || maxHours) {
          query.dutyHours = {};
          if (minHours) query.dutyHours.$gte = parseInt(minHours);
          if (maxHours) query.dutyHours.$lte = parseInt(maxHours);
        }

        // Search filter
        if (search) {
          query.$or = [
            { name: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { serviceType: new RegExp(search, 'i') }
          ];
        }

        providers = await ServiceProvider.find(query)
          .sort({ rating: -1, createdAt: -1 })
          .limit(50)
          .maxTimeMS(5000);
      } catch (mongoError) {
        console.error('MongoDB query error, using file storage:', mongoError);
        // Fall through to file storage
      }
    }
    
    // Use file storage if MongoDB not available or failed
    if (!providers) {
      const query = {
        isActive: true,
        area,
        serviceType,
        minPrice,
        maxPrice,
        workType,
        minHours,
        maxHours,
        search
      };
      providers = fileStorage.findAll(query);
      // Sort and limit
      providers = providers
        .sort((a, b) => (b.rating || 0) - (a.rating || 0) || new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 50);
    }

    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    
    // Try file storage as fallback
    try {
      const providers = fileStorage.findAll({ isActive: true });
      return res.json(providers);
    } catch (fallbackError) {
      console.error('File storage fallback error:', fallbackError);
      res.status(500).json({ error: error.message, providers: [] });
    }
  }
});

// Get single provider
router.get('/:id', async (req, res) => {
  try {
    let provider;
    
    if (isMongoConnected()) {
      provider = await ServiceProvider.findById(req.params.id);
    } else {
      provider = fileStorage.findById(req.params.id);
    }
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new service provider
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phone,
      aadharNumber,
      serviceType,
      areas,
      priceRange,
      workType,
      dutyHours,
      experience,
      description
    } = req.body;

    // Validate Aadhar number (12 digits)
    if (!/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({ error: 'Invalid Aadhar number. Must be 12 digits.' });
    }

    // Check if Aadhar already exists
    let existingProvider;
    if (isMongoConnected()) {
      try {
        existingProvider = await ServiceProvider.findOne({ aadharNumber }).maxTimeMS(5000);
      } catch (dbError) {
        console.error('Database query error:', dbError);
        // Fall through to file storage
      }
    }
    
    // If MongoDB failed or not connected, use file storage
    if (!isMongoConnected() || existingProvider === undefined) {
      existingProvider = fileStorage.findOne({ aadharNumber });
    }

    if (existingProvider) {
      return res.status(400).json({ error: 'Aadhar number already registered' });
    }

    // Create provider
    let provider;
    if (isMongoConnected()) {
      try {
        provider = new ServiceProvider({
          name,
          phone,
          aadharNumber,
          serviceType,
          areas: Array.isArray(areas) ? areas : [areas],
          priceRange,
          workType,
          dutyHours,
          experience: experience || 0,
          description
        });
        await provider.save();
      } catch (dbError) {
        console.error('MongoDB save error, using file storage:', dbError);
        // Fall through to file storage
      }
    }
    
    // Use file storage if MongoDB not available or failed
    if (!provider) {
      provider = fileStorage.create({
        name,
        phone,
        aadharNumber,
        serviceType,
        areas: Array.isArray(areas) ? areas : [areas],
        priceRange,
        workType,
        dutyHours,
        experience: experience || 0,
        description,
        rating: 0,
        totalReviews: 0,
        aadharVerified: false
      });
    }

    res.status(201).json(provider);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message || 'Registration failed. Please try again.' });
  }
});

// Update provider
router.put('/:id', async (req, res) => {
  try {
    let provider;
    
    if (isMongoConnected()) {
      provider = await ServiceProvider.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    } else {
      provider = fileStorage.findByIdAndUpdate(req.params.id, req.body);
    }
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify Aadhar
router.patch('/:id/verify', async (req, res) => {
  try {
    let provider;
    
    if (isMongoConnected()) {
      provider = await ServiceProvider.findByIdAndUpdate(
        req.params.id,
        { aadharVerified: true },
        { new: true }
      );
    } else {
      provider = fileStorage.findByIdAndUpdate(req.params.id, { aadharVerified: true });
    }
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete provider
router.delete('/:id', async (req, res) => {
  try {
    let provider;
    
    if (isMongoConnected()) {
      provider = await ServiceProvider.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
    } else {
      provider = fileStorage.findByIdAndUpdate(req.params.id, { isActive: false });
    }
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json({ message: 'Provider deactivated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

