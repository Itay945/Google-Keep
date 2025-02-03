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

// const addNewKeep = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     // Validation
//     if (!title && !description) {
//       return handleError(
//         res,
//         new Error('Title or description is required'),
//         400
//       );
//     }

//     const keep = new Keep({ ...req.body, author: req.user.userId });
//     // keep.author = req.user.userId;
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

// reminder option
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
// const updateKeepPosition = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { position, pin } = req.body;

//     const currentKeep = await Keep.findById(id);

//     if (!currentKeep) {
//       return handleError(res, new Error('Keep not found or unauthorized'), 404);
//     }

//     const keepAtTargetPosition = await Keep.findOne({
//       position: position,
//       pin: pin,
//       isDeleted: false,
//     });

//     if (keepAtTargetPosition) {
//       await Keep.findByIdAndUpdate(
//         keepAtTargetPosition._id,
//         { position: currentKeep.position },
//         { new: true }
//       );
//     }

//     const updatedKeep = await Keep.findByIdAndUpdate(
//       id,
//       {
//         position: position,
//         pin: pin,
//       },
//       { new: true }
//     );

//     const keeps = await Keep.find({ isDeleted: false });

//     res.status(200).json({
//       success: true,
//       data: {
//         keep: updatedKeep,
//         keeps: keeps,
//       },
//     });
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

const restoreKeepFromTrash = async (req, res) => {
  try {
    // Find the keep and ensure it belongs to the requesting user
    const keep = await Keep.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user.userId,
        isDeleted: true, // Ensure the keep is actually in trash
      },
      {
        isDeleted: false,
        editedAt: new Date(), // Update the edit timestamp
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
    // Find the keep and ensure it belongs to the requesting user
    const keep = await Keep.findOne({
      _id: req.params.id,
      author: req.user.userId,
      isDeleted: true, // Only allow permanent deletion of items in trash
    });

    if (!keep) {
      return handleError(res, new Error('Keep not found or unauthorized'), 404);
    }

    // Remove the keep reference from the user's userKeeps array
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { userKeeps: keep._id },
    });

    // Permanently delete the keep
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
    // Get all pinned keeps for the authenticated user that aren't deleted
    const pinnedKeeps = await Keep.find({
      author: req.user.userId,
      pin: true,
      isDeleted: false,
    }).sort({ createdAt: -1 }); // Sort by creation date, newest first

    sendResponse(res, { keeps: pinnedKeeps });
  } catch (error) {
    handleError(res, error);
  }
};

const getUnpinnedKeeps = async (req, res) => {
  try {
    // Get all unpinned keeps for the authenticated user that aren't deleted
    const unpinnedKeeps = await Keep.find({
      author: req.user.userId,
      pin: false,
      isDeleted: false,
    }).sort({ createdAt: -1 }); // Sort by creation date, newest first

    sendResponse(res, { keeps: unpinnedKeeps });
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
  // updateKeepPosition,
};
