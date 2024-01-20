import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const openai = "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";
const model = "whisper-1";

const Example = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [response, setResponse] = useState(null);

  const onChangeFile = () => {
    setFile(inputRef.current.files[0]);
    console.log(file);
  };

  useEffect(() => {
    const fetchAudioFile = async () => {
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append("model", model);
      formData.append("file", file);

      axios
        .post("https://api.openai.com/v1/audio/transcriptions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${openai}`,
          },
        })
        .then((res) => {
          console.log("hello", res);
          setResponse(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    fetchAudioFile();
  }, [file]);

  return (
    <div className="flex items-center justify-center">
      <div className="p-10 bg-gray-100 border-[8px] border-gray-700 h-[30rem] w-[30rem] flex flex-col gap-4 items-center justify-center text-center">
        Whisper{" "}
        <input
          className="block text-center items-center justify-center"
          type="file"
          ref={inputRef}
          onChange={onChangeFile}
        />
        <div>{response && <div>{response.text}</div>}</div>
      </div>
    </div>
  );
};

export default Example;
