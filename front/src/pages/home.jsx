import { useContext } from 'react';
import GeneralTable from '../components/generalTable';
import { ProcessesContext } from '../contexts/processes/processesContext';

const Home = () => {
  const { processes } = useContext(ProcessesContext);

  const columns = [
    {
      id: 1,
      field: 'polo_passivo[0].nome',
      header: 'Nome',
      sortable: true,
      sortableDisabled: false
    },
    {
      id: 2,
      field: 'numero_processo',
      header: 'Processo',
      sortable: true,
      sortableDisabled: false
    },
    {
      id: 3,
      field: 'valor_causa',
      header: 'Montante (R$)',
      sortable: true,
      sortableDisabled: false
    },
    {
      id: 4,
      field: 'classe_judicial',
      header: 'Classe Judicial',
      sortable: true,
      sortableDisabled: false
    },
    {
      id: 5,
      field: 'data_autuacao',
      header: 'Data de Autuação',
      sortable: true,
      sortableDisabled: false
    }
  ];

  return (
    <main>
      <div>
        <GeneralTable
          data={processes}
          columns={columns}
        />
      </div>
    </main>
  )
}

export default Home