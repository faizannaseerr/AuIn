const express = require("express");
const {
  createRecording,
  getRecordings,
  getrecording,
  deleteRecording,
} = require("../controllers/recordingController");

const router = express.Router();

// GET all recordings
router.get("/", getRecordings);

// GET single recording
router.get("/:id", getrecording);

// POST a new recording
router.post("/", createRecording);

router.patch("/:id", patchRecording);

// DELETE a blog
router.delete("/:id", deleteRecording);

module.exports = router;
