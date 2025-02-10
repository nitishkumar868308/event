import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import GuestLoginPage from "../pages/GuestLoginPage";
import DashboardPage from "../pages/DashboardPage";
// import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/guest-login" element={<GuestLoginPage />} />

        {/* PrivateRoute wrapper for protected routes */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
