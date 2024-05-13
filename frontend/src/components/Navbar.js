import React from "react";
import { RxQuote } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="text-md w-full flex flex-row justify-between items-center font-source">
      <div className="font-semibold transition-all cursor-pointer max-w-fit">
        <RxQuote className="animate-bounce h-8 w-8" />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <div className="font-semibold hover:opacity-70 hover:underline transition-all cursor-pointer max-w-fit">
          Home
        </div>
        <div className="font-semibold hover:opacity-70 hover:underline transition-all cursor-pointer max-w-fit">
          Categories
        </div>
        <div className="font-semibold text-gray-50 hover:text-white bg-zinc-950 rounded-sm px-6 py-3 cursor-pointer max-w-fit hover:bg-zinc-700 transition-all duration-200 shadow-md hover:shadow-lg">
          Recordings
        </div>
      </div>
    </div>
  );
};

export default Navbar;
