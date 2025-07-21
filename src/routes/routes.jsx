import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home';
import MainLayout from '../components/layouts/mainLayout';
import Login from '../pages/login';
import ProtectedLayout from '../components/layouts/protectedLayout';

const Routes = () => {

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
    ]

    const privateRoutes = [
        {
            path: '/home',
            element: <ProtectedLayout />,
            children: [
                {
                    path: '',
                    element: <Home />,
                },
            ]
        }
    ]

    const allRoutes = createBrowserRouter([
        ...publicRoutes,
        ...privateRoutes
    ]);

    return (
        <RouterProvider router={allRoutes} />
    );
}

export default Routes;