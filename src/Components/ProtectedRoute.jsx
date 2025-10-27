import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);

  // If user is not logged in, redirect to login page

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Else, render the nested route
  
  return <Outlet />;
}
