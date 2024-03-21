import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { ProtectedRouteProps } from '../../../types';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
