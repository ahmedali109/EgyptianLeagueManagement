const mongoose = require("mongoose");
const Matches = require("../models/match.model");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/http_status_code");
const statusText = require("../utils/http_status_text");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/appError");

const addMatch = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      AppError.createError({
        status: httpStatus.BAD_REQUEST,
        message: "Validation failed",
        text: errors.array(),
      })
    );
  }

  const match = await Matches.create(req.body);

  res
    .status(httpStatus.CREATED)
    .json({ status: statusText.SUCCESS, data: { match } });
});

const getAllMatches = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit ? parseInt(query.limit) : 100;
  const page = query.page ? parseInt(query.page) : 1;
  const skip = (page - 1) * limit;

  const matches = await Matches.find({}, { __v: 0 }).skip(skip).limit(limit);
  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: { matches } });
});

const getMatchById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    AppError.createError({
      status: httpStatus.BAD_REQUEST,
      message: "Invalid Match ID format",
    });
    return next(AppError);
  }

  const match = await Matches.findById(id, { __v: 0 });

  if (!match) {
    AppError.createError({
      status: httpStatus.NOT_FOUND,
      message: "Match not found",
    });
    return next(AppError);
  }

  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: { match } });
});

const updateMatch = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      AppError.createError({
        status: httpStatus.BAD_REQUEST,
        message: "Validation failed",
        text: errors.array(),
      })
    );
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      AppError.createError({
        status: httpStatus.BAD_REQUEST,
        message: "Invalid Match ID format",
      })
    );
  }

  const match = await Matches.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!match) {
    return next(
      AppError.createError({
        status: httpStatus.NOT_FOUND,
        message: "Match not found",
      })
    );
  }

  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: { match } });
});

const deleteMatch = asyncWrapper(async (req, res, next) => {
  await Matches.deleteOne({ _id: req.params.id });
  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: null });
});

module.exports = {
  addMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
};
