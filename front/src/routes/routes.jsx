import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home';
import MainLayout from '../components/layouts/mainLayout';
import Login from '../pages/login';
import ProtectedLayout from '../components/layouts/protectedLayout';
import Contracts from '../pages/contracts';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/authContext';

const Routes = () => {
    const { token, user } = useContext(AuthContext);

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
                }
            ]
        }
    ];

    const allRoutes = createBrowserRouter([
        ...(!token || !user ? publicRoutes : []),
        ...privateRoutes
    ]);

    return (
        <RouterProvider router={allRoutes} />
    );
};


export default Routes;