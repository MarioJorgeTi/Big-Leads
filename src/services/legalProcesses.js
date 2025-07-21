import { api } from './api';

export const getAll = () => {
    let results = api.get('/');
    return results;
}