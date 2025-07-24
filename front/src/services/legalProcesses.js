import { api } from './api';

export const getAll = () => {
    let results = api.get('/processos');
    return results;
}