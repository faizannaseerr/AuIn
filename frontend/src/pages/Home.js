import React from "react";
import { motion } from "framer-motion"

// #6F5060
const Home = () => {
  return (
    <div className="flex flex-col items-center py-8 px-60 text-center h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-5xl font-semibold pb-4 font-source text-black font-merr">
        Audio Intellect 💡
      </motion.div>
      <div className="transition-all text-xl mt-8 max-w-[55rem] font-medium rounded-md font-source pl-8 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="opacity-60 text-left"> An innovative platform designed to seamlessly capture and enhance your meeting and lecture experiences. With Audio Intellect, you can effortlessly record, upload, and transform your sessions into comprehensive summaries, actionable notes, and follow-up tasks, all meticulously curated within the ecosystem. </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="opacity-60 text-left pb-4"> Easily access your recordings in the dedicated tab or organize them by categories for streamlined navigation. </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-gradient-to-r from-gray-50 to-gray-100 p-12 bg-cover shadow-md font-merr"> Say goodbye to the anxiety of missed meetings and lectures, and embrace a smarter, more efficient way to engage with your valuable content. </motion.div>
        {/* want to make this flip/change later on */}
        {/* bg-gradient-to-r from-gray-50 to-gray-100 */}
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
