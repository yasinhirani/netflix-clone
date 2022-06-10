import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Details from './Details'
import Navbar from "./Navbar";
import AllMovies from "./AllMovies";
import AllTv from "./AllTv";

const App = () => {
  document.title = "Netflix-clone"
  return(
    <div className="bg-[#111] h-full flex flex-col overflow-hidden relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<Details />} />
        <Route path="/allMovies" element={<AllMovies />} />
        <Route path="/allTv" element={<AllTv />} />
      </Routes>
    </div>
  )
};

export default App;
