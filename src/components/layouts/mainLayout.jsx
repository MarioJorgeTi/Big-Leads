import { Outlet } from 'react-router-dom'
import Header from '../header'

const MainLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default MainLayout