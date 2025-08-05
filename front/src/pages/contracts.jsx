import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Button } from 'primereact/button'
import GeneralSidebar from '../components/general/generalSidebar';
import ContractForm from '../components/contractForm';
import { useContracts } from '../contexts/contractsContext';
import PageHeaders from '../components/templates/pageHeaders';

const Contracts = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    setSelectedModelValue
  } = useContracts();

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
          <div className='flex flex-column w-full  md:flex-row md: justify-content-between md:align-items-end'>
            <PageHeaders
              title={'Contratos'}
              navItems={items}
            />
            <Button
              icon={() => <FaPlus />}
              label="Novo Contrato"
              className="p-3 gap-2"
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