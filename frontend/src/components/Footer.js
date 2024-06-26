import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PiRecordFill, PiUploadSimpleBold } from "react-icons/pi";
import { motion } from "framer-motion"

// from-[#FEEAFA] to-[#FDD8F6] -- colours

const Footer = () => {
  const recorder = useRef(null);
  const chunks = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mic_btn = document.querySelector("#mic");

    let can_record = false;
    let is_recording = false;

    function SetupAudio() {
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

      recorder.current.onstop = async (e) => {
        const blob = new Blob(chunks.current, {
          type: "audio/mpeg",
        });
        chunks.current = [];
        const audioFile = new File([blob], "sample.mpeg");
        // fix file name here, i.e make it unique or make it unique in the backend
        // idea: add popup here before navigation to input in unique name
        navigate("/summarize", { state: { audioFile } });
      };

      can_record = true;
    }

    function ToggleMic() {
      if (!can_record) return;

      is_recording = !is_recording;

      if (is_recording) {
        recorder.current.start();
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

    async function handleFileChange(event) {
      const fileInput = event.target;
      const audioFile = fileInput.files[0];
      navigate("/summarize", { state: { audioFile } });
    }

    const fileInput = document.querySelector("#fileInput");
    fileInput.addEventListener("change", handleFileChange);

    return () => {
      fileInput.removeEventListener("change", handleFileChange);
    };
  }, [navigate]);
  return (
    <div className="w-full fixed bottom-0 h-28 flex flex-row bg-sky-950 text-sm font-bold text-[#FFFFFC]">
      <div className="w-full bg-sky-900 shadow-md m-2 rounded-lg duration-500 transition-all flex flex-row items-center justify-center gap-10">
        {/* hover:my-[0.6rem] */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="pl-8 font-source opacity-80">
          Press the record symbol to start recording a session
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="pr-16">
          <div
            className="hover:bg-sky-800 p-2 rounded-full cursor-pointer group active:bg-sky-700"
            id="mic"
          >
            <PiRecordFill className="opacity-70 group-hover:opacity-100 duration-200" />
          </div>
        </motion.div>
      </div>
      <div className="w-full bg-sky-900 shadow-md my-2 mr-2 rounded-lg duration-500 flex flex-row items-center justify-center gap-10 transition-all">
        {/* hover:my-[0.6rem]*/}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pl-8 font-source opacity-80">
          Press the upload button to upload a pre-recorded session
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pr-16">
          <div className="relative hover:bg-sky-800 p-2 rounded-full group active:bg-sky-700 overflow-hidden">
            {/* maybe add cursor pointer idk how though */}
            <PiUploadSimpleBold className="opacity-70 group-hover:opacity-100 duration-200" />
            <input
              type="file"
              accept=".mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .webm"
              className="opacity-0 absolute top-0 left-0 font"
              id="fileInput"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;

