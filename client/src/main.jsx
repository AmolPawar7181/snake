import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AuthContextProvider} from './context/AuthContext';
import Loading from './components/Loading';
import './index.css';

const App = lazy(() => import('./App'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<Loading />}>
				<App />
			</Suspense>
		),
	},
	{
		path: '/login',
		element: (
			<Suspense fallback={<Loading />}>
				<Login />
			</Suspense>
		),
	},
	{
		path: '/register',
		element: (
			<Suspense fallback={<Loading />}>
				<Register />
			</Suspense>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</React.StrictMode>
);
