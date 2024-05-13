const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const {
    getTranscript,
    getSummary,
    getFlashcards,
    getNotes,
    getFollowup,
    getQuestions
} = require("../controllers/summarizationController")

const router = express.Router();

router.post("/summarize", upload.single("audio"), getTranscript)

router.patch("/summarize", getSummary)
// this needs to be changed to getAll Values in summarizationController & here

module.exports = router
