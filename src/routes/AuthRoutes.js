import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePasswordPage from '../pages/ChangePasswordPage';

const AuthRoutes = (isAuthenticated) => [
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="forgot-password" path="/forgot-password" element={<ForgotPassword />} />,
  <Route key="forgetPassword-alias" path="/forgetPassword" element={<ForgotPassword />} />,
  <Route key="change-password" path="/change-password" element={<ChangePasswordPage />} />,
];

export default AuthRoutes;
