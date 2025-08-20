const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  matchDate: { type: Date, required: true },
  score: { type: String, required: true },
});

module.exports = mongoose.model("Matche", matchSchema);
