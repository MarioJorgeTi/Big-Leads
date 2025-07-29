import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../assets/css/generalTable.css';

export default function GeneralTable({ data, columns }) {

    return (
        <div className='p-2'>
            <DataTable
                value={data}
                removableSort
                paginator
                rows={9}
                sortMode="multiple"
                className='text-md lg:text-md xl:text-lg'
            >
                {columns.map((column) => (
                    <Column
                        key={column?.field || column?.id}
                        frozen={column.frozen}
                        field={column?.field}
                        header={column?.header}
                        sortable={!column?.sortableDisabled}
                        body={column?.body}
                        className='text-sm lg:text-md xl:text-lg'
                    />
                ))}
            </DataTable>
        </div>
    );
}
