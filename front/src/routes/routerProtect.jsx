import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const RouterProtect = () => {
  const user = useAuth();
  if (!user.token || !user.userAccessLevel) return <Navigate to="/" />;
  return <Outlet />;
};

export default RouterProtect;