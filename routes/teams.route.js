const express = require("express");
const teamsController = require("../controllers/teams.controller");
const router = express.Router();
const {
  validationSchema,
  updateValidationSchema,
} = require("../middleware/validationSchema");

router
  .route("/")
  .get(teamsController.getAllTeams)
  .post(validationSchema(), teamsController.addTeam);

router
  .route("/:id")
  .get(teamsController.getTeamById)
  .put(updateValidationSchema(), teamsController.updateTeam)
  .delete(teamsController.deleteTeam);

module.exports = router;
