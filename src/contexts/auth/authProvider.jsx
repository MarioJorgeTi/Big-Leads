import { useState } from "react";
import { AuthContext } from "./authContext"

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');

    return (
        <AuthContext.Provider value={{
            token
        }}>
            {children}
        </AuthContext.Provider>
    )
}