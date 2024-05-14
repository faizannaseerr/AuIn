import React from "react";
import { RxQuote } from "react-icons/rx";
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <div className="text-md w-full flex flex-row justify-between items-center font-source">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-semibold transition-all cursor-pointer max-w-fit">
        <RxQuote className="animate-bounce h-8 w-8" />
      </motion.div>
      <div className="flex flex-row gap-6 items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-semibold hover:opacity-70 hover:underline transition-all duration-200 cursor-pointer max-w-fit">
          Home
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-semibold hover:opacity-70 hover:underline transition-all duration-200 cursor-pointer max-w-fit">
          Categories
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-semibold text-gray-50 hover:text-white bg-zinc-950 rounded-sm px-6 py-3 cursor-pointer max-w-fit hover:bg-zinc-700 transition-all duration-200 shadow-md hover:shadow-lg">
          Recordings
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
