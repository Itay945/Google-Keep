const Keep = require('../models/Keep.model');
const User = require('../models/User.model');

// Error handler helper
const handleError = (res, error, statusCode = 500) => {
  console.error('Error:', error);
  const message = error.message || 'An unexpected error occurred';
  res.status(statusCode).json({ success: false, message });
};

// Response helper
const sendResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

const getAllKeeps = async (req, res) => {
  try {
    const keeps = await Keep.find({ isDeleted: false });
    sendResponse(res, { keeps });
  } catch (error) {
    handleError(res, error);
  }
};

const getAllKeepsInTrash = async (req, res) => {
  try {
    const keeps = await Keep.find({
      isDeleted: true,
      author: req.user.userId,
    });
    sendResponse(res, { keeps });
  } catch (error) {
    handleError(res, error);
  }
};

const addNewKeep = async (req, res) => {
  try {
    const { title, description, reminderDate } = req.body;

    // Validation
    if (!title && !description) {
      return handleError(
        res,
        new Error('Title or description is required'),
        400
      );
    }

    // Validate reminder date if provided
    if (reminderDate) {
      const reminderDateTime = new Date(reminderDate);
      if (reminderDateTime < new Date()) {
        return handleError(
          res,
          new Error('Reminder date must be in the future'),
          400
        );
      }
    }
    const lastKeep = await Keep.findOne({ isDeleted: false })
      .sort('-position')
      .limit(1);
    const position = lastKeep ? lastKeep.position + 1 : 0;

    const keep = new Keep({
      ...req.body,
      author: req.user.userId,
      position,
      reminderDate: reminderDate || null,
    });

    await keep.save();

    // Add to user's keeps
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { userKeeps: keep._id },
    });

    sendResponse(res, { keep }, 201);
  } catch (error) {
    handleError(res, error);
  }
};

const editKeep = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = {
      ...req.body,
      editedAt: new Date(),
    };
    const keep = await Keep.findOneAndUpdate(
      {
        _id: id,
        author: req.user.userId,
      },
      { $set: updates },
      { new: true }
    );

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

const setReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reminderDate } = req.body;

    // Validate the date if provided
    if (reminderDate) {
      const reminderDateTime = new Date(reminderDate);
      if (reminderDateTime < new Date()) {
        return handleError(
          res,
          new Error('Reminder date must be in the future'),
          400
        );
      }
    }

    const keep = await Keep.findOneAndUpdate(
      {
        _id: id,
        author: req.user.userId,
      },
      {
        $set: { reminderDate: reminderDate || null },
      },
      { new: true }
    );

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

const getKeepsWithReminders = async (req, res) => {
  try {
    const keeps = await Keep.find({
      author: req.user.userId,
      reminderDate: { $ne: null },
      isDeleted: false,
    }).sort({ reminderDate: 1 });

    sendResponse(res, { keeps });
  } catch (error) {
    handleError(res, error);
  }
};

const moveKeepsToTrash = async (req, res) => {
  try {
    const keep = await Keep.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user.userId,
      },
      { isDeleted: true },
      { new: true }
    );

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

const restoreKeepFromTrash = async (req, res) => {
  try {
    const keep = await Keep.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user.userId,
        isDeleted: true,
      },
      {
        isDeleted: false,
        editedAt: new Date(),
      },
      { new: true }
    );

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

const permanentlyDeleteKeep = async (req, res) => {
  try {
    const keep = await Keep.findOne({
      _id: req.params.id,
      author: req.user.userId,
      isDeleted: true,
    });

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { userKeeps: keep._id },
    });

    await Keep.findByIdAndDelete(req.params.id);

    sendResponse(res, { message: 'Keep permanently deleted' });
  } catch (error) {
    handleError(res, error);
  }
};

const getKeepById = async (req, res) => {
  try {
    const keep = await Keep.findById(req.params.id);

    if (!keep) {
      return handleError(res, new Error('Keep not found'), 404);
    }

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

const getUserKeeps = async (req, res) => {
  try {
    const keeps = await Keep.find({
      author: req.params.userId,
      isDeleted: false,
    });

    sendResponse(res, { keeps });
  } catch (error) {
    handleError(res, error);
  }
};

const getPinnedKeeps = async (req, res) => {
  try {
    const pinnedKeeps = await Keep.find({
      author: req.user.userId,
      pin: true,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    sendResponse(res, { keeps: pinnedKeeps });
  } catch (error) {
    handleError(res, error);
  }
};

const getUnpinnedKeeps = async (req, res) => {
  try {
    const unpinnedKeeps = await Keep.find({
      author: req.user.userId,
      pin: false,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    sendResponse(res, { keeps: unpinnedKeeps });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all keeps that have a specific label
const getKeepsByLabel = async (req, res) => {
  try {
    const { labelName } = req.params;

    const keeps = await Keep.find({
      author: req.user.userId,
      labels: labelName,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    sendResponse(res, { keeps });
  } catch (error) {
    handleError(res, error);
  }
};

// Add a label to a keep
const addLabelToKeep = async (req, res) => {
  try {
    const { id } = req.params;
    const { labelName } = req.body;

    if (!labelName) {
      return handleError(res, new Error('Label name is required'), 400);
    }

    // Verify the label exists in user's labels
    const user = await User.findById(req.user.userId);
    const labelExists = user.labels.some((label) => label.name === labelName);

    if (!labelExists) {
      return handleError(res, new Error('Label does not exist'), 404);
    }

    const keep = await Keep.findOne({
      _id: id,
      author: req.user.userId,
    });

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    // Check if label is already added to the keep
    if (keep.labels.includes(labelName)) {
      return handleError(
        res,
        new Error('Label already added to this keep'),
        400
      );
    }

    // Add the label
    keep.labels.push(labelName);
    await keep.save();

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

// Remove a label from a keep
const removeLabelFromKeep = async (req, res) => {
  try {
    const { id, labelName } = req.params;

    const keep = await Keep.findOne({
      _id: id,
      author: req.user.userId,
    });

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    // Check if the label exists in the keep
    const labelIndex = keep.labels.indexOf(labelName);
    if (labelIndex === -1) {
      return handleError(res, new Error('Label not found in this keep'), 404);
    }

    // Remove the label
    keep.labels.splice(labelIndex, 1);
    await keep.save();

    sendResponse(res, { keep });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
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
};
