import { api } from './api';

export const getAll = () => {
    const results = api.get('/processos');
    return results;
}