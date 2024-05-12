const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordingSchema = new Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        transcript: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        categories: {
            type: [String],
            required: true,
        },
        flashcards: {
            type: String,
            required: false
        },
        notes: {
            type: String,
            required: false
        },
        questions: {
            type: String,
            required: false
        },
        followup: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recording", recordingSchema);