import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useProcesses } from '../../../contexts/processesContext';

const estados = [
    { label: 'Acre (AC)', value: 'AC' },
    { label: 'Alagoas (AL)', value: 'AL' },
    { label: 'Amapá (AP)', value: 'AP' },
    { label: 'Amazonas (AM)', value: 'AM' },
    { label: 'Bahia (BA)', value: 'BA' },
    { label: 'Ceará (CE)', value: 'CE' },
    { label: 'Distrito Federal (DF)', value: 'DF' },
    { label: 'Espírito Santo (ES)', value: 'ES' },
    { label: 'Goiás (GO)', value: 'GO' },
    { label: 'Maranhão (MA)', value: 'MA' },
    { label: 'Mato Grosso (MT)', value: 'MT' },
    { label: 'Mato Grosso do Sul (MS)', value: 'MS' },
    { label: 'Minas Gerais (MG)', value: 'MG' },
    { label: 'Pará (PA)', value: 'PA' },
    { label: 'Paraíba (PB)', value: 'PB' },
    { label: 'Paraná (PR)', value: 'PR' },
    { label: 'Pernambuco (PE)', value: 'PE' },
    { label: 'Piauí (PI)', value: 'PI' },
    { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
    { label: 'Rio Grande do Norte (RN)', value: 'RN' },
    { label: 'Rio Grande do Sul (RS)', value: 'RS' },
    { label: 'Rondônia (RO)', value: 'RO' },
    { label: 'Roraima (RR)', value: 'RR' },
    { label: 'Santa Catarina (SC)', value: 'SC' },
    { label: 'São Paulo (SP)', value: 'SP' },
    { label: 'Sergipe (SE)', value: 'SE' },
    { label: 'Tocantins (TO)', value: 'TO' },
];

const statusOptions = [
    { label: 'Indisponível', value: 'indisponivel' },
    { label: 'Disponível', value: 'disponível' },
    { label: 'Alocado', value: 'alocado' },
    { label: 'Devolvido', value: 'devolvido' },
    { label: 'Tramitando', value: 'tramitando' },
    { label: 'Assinado', value: 'assinado' },
    { label: 'Recorrido', value: 'recorrido' },
];

const Filters = () => {
    const {
        setFilters,
        setExpandFilters
    } = useProcesses();

    const formik = useFormik({
        initialValues: {
            numero_processo: '',
            data_autuacao: '',
            ultima_distribuicao: '',
            estado: '',
            status: ''
        },
        onSubmit: (values) => {
            setFilters(values);
            setExpandFilters(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-1 flex flex-column gap-3">
            <div className='w-full my-1'>
                <label htmlFor="numero_processo">Número do Processo</label>
                <InputText
                    id="numero_processo"
                    name="numero_processo"
                    value={formik.values.numero_processo}
                    onChange={formik.handleChange}
                    placeholder="Número do Processo"
                    className='w-full my-1'
                />
            </div>

            <div className='w-full my-1'>
                <label htmlFor="data_autuacao">Data de Autuação</label>
                <InputText
                    id="data_autuacao"
                    name="data_autuacao"
                    type="date"
                    value={formik.values.data_autuacao}
                    onChange={formik.handleChange}
                    className='w-full my-1'
                />
            </div>

            <div className='w-full my-1'>
                <label htmlFor="ultima_distribuicao">Última Distribuição</label>
                <InputText
                    id="ultima_distribuicao"
                    name="ultima_distribuicao"
                    type="date"
                    value={formik.values.ultima_distribuicao}
                    onChange={formik.handleChange}
                    className='w-full my-1'
                />
            </div>

            <div className='w-full my-1'>
                <label htmlFor="estado">Estado</label>
                <Dropdown
                    id="estado"
                    name="estado"
                    value={formik.values.estado}
                    onChange={(e) => formik.setFieldValue('estado', e.value)}
                    options={estados}
                    placeholder="Selecione o estado"
                    className='w-full my-1'
                />
            </div>

            <div className='w-full my-1'>
                <label htmlFor="status">Status</label>
                <Dropdown
                    id="status"
                    name="status"
                    value={formik.values.status}
                    onChange={(e) => formik.setFieldValue('status', e.value)}
                    options={statusOptions}
                    placeholder="Selecione o status"
                    className='w-full my-1'
                />
            </div>

            <div>
                <Button
                    type="submit"
                    label="Aplicar Filtros"
                    className='w-full border-none'
                    style={{ backgroundColor: 'var(--primary-color)' }}
                />
            </div>
        </form>
    );
};

export default Filters;
