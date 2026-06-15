const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    length: 12
  },
  aadharVerified: {
    type: Boolean,
    default: false
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['labour', 'tailoring', 'electrician', 'teacher', 'staff', 'plumber', 'carpenter', 'painter', 'other']
  },
  areas: [{
    type: String,
    required: true
  }],
  priceRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  workType: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'yearly']
  },
  dutyHours: {
    type: Number,
    required: true,
    min: 1,
    max: 24
  },
  experience: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ServiceProviderSchema.index({ areas: 1, serviceType: 1, priceRange: 1 });
ServiceProviderSchema.index({ aadharNumber: 1 });

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);

