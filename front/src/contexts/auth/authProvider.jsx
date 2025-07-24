import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext"
import { api } from '../../services/api';
import { signIn } from "../../services/auth";
import { GlobalContext } from "../global/globalContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const { setErrorCatcher } = useContext(GlobalContext);

    const updateToken = (newToken) => {
        setToken(newToken);
    }

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const loginAction = async (data) => {
        signIn(data)
            .then((res) => {
                console.log(res);
                setToken(JSON.stringify(res?.token).replace(/^["']|["']$/g, ''));
            })
            .catch((error) => {
                console.error(error);
                setErrorCatcher(error?.response?.data?.message);
            });
    }

    const logOut = () => {

    }

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        }
        else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token, user]);

    return (
        <AuthContext.Provider value={{
            token,
            user,
            loginAction,
            logOut,
            updateToken,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}