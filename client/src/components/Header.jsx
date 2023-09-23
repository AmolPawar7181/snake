import {useAuthContext} from '../hooks/useAuthContext';

const Header = () => {
	const {user, dispatch} = useAuthContext();
	const handleLogout = () => {
		localStorage.removeItem('user');
		dispatch({type: 'LOGOUT'});
	};

	return (
		<div className='bg-white fixed w-full top-0 shadow-lg z-10 '>
			<div className='mx-5 py-4'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold text-blue-500'>Snake Game</h1>
					<div className='flex items-center'>
						{user && (
							<div className='text-lg font-semibold text-gray-700 mr-4'>
								Welcome, {user.name}
							</div>
						)}
						<button
							className='text-lg font-semibold text-blue-500 hover:underline cursor-pointer'
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
