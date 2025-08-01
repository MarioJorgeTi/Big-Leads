import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home';
import MainLayout from '../components/layouts/mainLayout';
import Login from '../pages/login';
import ProtectedLayout from '../components/layouts/protectedLayout';
import Contracts from '../pages/contracts';
import { useAuth } from '../contexts/authContext';
import MyLeads from '../pages/myLeads';

const Routes = () => {
    const { 
        token, 
        userAccessLevel 
    } = useAuth();

    const publicRoutes = [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '',
                    element: <Login />,
                },
            ]
        }
    ];

    const privateRoutes = [
        {
            path: '/dashboard',
            element: <ProtectedLayout />,
            children: [
                {
                    path: '',
                    element: <Home />,
                },
                {
                    path: 'contratos',
                    element: <Contracts />
                },
                {
                    path: 'meus-leads',
                    element: <MyLeads />
                }
            ]
        }
    ];

    const allRoutes = createBrowserRouter([
        ...(!token || !userAccessLevel ? publicRoutes : []),
        ...privateRoutes
    ]);

    return (
        <RouterProvider router={allRoutes} />
    );
};


export default Routes;