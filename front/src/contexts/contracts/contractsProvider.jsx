import { ContractsContext } from './contractsContext'

const ContractsProvider = ({ children }) => {

    return (
        <ContractsContext.Provider value={{
            
        }}>
            {children}
        </ContractsContext.Provider>
    )
}

export default ContractsProvider