import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layouts/Default';
import NotFound from './pages/NotFound';
import AdminLayout from './layouts/Admin';
import LoginPage from './pages/ParticipantLoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OnBoarding from './pages/OnBoarding';
import DefaultNavLayout from './layouts/DefaultNav';
import DashboardSessionDetail from './pages/DashboardSessionDetail';
import DashboardBoothDetail from './pages/DashboardBoothDetail';
import Mypage from './pages/Mypage';
import SessionDetails from './pages/SessionDetails';
import BoothPage from './pages/BoothPage';
import BoothDetails from './pages/BoothDetails';
import SessionPage from './pages/SessionPage';
import MyInfo from './pages/MyInfo';
import RecruiterNavLayout from './layouts/RecruiterNav';
import RecruiterPage from './pages/RecruiterPage';
import RecruiterMyPage from './pages/RecruiterMypage';
import RecruiterMain from './pages/RecruiterMain';

const router = createBrowserRouter([
  {
    element: <DefaultNavLayout />,
    children: [
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/session',
        element: <SessionPage />,
      },
      {
        path: '/booth',
        element: <BoothPage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/participant-login',
        element: <LoginPage />,
      },
      {
        path: '/',
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
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/onboarding',
        element: <OnBoarding />,
      },
      {
        path: '/session/:id',
        element: <SessionDetails />,
      },
      {
        path: '/booth/:id',
        element: <BoothDetails />,
      },
      {
        path: '/my-info/:id',
        element: <MyInfo />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/admin/session',
        element: <DashboardSessionDetail />,
      },
      {
        path: '/admin/booth',
        element: <DashboardBoothDetail />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/recruiter',
    element: <RecruiterNavLayout />,
    children: [
      {
        path: 'list',
        element: <RecruiterPage />,
      },
      {
        path: 'mypage',
        element: <RecruiterMyPage />,
      },
      {
        path: 'main',
        element: <RecruiterMain />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
