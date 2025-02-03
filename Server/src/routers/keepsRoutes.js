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
  setReminder,
  getKeepsWithReminders,
  getPinnedKeeps,
  getUnpinnedKeeps,
  restoreKeepFromTrash,
  permanentlyDeleteKeep,
  // updateKeepPosition,
} = require('../controllers/keepsController');
const authToken = require('../middlewares/auth.middleware');

router.get('/', getAllKeeps);

// get all keeps in the trash
router.get('/trash', getAllKeepsInTrash);

router.get('/filter/pinned', getPinnedKeeps);

router.get('/filter/unpinned', getUnpinnedKeeps);

//post new keep
router.post('/', addNewKeep);

//reminder routes
router.patch('/:id/reminder', setReminder);
router.get('/reminders/all', getKeepsWithReminders);

// commit
// get all keeps of specific user
router.get('/user/:userId', getUserKeeps);

// get keep by his id
router.get('/:id', getKeepById);
//
// update keep description by his id
router.put('/:id', editKeep);
// router.patch('/position/:id', updateKeepPosition);
// Route to restore a keep from trash
router.patch('/trash/:id/restore', restoreKeepFromTrash);

// Route to permanently delete a keep
router.delete('/trash/:id', permanentlyDeleteKeep);

module.exports = router;
