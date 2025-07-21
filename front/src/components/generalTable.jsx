import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../assets/css/generalTable.css';

const GeneralTable = ({ data, columns }) => {
    const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => {
        const match = part.match(/(\w+)\[(\d+)\]/);
        if (match) {
            const [, prop, index] = match;
            return acc?.[prop]?.[index];
        }
        return acc?.[part];
    }, obj);
};

const rowClassName = () => {
        return 'custom-row-style';
    };

    return (
        <div>
            <DataTable
                value={data}
                removableSort
                tableStyle={{ minWidth: '50rem', tableLayout: 'fixed' }}
                size="large"
                paginator
                rows={5}
            >
                {columns.map((column) => (
                    <Column
                        key={column.field}
                        header={column.header}
                        sortable={!column.sortableDisabled}
                        sortableDisabled={column.sortableDisabled}
                        body={(rowData) => getNestedValue(rowData, column.field)}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default GeneralTable;
