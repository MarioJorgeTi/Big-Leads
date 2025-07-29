import { api } from "../services/api";

export const signIn = async (data) => {
    const result = await api.post('/login', data);
    return result.data;
}

export const signOut = async (data) => {
    const result = await api.post('/logout', data);
    return result.data;
}