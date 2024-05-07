import React from "react";
import { RxQuote } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="text-lg w-full flex flex-row justify-between items-center">
      <div className="font-semibold transition-all cursor-pointer max-w-fit">
        <RxQuote className="animate-bounce h-10 w-10" />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <div className="font-semibold hover:opacity-70 hover:underline transition-all cursor-pointer max-w-fit">
          Home
        </div>
        <div className="font-semibold hover:opacity-70 hover:underline transition-all cursor-pointer max-w-fit">
          Categories
        </div>
        <div className="font-semibold hover:px-12 hover:border-[1px] hover:border-black text-gray-50 hover:text-black bg-[#361012] hover:bg-gradient-to-r hover:from-text-gray-200 hover:to-gray-300 rounded-sm px-6 py-3 cursor-pointer max-w-fit transition-all duration-500">
          Instructions
        </div>
      </div>
    </div>
  );
};

export default Navbar;
