const mongoose = require("mongoose");
const Teams = require("../models/team.model");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/http_status_code");
const statusText = require("../utils/http_status_text");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/appError");

const addTeam = asyncWrapper(async (req, res, next) => {
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

  const team = await Teams.create(req.body);

  res
    .status(httpStatus.CREATED)
    .json({ status: statusText.SUCCESS, data: { team } });
});

const getAllTeams = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit ? parseInt(query.limit) : 100;
  const page = query.page ? parseInt(query.page) : 1;
  const skip = (page - 1) * limit;

  const teams = await Teams.find({}, { __v: 0 }).skip(skip).limit(limit);
  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: { teams } });
});

const getTeamById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    AppError.createError({
      status: httpStatus.BAD_REQUEST,
      message: "Invalid Team ID format",
    });
    return next(AppError);
  }

  const team = await Teams.findById(id, { __v: 0 });

  if (!team) {
    AppError.createError({
      status: httpStatus.NOT_FOUND,
      message: "Team not found",
    });
    return next(AppError);
  }

  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: { team } });
});

const updateTeam = asyncWrapper(async (req, res, next) => {
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
        message: "Invalid Team ID format",
      })
    );
  }

  const team = await Teams.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!team) {
    return next(
      AppError.createError({
        status: httpStatus.NOT_FOUND,
        message: "Team not found",
      })
    );
  }

  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: { team } });
});

const deleteTeam = asyncWrapper(async (req, res, next) => {
  await Teams.deleteOne({ _id: req.params.id });
  res
    .status(httpStatus.SUCCESS)
    .json({ status: statusText.SUCCESS, data: null });
});

module.exports = {
  addTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
