// Simple file-based storage for testing without MongoDB
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const PROVIDERS_FILE = path.join(DATA_DIR, 'providers.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize providers file if it doesn't exist
if (!fs.existsSync(PROVIDERS_FILE)) {
  fs.writeFileSync(PROVIDERS_FILE, JSON.stringify([], null, 2));
}

// Read providers from file
function readProviders() {
  try {
    const data = fs.readFileSync(PROVIDERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading providers:', error);
    return [];
  }
}

// Write providers to file
function writeProviders(providers) {
  try {
    fs.writeFileSync(PROVIDERS_FILE, JSON.stringify(providers, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing providers:', error);
    return false;
  }
}

// Generate ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
  // Get all providers
  findAll: (query = {}) => {
    let providers = readProviders();
    
    // Apply filters
    if (query.isActive !== undefined) {
      providers = providers.filter(p => p.isActive === query.isActive);
    }
    
    if (query.area) {
      const areaRegex = new RegExp(query.area, 'i');
      providers = providers.filter(p => 
        p.areas && p.areas.some(a => areaRegex.test(a))
      );
    }
    
    if (query.serviceType) {
      providers = providers.filter(p => p.serviceType === query.serviceType);
    }
    
    if (query.workType) {
      providers = providers.filter(p => p.workType === query.workType);
    }
    
    if (query.minPrice || query.maxPrice) {
      providers = providers.filter(p => {
        if (!p.priceRange) return false;
        const min = query.minPrice ? parseInt(query.minPrice) : 0;
        const max = query.maxPrice ? parseInt(query.maxPrice) : Infinity;
        return p.priceRange.max >= min && p.priceRange.min <= max;
      });
    }
    
    if (query.minHours || query.maxHours) {
      const minH = query.minHours ? parseInt(query.minHours) : 0;
      const maxH = query.maxHours ? parseInt(query.maxHours) : 24;
      providers = providers.filter(p => 
        p.dutyHours >= minH && p.dutyHours <= maxH
      );
    }
    
    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      providers = providers.filter(p =>
        (p.name && searchRegex.test(p.name)) ||
        (p.serviceType && searchRegex.test(p.serviceType)) ||
        (p.description && searchRegex.test(p.description))
      );
    }
    
    return providers;
  },
  
  // Find one provider
  findOne: (query) => {
    const providers = readProviders();
    return providers.find(p => {
      for (const key in query) {
        if (p[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  },
  
  // Find by ID
  findById: (id) => {
    const providers = readProviders();
    return providers.find(p => p._id === id || p.id === id);
  },
  
  // Create provider
  create: (data) => {
    const providers = readProviders();
    const newProvider = {
      _id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    providers.push(newProvider);
    writeProviders(providers);
    return newProvider;
  },
  
  // Update provider
  findByIdAndUpdate: (id, update, options = {}) => {
    const providers = readProviders();
    const index = providers.findIndex(p => p._id === id || p.id === id);
    
    if (index === -1) {
      return null;
    }
    
    providers[index] = {
      ...providers[index],
      ...update,
      updatedAt: new Date().toISOString()
    };
    
    writeProviders(providers);
    return providers[index];
  },
  
  // Delete provider (soft delete)
  findByIdAndDelete: (id) => {
    return this.findByIdAndUpdate(id, { isActive: false });
  }
};

