import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Summarize from "./pages/Summarize";
import Recordings from "./pages/Recordings";
import Create from "./pages/Create";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/summarize' || location.pathname === '/create';

  return (
    <div>
      {/* bg-gradient-to-r from-[#FFFFFC] to-[#e1ecfa] */}
      <div className="w-full h-full pb-32 p-6 bg-[#FFFFFC]">
        <div className="">
          <div className="flex flex-col gap-2 h-full">
            <Navbar />
          </div>
          <div className="h-full w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/summarize" element={<Summarize />} />
              <Route path="/create" element={<Create />} />
              <Route path="/recordings" element={<Recordings />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </div>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;