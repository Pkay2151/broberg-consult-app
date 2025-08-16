// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "../pages/Register";
import "./index.css";
import Login from "../pages/Login";
import WelcomePage from "../pages/Admin/WelcomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Employee from "../pages/Admin/Employee";
import ProtectRoutes from "../pages/ProtectRoutes";
import Project from "../pages/Admin/Project";
import Projects from "../pages/Projects";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/auth/reset-password" element={<ResetPassword />} />

        {/* Protected routes go here */}
        <Route
          path="/admin"
          element={
            <ProtectRoutes>
              <WelcomePage />
            </ProtectRoutes>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectRoutes>
              <Employee />
            </ProtectRoutes>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectRoutes>
              <Project />
            </ProtectRoutes>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  </React.StrictMode>
);
