const express = require('express');
const router = express.Router();
const Keep = require('../models/Keep.model');
const { default: mongoose } = require('mongoose');
const {
  getAllKeeps,
  getAllKeepsInTrash,
  addNewKeep,
  editKeep,
  moveKeepsToTrash,
  getKeepById,
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

// get keep by his id
router.get('/:id', getKeepById);

// update keep description by his id
router.put('/:id', editKeep);

// update title of keep by his id

// router.put('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;

//     const { title } = req.body;
//     console.log();

//     const keepToUpdated = await Keep.findByIdAndUpdate(
//       id,
//       { title: title },
//       { new: true }
//     );
//     console.log(keepToUpdated);
//     res.json(keepToUpdated);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

module.exports = router;
