import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const openai = "sk-proj-MrAt8RFiaXvC253C3ZyfT3BlbkFJqnnYP6UWfbCq1LadgKum";
// const model1 = "whisper-1";
const model2 = "gpt-4";

const Summarize = () => {
  const { state } = useLocation();
  // const newstate = JSON.parse(state)
  // const transcription = newstate.transcript
  const [response, setResponse] = useState(null);
  // console.log(newstate);

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
          // console.log(json);
          resolve(json);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const createSummary = async (transcription) => {
    const requestBody = {
      model: model2,
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

    axios
      .post("https://api.openai.com/v1/chat/completions", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openai}`,
        },
      })
      .then((res) => {
        // console.log("hello2", res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    async function summarization() {
      try {
        const result = await handleRecording(state.audioFile);
        const transcription = result.transcript
        createSummary(transcription);
      } catch (error) {
        console.error("Error while handling recording:", error);
      }
    }

    summarization()

  });

  return (
    <div className="text-5xl text-center font-bold pt-4">
      Saved Recording Here...
      {/* <div className="text-2xl mt-8 px-52">
        {response && <div>{response.text}</div>}
      </div>
      <div className="text-2xl mt-8">
        {!response && <div>Loading... </div>}{" "}
      </div>
      <div className="py-50"></div> */}
      <div className="text-2xl mt-8 px-52">
        {response && <div>{response.choices[0].message.content}</div>}
      </div>
      <div className="text-2xl mt-8">
        {!response && (
          <div className="flex justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-black animate-spin dark:text-gray-600 fill-[#815355]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default Summarize;

