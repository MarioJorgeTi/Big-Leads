import { api } from "../services/api";

export const signIn = async (data) => {
    const result = await api.post('/login', data);
    return result.data;
}