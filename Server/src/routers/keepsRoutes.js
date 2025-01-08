const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');

router.get('/', async (req, res) => {
  try {
    const keeps = await Keep.find();
    res.json(keeps);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const keep = new Keep(req.body);
    await keep.save();
    res.json({ keep });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
