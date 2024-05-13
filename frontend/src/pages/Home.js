import React from "react";
import { motion } from "framer-motion"

// #6F5060
const Home = () => {
  return (
    <div className="flex flex-col items-center py-8 px-60 text-center h-full">
      <div className="text-4xl font-semibold pb-4 font-source text-black">
        Audio Intellect 💡
      </div>
      <div className="transition-all text-xl mt-8 max-w-[55rem] font-semibold rounded-md font-source pl-8 flex flex-col gap-6">
        <div className="opacity-60 text-left"> An innovative web app designed to seamlessly capture and enhance your meeting and lecture experiences. With Audio Intellect, you can effortlessly record, upload, and transform your sessions into comprehensive summaries, actionable notes, and follow-up tasks, all meticulously curated within the web app. </div>
        <div className="opacity-60 text-right"> Easily access your recordings in the dedicated tab or organize them by categories for streamlined navigation. </div>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-12 shadow-md"> Say goodbye to the anxiety of missed meetings and lectures, and embrace a smarter, more efficient way to engage with your valuable content. </div>
      </div>
    </div>
  );
};

export default Home;

// Pages layout

// Homepage will have instructions and information
// Recordings page will have recordings
// Categories page will have search bar for recordings
// Summarize page will be saving & posting recordings (most external api calls here)
// Recording ID pages will recording + all responses (can be looked at separately through closing & opening tabs)
// Need to add context for recording objects, if not present then run api call else use the context (to reduce latency)
