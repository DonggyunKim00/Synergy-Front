import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layouts/Default';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AdminLayout from './layouts/Admin';
import LoginPage from './pages/ParticipantLoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';
import FindIdPage from './pages/FindIdPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OnBoarding from './pages/OnBoarding';
import DefaultNavLayout from './layouts/DefaultNav';

const router = createBrowserRouter([
  {
    element: <DefaultNavLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/participant-login',
        element: <LoginPage />,
      },
      {
        path: '/rolesection',
        element: <RoleSelectionPage />,
      },
      {
        path: '/admin-login',
        element: <AdminLoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/find-id',
        element: <FindIdPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/session',
        element: <>session</>,
      },
      {
        path: '/booth',
        element: <>booth</>,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/onboarding',
        element: <OnBoarding />,
      },
      {
        path: '/session/:id',
        element: <>/session/:id</>,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <div>AdminPage</div>,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
