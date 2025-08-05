import { api } from './api';

// Publico
export const getAllAvailable = async () => {
    const results = await api.get('/processos/funil-geral');
    return results;
}

export const getProcessAvailable = async (processId) => {
    const results = await api.post(`/processo/puxar/${processId}`);
    return results;
}



// Diretor
// Lista todos os usuários do sistema
export const getAllUsers = async () => {
    const results = await api.get('/diretor/usuarios');
    return results;
}

// Detalha um usuário por ID
export const getUserDetails = async (idUser) => {
    const results = await api.get(`/diretor/usuario/${idUser}`);
    return results;
}

// Lista subordinados do diretor.
export const getAllSubjects = async (accessLevel) => {
    const results = api.get(`/${accessLevel}/processos/subordinados`);
    return results;
}

// Lista todos os processos.
export const getAllProcesses = async () => {
    const results = await api.get('/diretor/processos');
    return results;
}

// Detalha um processo específico.
export const getProcessDetails = async (idProcess) => {
    const results = await api.get(`/diretor/processo/${idProcess}`);
    return results;
}

// Remove qualquer processo
export const deleteProcess = async (idProcess) => {
    const results = await api.delete(`/diretor/processo/${idProcess}`);
    return results;
}



// Depende do Nível de Acesso - Diretor/Gerente
// Atribui subordinado a outro usuário
export const postUserToNewUser = async (accessLevel, idUser) => {
    const results = await api.post(`/${accessLevel}/usuario/subordinar/${idUser}`);
    return results;
}

// Lista processos dos subordinados
export const getAllSubjectsProcesses = async (accessLevel) => {
    const results = await api.get(`/${accessLevel}/processos/subordinados`);
    return results;
}



// Depende do Nível de Acesso - Diretor/Gerente/Vendedor
// Processos atribuídos ao usuário
export const getUserProcesses = async (accessLevel) => {
    const results = await api.get(`/${accessLevel}/processos/usuario`);
    return results;
}

// Edita processo - Diretor: edita qualquer um; Gerente: edita os dele e dos subordinados
export const putProcess = async (idProcess) => {
    const results = await api.patch(`/diretor/processo/${idProcess}`,);
    return results;
}

// Atribui um processo a um usuário
export const postProcessToUser = async (accessLevel, idProcess, userToAssign) => {
    const results = await api.post(`/${accessLevel}/processo/atribuir/${idProcess}/${userToAssign}`);
    return results;
}

// Adiciona documento a qualquer processo
export const postDocument = async (userAccess) => {
    const results = await api.post(`/${userAccess}/documento`);
    return results;
}

// Remove documento de qualquer processo
export const deleteDocument = async (userAccess) => {
    const results = await api.delete(`/${userAccess}/documento`);
    return results;
}
