import Breadcrumb from '../breadcrumb'

const PageHeaders = ({ title, processesValue = null, navItems = null, isFunnel }) => {

    return (
        <div>
            {navItems && <Breadcrumb items={navItems} />}
            <h1 className='m-0' style={{
                fontSize: '3.5rem',
                color: 'var(--primary-color)'
            }}>{title}</h1>
            {isFunnel ? <h2 className='my-3' style={{
                fontSize: '2rem',
                color: 'var(--primary-color)'
            }}>Valor Total: {processesValue}</h2> : null}
        </div>
    )
}

export default PageHeaders