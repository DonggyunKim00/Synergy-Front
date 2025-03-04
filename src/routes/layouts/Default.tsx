import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function DefaultLayout() {
	return (
		<>
			<Outlet />
			<ScrollRestoration />
		</>
	);
}
