// labelController.js
const User = require('../models/User.model');
const Keep = require('../models/Keep.model');
const mongoose = require('mongoose');

// Helper functions (reuse from other controllers)
const handleError = (res, error, statusCode = 500) => {
  console.error('Error:', error);
  const message = error.message || 'An unexpected error occurred';
  res.status(statusCode).json({ success: false, message });
};

const sendResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

// Add new label
const addLabel = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return handleError(res, new Error('Label name is required'), 400);
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return handleError(res, new Error('User not found'), 404);
    }

    // Check if label already exists
    const labelExists = user.labels.some(
      (label) => label.name.toLowerCase() === name.toLowerCase()
    );

    if (labelExists) {
      return handleError(res, new Error('Label already exists'), 400);
    }

    const newLabel = { name };
    user.labels.push(newLabel);
    await user.save();

    sendResponse(res, { label: newLabel }, 201);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete label
const deleteLabel = async (req, res) => {
  try {
    const { labelId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return handleError(res, new Error('User not found'), 404);
    }

    const labelIndex = user.labels.findIndex(
      (label) => label.id.toString() === labelId
    );

    if (labelIndex === -1) {
      return handleError(res, new Error('Label not found'), 404);
    }

    // Before deleting the label, we should also remove it from all keeps
    await Keep.updateMany(
      { author: req.user.userId },
      { $pull: { labels: user.labels[labelIndex].name } }
    );

    user.labels.splice(labelIndex, 1);
    await user.save();

    sendResponse(res, { message: 'Label deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// Edit label
const editLabel = async (req, res) => {
  try {
    const { labelId } = req.params;
    const { name } = req.body;

    if (!name) {
      return handleError(res, new Error('Label name is required'), 400);
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return handleError(res, new Error('User not found'), 404);
    }

    const label = user.labels.id(labelId);
    if (!label) {
      return handleError(res, new Error('Label not found'), 404);
    }

    // Check if the new name already exists in other labels
    const labelExists = user.labels.some(
      (existingLabel) =>
        existingLabel.id.toString() !== labelId &&
        existingLabel.name.toLowerCase() === name.toLowerCase()
    );

    if (labelExists) {
      return handleError(res, new Error('Label name already exists'), 400);
    }

    // Store old name for updating keeps
    const oldName = label.name;

    // Update label name
    label.name = name;
    await user.save();

    // Update the label name in all keeps that use this label
    await Keep.updateMany(
      {
        author: req.user.userId,
        labels: oldName,
      },
      {
        $set: {
          'labels.$': name,
        },
      }
    );

    sendResponse(res, { label });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all user labels
const getUserLabels = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return handleError(res, new Error('User not found'), 404);
    }

    sendResponse(res, { labels: user.labels });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  addLabel,
  deleteLabel,
  editLabel,
  getUserLabels,
};
