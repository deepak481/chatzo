import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? <>{children}</> : <Navigate to='/login' state={{ from: location }} replace />;
  /* The `replace` option in the `Navigate` component determines if navigation should replace the current entry in the history stack or push a new one. Setting `replace` to `true` replaces the current entry, preventing the user from navigating back to the previous page using the browser's back button. */
};

export default ProtectedRoute;
