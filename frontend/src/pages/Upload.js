import React from "react";

// #6F5060
const Upload = () => {
  return (
    <div className="flex flex-col items-center py-8 px-60 text-center h-full">
      <div className="text-5xl font-bold pb-8">
        Audio Intellect 📕
      </div>
      <button className="hover:underline transition-all text-4xl opacity-60 mt-20 font-semibold rounded-md">
        No Recordings Yet.
      </button>
    </div>
  );
};

export default Upload;
