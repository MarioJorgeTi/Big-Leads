import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext"
import { api } from '../../services/api';
import { signIn } from "../../services/auth";
import { GlobalContext } from "../global/globalContext";

export const AuthProvider = ({ children }) => {
    const [userInfos, setUserInfos] = useState({
        id: 0, 
        nome: localStorage.getItem("user_name") || "",
        email: localStorage.getItem("user_email") || "",
        cpf_cnpj: localStorage.getItem("user_cpf_cnpj") || "",
    });
    const [userAccessLevel, setUserAccessLevel] = useState(localStorage.getItem("userAccessLevel") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const { setErrorCatcher } = useContext(GlobalContext);

    const updateToken = (newToken) => {
        setToken(newToken);
    }

    const updateUserAccessLevel = (newUserAccessLevel) => {
        setUserAccessLevel(newUserAccessLevel);
    };

    const updateUserInfos = (newUserInfo) => {
        setUserInfos(newUserInfo);
    }

    const loginAction = async (data) => {
        try {
            const results = await signIn(data);
            return results;
        } catch (error) {
            setErrorCatcher(error?.response?.data?.errors?.autenticacao)
            return error?.response?.data;
        }
    }

    useEffect(() => {
        if (token && userAccessLevel) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            localStorage.setItem('user_access_level', userAccessLevel);
            localStorage.setItem('user_name', userInfos?.nome);
            localStorage.setItem('user_email', userInfos?.email);
            localStorage.setItem('user_cpf_cnpj', userInfos?.cpf_cnpj);
        }
        else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            localStorage.removeItem('user_access_level');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_cpf_cnpj');
            updateToken("");
            updateUserAccessLevel(null);
            updateUserInfos({});
        }
    }, [token, userAccessLevel]);

    return (
        <AuthContext.Provider value={{
            token,
            userAccessLevel,
            loginAction,
            updateToken,
            updateUserAccessLevel,
            updateUserInfos
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}