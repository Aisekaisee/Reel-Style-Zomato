import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import FoodPartnerLoginPage from "../pages/FoodPartnerLoginPage";
import FoodPartnerRegisterPage from "../pages/FoodPartnerRegisterPage";
import UserLoginPage from "../pages/UserLoginPage";
import UserRegisterPage from "../pages/UserRegisterPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegisterPage />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLoginPage />} />
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
