export const getFeesContract = async () => {
    const results = await api.get('/contrato/honorario');
    return results;
}