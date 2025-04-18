import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Store/AuthContext"; // You'll need to create this

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
