const express = require("express");
const matchesController = require("../controllers/matches.controller");
const router = express.Router();
const {
  matchesValidationSchema,
  updateMatchesValidationSchema,
} = require("../middleware/validationSchema");

router
  .route("/")
  .get(matchesController.getAllMatches)
  .post(matchesValidationSchema(), matchesController.addMatch);

router
  .route("/:id")
  .get(matchesController.getMatchById)
  .put(updateMatchesValidationSchema(), matchesController.updateMatch)
  .delete(matchesController.deleteMatch);

module.exports = router;
