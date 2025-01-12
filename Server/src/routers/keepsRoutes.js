const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');
const { default: mongoose } = require('mongoose');
const {
  getAllKeeps,
  getAllKeepsInTrash,
  addNewKeep,
  moveKeepsToTrash,
  getKeepById,
} = require('../controllers/keepsController');

router.get('/', getAllKeeps);

// get all keeps in the trash
router.get('/trash', getAllKeepsInTrash);

//post new keep
router.post('/', addNewKeep);

// delete keep by id
router.patch('/:id/trash', moveKeepsToTrash);
// commit

// get keep by his id
router.get('/:id', getKeepById);
module.exports = router;
