const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

router.get('/', async (req, res) => {
  try {
    // populate('keeps') is a mongoose method that allows us to populate the userKeeps field with the actual keep objects
    const user = await User.find().populate('keeps');
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
