import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Poll } from "../models/poll.model.js";

// Create a new poll (GlobalAdmin only)
const createPoll = asyncHandler(async (req, res) => {
  const { question, options, createdBy, isActive, expiresAt } = req.body;

  if (!question || !options || options.length < 2) {
    throw new ApiError(400, "Question and at least two options are required for a poll");
  }

  const poll = await Poll.create({
    question,
    options,
    createdBy: createdBy || 'GlobalAdmin', // Default or get from user context
    isActive: isActive !== undefined ? isActive : true,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  });

  return res.status(201).json(
    new ApiResponse(201, poll, "Poll created successfully")
  );
});

// Get all polls
const getAllPolls = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10, status } = req.query;

  const query = {};

  if (status) {
    query.isActive = status === 'active';
  }

  if (search) {
    query.$or = [
      { question: { $regex: search, $options: 'i' } },
      { "options.text": { $regex: search, $options: 'i' } },
      { createdBy: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const polls = await Poll.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Poll.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(200, {
      polls,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    }, "Polls fetched successfully")
  );
});

// Get poll by ID
const getPollById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const poll = await Poll.findById(id);

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  return res.status(200).json(
    new ApiResponse(200, poll, "Poll fetched successfully")
  );
});

// Update an existing poll (GlobalAdmin only)
const updatePoll = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, options, isActive, expiresAt } = req.body;

  const poll = await Poll.findById(id);

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  const updatedPoll = await Poll.findByIdAndUpdate(
    id,
    {
      $set: {
        ...(question && { question }),
        ...(options && options.length >= 2 && { options }),
        ...(isActive !== undefined && { isActive }),
        ...(expiresAt && { expiresAt: new Date(expiresAt) }),
      },
    },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedPoll, "Poll updated successfully")
  );
});

// Delete a poll (GlobalAdmin only)
const deletePoll = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const poll = await Poll.findById(id);

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  await Poll.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(200, {}, "Poll deleted successfully")
  );
});

// Vote on a poll option
const voteOnPoll = asyncHandler(async (req, res) => {
  const { id, optionId } = req.params;

  const poll = await Poll.findById(id);

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  if (!poll.isActive || (poll.expiresAt && new Date() > poll.expiresAt)) {
    throw new ApiError(400, "Poll is not active or has expired");
  }

  const option = poll.options.id(optionId);

  if (!option) {
    throw new ApiError(404, "Option not found");
  }

  option.votes += 1;
  await poll.save();

  return res.status(200).json(
    new ApiResponse(200, poll, "Vote cast successfully")
  );
});

export {
  createPoll,
  getAllPolls,
  getPollById,
  updatePoll,
  deletePoll,
  voteOnPoll,
};
