const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

router.get('/', (req, res) => {
  res.send('Hello from usersRoutes');
});

module.exports = router;
