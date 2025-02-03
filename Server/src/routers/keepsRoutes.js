const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');
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
  getKeepsByLabel,
  addLabelToKeep,
  removeLabelFromKeep,
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

// get all keeps of specific user
router.get('/user/:userId', getUserKeeps);

// Label related routes
router.get('/labels/:labelName', getKeepsByLabel);
router.post('/:id/labels', addLabelToKeep);
router.delete('/:id/labels/:labelName', removeLabelFromKeep);

// get keep by his id
router.get('/:id', getKeepById);

// update keep description by his id
router.put('/:id', editKeep);

// Route to restore a keep from trash
router.patch('/trash/:id/restore', restoreKeepFromTrash);

// Route to permanently delete a keep
router.delete('/trash/:id', permanentlyDeleteKeep);

module.exports = router;
