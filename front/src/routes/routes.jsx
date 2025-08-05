import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home';
import MainLayout from '../components/layouts/mainLayout';
import Login from '../pages/login';
import ProtectedLayout from '../components/layouts/protectedLayout';
import Contracts from '../pages/contracts';
import ContractsLayout from '../components/layouts/contractsLayout';
import { useAuth } from '../contexts/authContext';
import MyLeads from '../pages/myLeads';
import FunnelLayout from '../components/layouts/funnelLayout'

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
                    element: <FunnelLayout />,
                    children: [
                        {
                            path: '',
                            element: <Home />,  
                        },
                        {
                            path: 'meus-leads',
                            element: <MyLeads />
                        }
                    ]
                },
                {
                    path: 'contratos',
                    element: <ContractsLayout />,
                    children: [
                        {
                            path: '',
                            element: <Contracts />
                        }
                    ]
                }
            ]
        }
    ];

    const allRoutes = createBrowserRouter([
        ...((!token || !userAccessLevel) ? publicRoutes : []),
        ...privateRoutes
    ]);

    return (
        <RouterProvider router={allRoutes} />
    );
};


export default Routes;