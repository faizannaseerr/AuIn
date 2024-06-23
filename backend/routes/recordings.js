const express = require("express");
const {
  createRecording,
  getRecordings,
  getRecording,
  deleteRecording,
  updateRecording
} = require("../controllers/recordingController");

const router = express.Router();

// GET all recordings
router.get("/recordings", getRecordings);

// GET single recording
router.get("/recordings/:id", getRecording);

// POST a new recording
router.post("/create", createRecording);

router.patch("/recordings/:id", updateRecording);

// DELETE a blog
router.delete("/recordings/:id", deleteRecording);

module.exports = router;
