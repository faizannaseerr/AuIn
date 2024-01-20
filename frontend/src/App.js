import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Route, Routes
// import Example from "./Example";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Summarize from "./pages/Summarize";

// from-[#b59991] via-slate-300 to-[#c0c0c0]
// from-[#f7eef5] to-[#f2e0e3]
// from-[#FEEAFA] to-[#EFD3D7]
// from-[#f6e9f3] to-[#f0dee1]

function App() {
  // return <Example />;
  return (
    <div>
      <BrowserRouter>
        <div className="w-full h-[300rem] pb-32 p-6 bg-gradient-to-r from-[#f6e9f3] to-[#f0dee1]">
          <div className="">
            <div className="flex flex-col gap-2 h-full">
              <Navbar />
            </div>
            <div className="h-full w-full">
              <Routes>
                <Route path="/" element={<Upload />} />
                <Route path="/summarize" element={<Summarize />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
