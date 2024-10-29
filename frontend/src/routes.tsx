import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MasterLayout from "./layouts/MasterLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import App from "./pages/App";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import GuestLayout from "./layouts/GuestLayout";
import LogoutPage from "./pages/auth/LogoutPage";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MasterLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: '/',
                element: <App />,
            },
            {
                path: '/explore',
                element: <App />,
            },
            {
                path: '/notifications',
                element: <App />,
            },
            {
                path: '/:name',
                element: <Profile />,
                children: [
                    {
                        path: '/:name/photos',
                        element: <Home />,
                    },
                    {
                        path: '/:name/videos',
                        element: <Home />,
                    },
                    {
                        path: '/:name/following',
                        element: <Home />,
                    },
                    {
                        path: '/:name/followers',
                        element: <Home />,
                    },

                ]
            },
        ],
    },
    {
        path: '/logout',
        element: <LogoutPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/auth',
        element: <GuestLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/auth/login',
                element: <LoginPage />,
            },
            {
                path: '/auth/register',
                element: <RegisterPage />,
            }
        ]
    }

]);

export default function RouteList() {
    return (
        <RouterProvider router={routes} />
    )
}
