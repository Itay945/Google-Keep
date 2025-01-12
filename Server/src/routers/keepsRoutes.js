const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');
const { default: mongoose } = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const keeps = await Keep.find();
    res.json(keeps);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//post new keep
router.post('/', async (req, res) => {
  try {
    if (!req.body.title && !req.body.description) {
      return res.status(402).json({ error: 'title or description require' });
    }

    const keep = new Keep(req.body);
    await keep.save();
    res.json({ keep });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete keep by id
router.patch('/:id/trash', async (req, res) => {
  try {
    console.log(req.params.id);
    const trash = await Keep.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
      },
      { new: true }
    );
    res.json({ trash });
  } catch (error) {}
});
// commit
module.exports = router;
