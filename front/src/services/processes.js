import { api } from './api';

export const getAll = () => {
    const results = api.get('/processos');
    return results;
}

export const getAllAvailable = () => {
    const results = api.get('/processos/funil-geral');
    return results;
}

export const getProcessAvailable = (processId) => {
    const results = api.post(`/processo/puxar/${processId}`);
    return results;
}