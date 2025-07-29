import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth/authProvider";

const RouterProtect = () => {
  const user = useAuth();
  if (!user.token || !user.userAccessLevel) return <Navigate to="/" />;
  return <Outlet />;
};

export default RouterProtect;