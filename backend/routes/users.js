const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role, emailNotifications: user.emailNotifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/me', auth, async (req, res) => {
  try {
    const { name, emailNotifications } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.name = name || user.name;
    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    await user.save();
    
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role, emailNotifications: user.emailNotifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.deleteOne();
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
