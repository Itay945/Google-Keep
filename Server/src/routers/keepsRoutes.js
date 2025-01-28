const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');
// const { default: mongoose } = require('mongoose');
const {
  getAllKeeps,
  getAllKeepsInTrash,
  addNewKeep,
  editKeep,
  moveKeepsToTrash,
  getKeepById,
  getUserKeeps,
} = require('../controllers/keepsController');
const authToken = require('../middlewares/auth.middleware');

router.get('/', getAllKeeps);

// get all keeps in the trash
router.get('/trash', getAllKeepsInTrash);

//post new keep
router.post('/', addNewKeep);

// delete keep by id
router.patch('/:id/trash', moveKeepsToTrash);
// commit
// get all keeps of specific user
router.get('/user/:userId', getUserKeeps);

// get keep by his id
router.get('/:id', getKeepById);
//
// update keep description by his id
router.put('/:id', editKeep);

module.exports = router;
