import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext"
import { api } from '../../services/api';
import { signIn } from "../../services/auth";

export const AuthProvider = ({ children }) => {
    const [userInfos, setUserInfos] = useState({
        id: 0,
        nome: sessionStorage.getItem("user_name") || "",
        email: sessionStorage.getItem("user_email") || "",
        cpf_cnpj: sessionStorage.getItem("user_cpf_cnpj") || "",
    });
    const [userAccessLevel, setUserAccessLevel] = useState(sessionStorage.getItem("user_access_level") || null);
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");

    const updateToken = (newToken) => {
        setToken(newToken);
    }

    const updateUserAccessLevel = (newUserAccessLevel) => {
        setUserAccessLevel(newUserAccessLevel);
    };

    const updateUserInfos = (newUserInfo) => {
        setUserInfos(newUserInfo);
    }

    const verifyUserAccessLevel = (userAccessLevel) => {
        switch(userAccessLevel){
            case 1:
                return "superadm";
            case 2:
                return "adm";
            case 3:
                return "common";
            default:
                return "common";
        }
    }

    const loginAction = async (data) => {
        try {
            const results = await signIn(data);

            if (results?.success?.token && results?.success?.usuario) {
                updateToken(results?.success?.token);
                updateUserAccessLevel(results?.success?.usuario?.nivel_acesso);
                updateUserInfos({ ...results?.success?.usuario });

                sessionStorage.setItem("token", results?.success?.token);
                sessionStorage.setItem("user_access_level", results?.success?.usuario?.nivel_acesso);
                sessionStorage.setItem("user_name", results?.success?.usuario?.nome);
                sessionStorage.setItem("user_email", results?.success?.usuario?.email);
                sessionStorage.setItem("user_cpf_cnpj", results?.success?.usuario?.cpf_cnpj);
            }

            return results;
        } catch (error) {
            console.log(error?.response?.data);
            return error?.response?.data;
        }
    }

    useEffect(() => {
        if (token && userAccessLevel) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user_access_level', userAccessLevel);
            sessionStorage.setItem('user_name', userInfos?.nome);
            sessionStorage.setItem('user_email', userInfos?.email);
            sessionStorage.setItem('user_cpf_cnpj', userInfos?.cpf_cnpj);

            verifyUserAccessLevel(userAccessLevel);
        }
        else {
            delete api.defaults.headers.common['Authorization'];
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_access_level');
            sessionStorage.removeItem('user_name');
            sessionStorage.removeItem('user_email');
            sessionStorage.removeItem('user_cpf_cnpj');
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