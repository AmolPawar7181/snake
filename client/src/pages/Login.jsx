import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuthContext} from '../hooks/useAuthContext';
import CustomForm from '../components/CustomForm';

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const {dispatch} = useAuthContext();

	const isFormValid =
		formData.email.trim() !== '' && formData.password.trim() !== '';

	function handleInputChange(event) {
		const {name, value} = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:8080/api/v1/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const resp = await response.json();
			if (resp.success) {
				localStorage.setItem('user', JSON.stringify(resp));
				dispatch({type: 'LOGIN', payload: resp});
				navigate('/');
			} else {
				alert(resp.message);
			}
		} catch (error) {
			alert(error);
		} finally {
			console.log('finally');
			setIsLoading(false);
		}
	};

	const loginForm = {
		name: 'Login',
		handleSubmit,
		isLoading,
		handleInputChange,
		isFormValid,
		btnProps: {
			type: 'submit',
			text: 'Login',
			loadingText: 'Logging in',
		},
		inputs: [
			{
				title: 'Email',
				name: 'email',
				type: 'email',
				id: 'email',
				value: formData.email,
				required: true,
			},
			{
				title: 'Password',
				name: 'password',
				type: 'password',
				id: 'password',
				value: formData.password,
				required: true,
			},
		],
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600'>
			<div className='bg-white p-8 rounded-lg shadow-md w-96'>
				<CustomForm form={loginForm} />
				<div className='mt-2'>
					Don't have account, register{' '}
					<Link to={'/register'} className='font-bold underline cursor-pointer'>
						here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
