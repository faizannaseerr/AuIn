import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PiRecordFill, PiUploadSimpleBold } from "react-icons/pi";

// from-[#FEEAFA] to-[#FDD8F6]
const Footer = () => {
  const recorder = useRef(null);
  const chunks = useRef([]);
  const navigate = useNavigate();

  const handleRecording = async (audioFile) => {
    var url = URL.createObjectURL(audioFile);
    var modifiedUrl = url.substring(5);
    // console.log(JSON.stringify({ audio: url }));
    // console.log(url);
    // console.log(audioFile);
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audio: modifiedUrl }),
    });
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    const mic_btn = document.querySelector("#mic");
    // const playback = document.querySelector("#playback");

    let can_record = false;
    let is_recording = false;

    function SetupAudio() {
      // console.log("Setup");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(SetupStream)
          .catch((err) => {
            console.error(err);
          });
      }
    }

    SetupAudio();

    function SetupStream(stream) {
      recorder.current = new MediaRecorder(stream);

      recorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      // have to edit this to send recorded audio somewhere
      recorder.current.onstop = (e) => {
        const blob = new Blob(chunks.current, {
          type: "audio/mpeg",
        });
        chunks.current = [];
        // const audioURL = window.URL.createObjectURL(blob);
        const audioFile = new File([blob], "sample.mpeg");
        // playback.src = audioURL;
        console.log("This is audio file format: ", audioFile);
        // console.log("helloooo: ", handleRecording(audioFile));
        // navigate("/summarize", { state: { audioFile } }); // this is a link
      };

      can_record = true;
    }

    function ToggleMic() {
      if (!can_record) return;

      is_recording = !is_recording;

      if (is_recording) {
        recorder.current.start();
        console.log("start");
        mic_btn.classList.add("is_recording");
      } else {
        mic_btn.classList.remove("is_recording");
        recorder.current.stop();
      }
    }

    mic_btn.addEventListener("click", ToggleMic);

    return () => {
      mic_btn.removeEventListener("click", ToggleMic);
    };
  }, [navigate]);

  useEffect(() => {
    // ... (your existing useEffect code)

    function handleFileChange(event) {
      const fileInput = event.target;
      const audioFile = fileInput.files[0];

      // Process the file as needed (e.g., upload or handle it in some way)
      // ...

      // Change the route after processing the file
      console.log("This is audio file format: ", audioFile);
      handleRecording(audioFile);
      // navigate("/summarize", { state: { audioFile } }); // this is an audio file
    }

    // Update the input element to call handleFileChange when a file is selected
    const fileInput = document.querySelector("#fileInput");
    fileInput.addEventListener("change", handleFileChange);

    return () => {
      fileInput.removeEventListener("change", handleFileChange);
    };
  }, [navigate]);
  return (
    <div className="w-full fixed bottom-0 h-28 flex flex-row bg-neutral-950 text-md font-bold text-[#BF9B9C]">
      {/* <audio id="playback" controls className="h-100 w-100" /> */}
      <div className="w-full bg-neutral-900 m-2 rounded-lg duration-500 transition-all flex flex-row items-center justify-between gap-20">
        {/* hover:mx-3 hover:my-[0.6rem] */}
        <div className="pl-8">
          Press the record symbol to start recording a session
        </div>
        <div className="pr-16">
          <div
            className="hover:bg-neutral-800 p-2 rounded-full cursor-pointer group active:bg-neutral-700"
            id="mic"
          >
            <PiRecordFill className="opacity-70 group-hover:opacity-100 duration-200 " />
          </div>
        </div>
      </div>
      <div className="w-full bg-neutral-900 my-2 mr-2 rounded-lg duration-500 flex flex-row items-center justify-between gap-20 transition-all">
        {/* hover:my-[0.6rem] hover:mr-3 */}
        <div className="pl-8">
          Press the upload button to upload a pre-recorded session
        </div>
        <div className="pr-16">
          <div className="relative hover:bg-neutral-800 p-2 rounded-full group active:bg-neutral-700 overflow-hidden">
            <PiUploadSimpleBold className="opacity-70 group-hover:opacity-100 duration-200" />
            <input
              type="file"
              accept=".mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .webm"
              className="opacity-0 absolute top-0 left-0 font"
              id="fileInput"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
