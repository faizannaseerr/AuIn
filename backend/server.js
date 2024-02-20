require("dotenv").config();
// const fetch = require("node-fetch");

const express = require("express");
const cors = require("cors");
// const recordingRoutes = require("./routes/recordings");
// const summarizationRoutes = require("./routes/summarization");

const app = express();

app.use(express.json()); // access req.body json passed on
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// middleware
app.use(cors());

app.post("/", async (req, res) => {
  // console.log(req.files);

  const audio = req.body;
  console.log("Audio file:", audio);

  // console.log(audio);
  // console.log(audioFile);
  // const formData = new FormData();
  // formData.append("audio", audio);

  const options1 = {
    method: "POST",
    headers: {
      "x-gladia-key": process.env.GLADIA_API,
      "Content-Type": "application/json",
    },
    body: `{"audio_url": "${audio}"}`,
  };

  const audioURLupload = await fetch(
    "https://api.gladia.io/v2/upload",
    options1
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(options1);
      console.log(response);
      return response;
    })
    .catch((err) => console.error(err));

  // audioURL = audioURLupload.audio_url;

  // const options = {
  //   method: "POST",
  //   headers: {
  //     "x-gladia-key": process.env.GLADIA_API,
  //     "Content-Type": "application/json",
  //   },
  //   body: `{"audio_url": "${audio}"}`,
  // };

  // fetch("https://api.gladia.io/v2/transcription", options)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     console.log(response);
  //     res.status(200).json(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json({ error: err });
  //   });
});

// app.use("", recordingRoutes);
// app.use("", summarizationRoutes);

//connect to db
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("connected to db & listening to port", process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

try {
  app.listen(process.env.PORT, () => {
    console.log("connected to db & listening to port", process.env.PORT);
  });
} catch (error) {
  console.log(error);
}
