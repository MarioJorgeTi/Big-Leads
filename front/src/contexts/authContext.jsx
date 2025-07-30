import { createContext, useContext, useEffect, useState } from "react";
import { signIn } from "../services/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userInfos, setUserInfos] = useState({
        nome: sessionStorage.getItem("user_name") || "",
        email: sessionStorage.getItem("user_email") || "",
        cpf_cnpj: sessionStorage.getItem("user_cpf_cnpj") || "",
    });
    const [userAccessLevel, setUserAccessLevel] = useState(sessionStorage.getItem("user_access_level") || null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");

    const loginAction = async (data) => {
        try {
            const results = await signIn(data);

            if (results?.success?.token && results?.success?.usuario) {
                setToken(results?.success?.token);
                setUserAccessLevel(results?.success?.usuario?.nivel_acesso);
                setUserInfos({ ...results?.success?.usuario });
            }

            return results;
        } catch (error) {
            console.log(error?.response?.data);
            return error?.response?.data;
        }
    }

    const verifyAccessLevel = (allowedLevels) => {
        if (!userAccessLevel) return false;

        if (Array.isArray(allowedLevels)) {
            return allowedLevels.includes(Number(userAccessLevel));
        }

        return Number(userAccessLevel) === Number(allowedLevels);
    };

    useEffect(() => {
        if (token && userAccessLevel) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user_access_level', userAccessLevel);
            sessionStorage.setItem('user_name', userInfos?.nome);
            sessionStorage.setItem('user_email', userInfos?.email);
            sessionStorage.setItem('user_cpf_cnpj', userInfos?.cpf_cnpj);
        } else {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_access_level');
            sessionStorage.removeItem('user_name');
            sessionStorage.removeItem('user_email');
            sessionStorage.removeItem('user_cpf_cnpj');
        }
    }, [token, userAccessLevel]);

    return (
        <AuthContext.Provider value={{
            token,
            userAccessLevel,
            verifyAccessLevel,
            loginAction,
            setToken,
            setUserAccessLevel,
            setUserInfos
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}