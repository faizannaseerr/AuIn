import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Summarize from "./pages/Summarize";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/summarize';

  return (
    <div>
      {/* bg-gradient-to-r from-[#FFFFFC] to-[#e1ecfa] */}
      <div className="w-full h-[300rem] pb-32 p-6 bg-[#FFFFFC]">
        <div className="">
          <div className="flex flex-col gap-2 h-full">
            <Navbar />
          </div>
          <div className="h-full w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/summarize" element={<Summarize />} />
            </Routes>
          </div>
        </div>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;