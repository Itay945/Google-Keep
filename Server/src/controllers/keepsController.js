const Keep = require('../models/Keep.model');

const getAllKeeps = async (req, res) => {
  try {
    const keeps = await Keep.find();
    res.json(keeps);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllKeepsInTrash = async (req, res) => {
  try {
    const trashKeeps = await Keep.find({ isDeleted: true });
    console.log('Trash keeps:', trashKeeps);
    res.json(trashKeeps);
  } catch (error) {
    console.log(error.message);
  }
};

const addNewKeep = async (req, res) => {
  try {
    if (!req.body.title && !req.body.description) {
      return res.status(402).json({ error: 'title or description require' });
    }

    const keep = new Keep(req.body);
    // keep.author = req.user.userId;
    await keep.save();
    res.json({ keep });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editKeep = async (req, res) => {
  try {
    const id = req.params.id;

    const { description, title, color, labels } = req.body;
    const editedAt = new Date();
    const keepToUpdated = await Keep.findByIdAndUpdate(
      id,
      {
        $set: {
          description: description,
          title: title,
          color: color,
          editedAt: editedAt,
          labels: labels,
        },
        // instead set i can use the next line:
        // { new: true, fields: { createdAt: 0 } } // Exclude createdAt from being updated
      },
      { new: true }
    );
    console.log(keepToUpdated);
    res.json(keepToUpdated);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const moveKeepsToTrash = async (req, res) => {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getKeepById = async (req, res) => {
  try {
    const keep = await Keep.findById(req.params.id);
    res.json(keep);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllKeeps,
  getAllKeepsInTrash,
  addNewKeep,
  editKeep,
  moveKeepsToTrash,
  getKeepById,
};
