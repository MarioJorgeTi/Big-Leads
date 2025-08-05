import { api } from './api';

export const createFeesContract = async (data) => {
    const results = await api.post('/contrato/honorario', data);
    return results;
}