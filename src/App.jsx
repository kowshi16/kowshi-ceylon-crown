import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
