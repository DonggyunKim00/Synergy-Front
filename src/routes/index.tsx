import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layouts/Default';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
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
