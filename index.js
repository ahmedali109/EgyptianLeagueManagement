require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const httpStatus = require("./utils/http_status_code");
const statusText = require("./utils/http_status_text");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());

app.use(express.json());

app.use("/matches", require("./routes/matches.route"));
app.use("/teams", require("./routes/teams.route"));

app.use((req, res) => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({ status: statusText.NOT_FOUND, message: "Route not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    status: status,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
