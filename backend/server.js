require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const recordingRoutes = require("./routes/recordings");
const summarizationRoutes = require("./routes/summarization");

app.use(express.json()); // access req.body json passed on
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// middleware
app.use(cors());

app.use("/recordings", recordingRoutes);
app.use("/summarize", summarizationRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
