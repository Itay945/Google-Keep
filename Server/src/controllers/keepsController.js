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
    const { title, description } = req.body;

    // Validation
    if (!title && !description) {
      return handleError(
        res,
        new Error('Title or description is required'),
        400
      );
    }

    const keep = new Keep({ ...req.body, author: req.user.userId });
    // keep.author = req.user.userId;
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

//reminder option
// const addNewKeep = async (req, res) => {
//   try {
//     const { title, description, reminderDate } = req.body;

//     // Validation
//     if (!title && !description) {
//       return handleError(res, new Error('Title or description is required'), 400);
//     }

//     // Validate reminder date if provided
//     if (reminderDate) {
//       const reminderDateTime = new Date(reminderDate);
//       if (reminderDateTime < new Date()) {
//         return handleError(res, new Error('Reminder date must be in the future'), 400);
//       }
//     }

//     const keep = new Keep({
//       ...req.body,
//       author: req.user.userId,
//       reminderDate: reminderDate || null
//     });

//     await keep.save();

//     // Add to user's keeps
//     await User.findByIdAndUpdate(req.user.userId, {
//       $push: { userKeeps: keep._id },
//     });

//     sendResponse(res, { keep }, 201);
//   } catch (error) {
//     handleError(res, error);
//   }
// };

const editKeep = async (req, res) => {
  try {
    const { id } = req.params;

    // description, title, color, labels, pin, isDeleted
    const updates = {
      ...req.body,
      editedAt: new Date(),
    };
    const keep = await Keep.findOneAndUpdate(
      {
        _id: id,
        author: req.user.userId, // Ensure user owns the keep
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
        author: req.user.userId, // Ensure user owns the keep
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
};
