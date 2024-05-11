const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const {
    getTranscript,
    getSummary
} = require("../controllers/summarizationController")

const router = express.Router();

router.post("/summarize", upload.single("audio"), getTranscript)

router.patch("/summarize", getSummary)

module.exports = router
