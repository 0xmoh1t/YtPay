import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreatorHome from "./components/CreatorHome";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/landing1" element={<LandingPage/>} />
        <Route path="/creator" element={<CreatorHome/>}/>
      </Routes>
      
    </div>
  );
}
