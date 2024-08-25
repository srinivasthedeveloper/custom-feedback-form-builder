import React from 'react';
import { Navigate } from 'react-router-dom';
import { urlRoutes } from '../../utils/Routes';

const ProtectedRoute = ({ children, authKey }) => {
  const isAuthenticatedUser = localStorage.getItem(authKey) === 'true';
  return isAuthenticatedUser ? children : <Navigate to={urlRoutes.login} />;
};

export default ProtectedRoute;
