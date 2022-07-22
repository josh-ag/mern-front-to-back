import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { HomePage } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { AddGoal } from "./pages/addGoal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileEdit } from "./pages/profileEdit";
import { GoalEdit } from "./pages/goalEdit";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goal/add" element={<AddGoal />} />
        <Route path="/goal/edit/:id" element={<GoalEdit />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
