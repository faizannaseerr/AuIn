const AWS = require("aws-sdk")
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require("dotenv").config();

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
})

// helper for polling to receive transcription
async function pollResult(resultUrl) {
    let status;
    do {
        const response = await fetch(resultUrl, {
            method: 'GET',
            headers: {
                'x-gladia-key': process.env.GLADIA_API,
            },
        });
        const result = await response.json();
        status = result.status;
        console.log(status)
        if (status === 'done') {
            // Transcription is done, return the result
            return result;
        } else if (result.statusCode == 401 || result.statusCode == 404) {
            // Transcription failed, handle error
            throw new Error('Transcription failed - ', result.message);
        }
        // Wait for some time before making the next request
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 seconds
    } while (status !== 'done');
}

// helper for uploading audio file to s3 bucket
const uploadAudio = (filename, bucketname, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                console.log("done")
                resolve(data)
            }
        })
    })
}

const getTranscript = async (req, res) => {
    try {
        const link = await uploadAudio(req.file.originalname, 'audiointellectrecordings', req.file.buffer);
        const options = {
            method: "POST",
            headers: {
                "x-gladia-key": process.env.GLADIA_API,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "audio_url": link.Location }),
        };
        const transcriptionResponse = await fetch("https://api.gladia.io/v2/transcription", options);
        const transcriptionResult = await transcriptionResponse.json();
        // Start polling the result URL
        const result = await pollResult(transcriptionResult.result_url);
        // Send the transcription result to the client
        console.log(result)
        const returnObject = { link: result.request_params.audio_url, name: result.file.filename, transcript: result.result.transcription.full_transcript }
        res.status(200).json(returnObject);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}

const getSummary = async (req, res) => {
    const { transcription } = req.body
    const requestBody = {
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant.",
            },
            {
                role: "user",
                content: `Give me the first three words and the last three words from this text: ${transcription}`,
            },
        ],
        temperature: 0.5,
        max_tokens: 1024,
        n: 1,
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getTranscript,
    getSummary
}