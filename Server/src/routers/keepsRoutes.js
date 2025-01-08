const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');

router.get('/', (req, res) => {
  res.json({ name: 'yoav' });
});

module.exports = router;
