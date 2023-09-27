import {Suspense, lazy} from 'react';
import {useAuthContext} from './hooks/useAuthContext';
import Loading from './components/Loading';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

function App() {
	const {user} = useAuthContext();

	if (!user)
		return (
			<Suspense fallback={<Loading />}>
				<Login />
			</Suspense>
		);
	return (
		<Suspense fallback={<Loading />}>
			<Home />
		</Suspense>
	);
}

export default App;
