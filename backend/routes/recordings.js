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
router.get("/", getRecordings);

// GET single recording
router.get("/:id", getRecording);

// POST a new recording
router.post("/", createRecording);

router.patch("/:id", updateRecording);

// DELETE a blog
router.delete("/:id", deleteRecording);

module.exports = router;
