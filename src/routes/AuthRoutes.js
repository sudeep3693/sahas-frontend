
import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/Login';

const AuthRoutes = (isAuthenticated) => [
  <Route key="login" path="/login" element={<LoginPage />} />,
];

export default AuthRoutes;
