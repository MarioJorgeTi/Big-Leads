import { BreadCrumb } from 'primereact/breadcrumb';
import { FaHome } from 'react-icons/fa';
import '../assets/css/breadcrumb.css';

const Breadcrumb = ({ items }) => {
    const home = { icon: () => <FaHome color={'#025288'} />, url: '/dashboard' }

    return (
        <BreadCrumb
            model={items}
            home={home}
            className="py-3"
        />
    )
}

export default Breadcrumb