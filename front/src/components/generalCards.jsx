import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

const GeneralCards = () => {
    const [layout, setLayout] = useState('grid');
    
    const itemTemplate = (contract, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(contract, index);
        else if (layout === 'grid') return gridItem(contract);
    };

    const listTemplate = (contracts, layout) => {
        return <div className="grid grid-nogutter">{contracts.map((contract, index) => itemTemplate(contract, layout, index))}</div>;
    };

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}

export default GeneralCards