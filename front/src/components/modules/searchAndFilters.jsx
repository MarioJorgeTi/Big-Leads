import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';
import GeneralSidebar from '../general/generalSidebar';
import Filters from '../templates/forms/filters';
import { useProcesses } from '../../contexts/processesContext';

const SearchAndFilters = () => {
  const {
    searchTerm,
    setSearchTerm,
    expandFilters,
    setExpandFilters,
  } = useProcesses();

  return (
    <div className='p-0 md:pr-2 flex gap-3'>
      <Button
        rounded
        outlined
        icon={() => <FaFilter size={20} />}
        style={{ color: 'var(--primary-color)' }}
        onClick={() => setExpandFilters(!expandFilters)}
      />
      <IconField iconPosition="left">
        <InputIcon>
          <FaSearch />
        </InputIcon>
        <InputText
          type='text'
          placeholder="Buscar por número do processo"
          className='border-round-3xl w-19rem'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </IconField>
      <GeneralSidebar
        showDetails={expandFilters}
        closeDetails={() => setExpandFilters(false)}
        template={Filters}
      />
    </div>
  );
};

export default SearchAndFilters;
