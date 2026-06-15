const express = require('express');
const router = express.Router();

// Admin login (demo - in production use secure authentication)
router.post('/admin/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    // Demo password - in production, use secure authentication
    if (password === 'admin123') {
      res.json({ 
        success: true, 
        message: 'Login successful',
        token: 'demo_admin_token' // In production, use JWT
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid password' 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin logout
router.post('/admin/logout', async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Simple authentication routes (can be extended later)
router.post('/register', async (req, res) => {
  // Placeholder for user registration
  res.json({ message: 'Registration endpoint - to be implemented' });
});

router.post('/login', async (req, res) => {
  // Placeholder for user login
  res.json({ message: 'Login endpoint - to be implemented' });
});

module.exports = router;

