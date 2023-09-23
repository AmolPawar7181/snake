import {Suspense, lazy} from 'react';
import {useAuthContext} from './hooks/useAuthContext';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./Home'));

function App() {
	const {user} = useAuthContext();

	if (!user)
		return (
			<Suspense fallback={'Loading login page...'}>
				<Login />
			</Suspense>
		);
	return (
		<Suspense fallback={'Loading home page...'}>
			<Home />
		</Suspense>
	);
}

export default App;
