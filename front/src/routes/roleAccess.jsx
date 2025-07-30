import { useAuth } from "../contexts/authContext";

export const RoleAccess = ({ roles, children }) => {
    const { verifyAccessLevel } = useAuth();

    const isAuthorized = verifyAccessLevel(roles);

    return isAuthorized ? children : null;
};