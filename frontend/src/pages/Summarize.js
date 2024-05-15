import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"
import Loading from "../components/Loading";

const Summarize = () => {
  const { state } = useLocation();
  const [response, setResponse] = useState(null);

  const handleRecording = async (audioFile) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("audio", audioFile);
      fetch("/summarize", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const createSummary = async (transcription) => {
    const result = await fetch("/summarize", {
      method: "PATCH",
      body: JSON.stringify({ transcription }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const res = await result.json()
    setResponse(res)
    // add error checking here
  };


  useEffect(() => {
    async function summarization() {
      try {
        // run summarization only if it has not been done before in mongo database
        // const result = await handleRecording(state.audioFile);
        // result is in form: {link, name, transcript}
        const transcription = "The stale smell of old beer lingers. It takes heat to bring out the odor. A cold dip restores health and zest. A salt pickle tastes fine with ham. Tacos al pastor are my favorite. A zestful food is the hot cross bun."
        // const transcription = result.transcript
        // createSummary(transcription);
      } catch (error) {
        console.error("Error while handling recording:", error);
      }
    }

    summarization()

  }, [state]);

  return (
    <div className="h-full w-full px-20 py-8">
      {!response && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-5xl font-semibold font-source text-black font-merr">
        Please wait a couple moments
      </motion.div>}
      {response && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-5xl font-semibold font-source text-black font-merr">
        Click the save button once you're ready!
      </motion.div>}
      <div className="text-2xl mt-20 px-52">
        {response && <div className="font-souce">{response.choices[0].message.content}</div>}
      </div>
      <div className="text-2xl mt-60">
        {!response && <Loading />}{" "}
      </div>
    </div>
  );
};

export default Summarize;

