const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("name").isString().notEmpty(),
    body("city").isString().notEmpty(),
    body("stadium").isString().notEmpty(),
    body("foundedYear").isNumeric().notEmpty(),
  ];
};

const updateValidationSchema = () => {
  return [
    body("name").optional().isString().notEmpty(),
    body("city").optional().isString().notEmpty(),
    body("stadium").optional().isString().notEmpty(),
    body("foundedYear").optional().isNumeric().notEmpty(),
  ];
};

const matchesValidationSchema = () => {
  return [
    body("homeTeam").isString().notEmpty(),
    body("awayTeam").isString().notEmpty(),
    body("matchDate").isISO8601().toDate(),
    body("score").isString().notEmpty(),
  ];
};

const updateMatchesValidationSchema = () => {
  return [
    body("homeTeam").optional().isString().notEmpty(),
    body("awayTeam").optional().isString().notEmpty(),
    body("matchDate").optional().isISO8601().toDate(),
    body("score").optional().isString().notEmpty(),
  ];
};

module.exports = {
  validationSchema,
  updateValidationSchema,
  matchesValidationSchema,
  updateMatchesValidationSchema,
};
