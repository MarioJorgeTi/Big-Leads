import { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Breadcrumb from '../components/breadcrumb';
import { Button } from 'primereact/button'
import GeneralSidebar from '../components/generalSidebar';
import ContractForm from '../components/contractForm';
import '../assets/css/contracts.css'
import { ContractsContext } from '../contexts/contracts/contractsContext';

const Contracts = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    setSelectedModelValue
  } = useContext(ContractsContext);

  const items = [
    {
      id: 1,
      label: 'Contratos'
    }
  ];

  return (
    <main className="w-full h-screen p-4">
      <section className="w-full">
        <div>
          <Breadcrumb items={items} />
          <div className='flex flex-column w-full  md:flex-row md: justify-content-between'>
            <h1 className="text-5xl mb-2 md:mb-0" style={{ color: 'var(--primary-color)' }}>Contratos</h1>
            <Button
              icon={() => <FaPlus />}
              label="Novo Modelo"
              className="p-2 flex gap-2"
              style={{ color: 'var(--primary-color)' }}
              outlined
              onClick={() => setShowForm(!showForm)}
            />
          </div>
        </div>
      </section>
      <GeneralSidebar
        showDetails={showForm}
        closeDetails={() => {
          setShowForm(false);
          setSelectedModelValue('');
        }}
        template={() => <ContractForm />}
      />
    </main>
  )
}

export default Contracts