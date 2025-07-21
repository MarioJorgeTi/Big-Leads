import { Outlet } from 'react-router-dom'
import Header from '../header'

const ProtectedLayout = () => {
    return (
        <main className='grid mr-0 mb-0'>
            <div className='col-12 md:col-1 lg:max-w-7rem pr-0 pb-0'>
                <Header />
            </div>
            <div className='col-12 md:col-11 md:px-0 py-0'>
                <Outlet />
            </div>
        </main>
    )
}

export default ProtectedLayout
