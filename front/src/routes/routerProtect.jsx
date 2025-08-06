import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const RouterProtect = ({ children }) => {
  const user = useAuth();
  if (!user.token || !user.userAccessLevel) return <Navigate to="/" />;
  return children;
};

export default RouterProtect;