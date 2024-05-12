const Recording = require("../models/recordingModel");
const mongoose = require("mongoose");
require("dotenv").config();

// create a new recording
const createRecording = async (req, res) => {
  let emptyFields = [];
  const { filename, link, transcript, summary, categories } = req.body;
  console.log(req.body);

  if (!filename) {
    emptyFields.push("filename");
  }
  if (!link) {
    emptyFields.push("link");
  }
  if (!transcript) {
    emptyFields.push("transcript");
  }
  if (!summary) {
    emptyFields.push("summary");
  }
  if (!categories) {
    emptyFields.push("categories");
  }
  if (emptyFields.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
    // return;
  }

  // add doc to db
  try {
    const recording = await Recording.create({ filename, link, transcript, summary, categories });
    res.status(200).json(recording);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all recordings
const getRecordings = async (req, res) => {
  const reocordings = await Recording.find({}).sort({ createdAt: -1 });
  res.status(200).json(recordings);
};

// get single recording
const getRecording = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid recording id" });
  }

  const recording = await Recording.findById(id);
  if (!recording) {
    return res.status(404).json({ error: "No such recording" });
  }

  res.status(200).json(recording);
};

// delete a recording
const deleteRecording = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid recording id" });
  }

  const recording = await Recording.findOneAndDelete({ _id: id });
  if (!recording) {
    return res.status(404).json({ error: "No such recording" });
  }

  res.status(200).json(recording);
};

// update a recording
const updateRecording = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid recording id" });
  }

  const recording = await Recording.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!recording) {
    return res.status(404).json({ error: "No such recording" });
  }

  res.status(200).json(recording);
};

module.exports = {
  createRecording,
  getRecording,
  getRecordings,
  updateRecording,
  deleteRecording,
};
