import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Update } from "../models/update.model.js";

// Create a new update (GlobalAdmin only)
const createUpdate = asyncHandler(async (req, res) => {
  const { title, content, author, tags, imageUrl } = req.body;

  if (!title || !content || !author) {
    throw new ApiError(400, "Title, content, and author are required");
  }

  const update = await Update.create({
    title,
    content,
    author,
    imageUrl: imageUrl || null,
    tags: tags || [],
  });

  return res.status(201).json(
    new ApiResponse(201, update, "Update created successfully")
  );
});

// Get all published updates
const getAllUpdates = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  const query = { isPublished: true };

  // Add search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  const skip = (page - 1) * limit;

  const updates = await Update.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Update.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(200, {
      updates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }, "Updates fetched successfully")
  );
});

// Get update by ID
const getUpdateById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const update = await Update.findById(id);

  if (!update) {
    throw new ApiError(404, "Update not found");
  }

  return res.status(200).json(
    new ApiResponse(200, update, "Update fetched successfully")
  );
});

// Update an existing update (GlobalAdmin only)
const updateUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, isPublished, imageUrl } = req.body;

  const update = await Update.findById(id);

  if (!update) {
    throw new ApiError(404, "Update not found");
  }

  const updatedUpdate = await Update.findByIdAndUpdate(
    id,
    {
      $set: {
        ...(title && { title }),
        ...(content && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(tags && { tags }),
        ...(typeof isPublished === 'boolean' && { isPublished }),
      }
    },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedUpdate, "Update updated successfully")
  );
});

// Delete an update (GlobalAdmin only)
const deleteUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const update = await Update.findById(id);

  if (!update) {
    throw new ApiError(404, "Update not found");
  }

  await Update.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(200, {}, "Update deleted successfully")
  );
});

// Toggle update publish status (GlobalAdmin only)
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const update = await Update.findById(id);

  if (!update) {
    throw new ApiError(404, "Update not found");
  }

  update.isPublished = !update.isPublished;
  await update.save();

  return res.status(200).json(
    new ApiResponse(200, update, `Update ${update.isPublished ? 'published' : 'unpublished'} successfully`)
  );
});

export {
  createUpdate,
  getAllUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
  togglePublishStatus
};
