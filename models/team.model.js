const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  stadium: { type: String, required: true },
  foundedYear: { type: Number, required: true },
});

module.exports = mongoose.model("Team", teamSchema);
