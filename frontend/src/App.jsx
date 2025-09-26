import React from "react";
import { Routes, Route } from "react-router-dom";
import { Signup } from "../src/components/SignUp/Signup";
import { Signin } from "../src/components/SignIn/Signin";
import { Dashboard } from "../src/components/Dashboard/Dashboard";
import  HistoryPage  from "./components/History/HistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}

export default App;
