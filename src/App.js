import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Details from './Details'
import Navbar from "./Navbar";

const App = () => {
  return(
    <div className="bg-[#111] h-full flex flex-col overflow-hidden relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </div>
  )
};

export default App;
