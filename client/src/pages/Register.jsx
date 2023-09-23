import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import CustomForm from '../components/CustomForm';
import {API_URL} from '../constants/constants';

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const isFormValid =
		formData.name.trim() !== '' &&
		formData.email.trim() !== '' &&
		formData.password.trim() !== '';

	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();
		console.log(formData);
		try {
			const response = await fetch(`${API_URL}/api/v1/user/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const resp = await response.json();
			if (resp.success) {
				navigate('/login');
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

	const registerForm = {
		name: 'Sign Up',
		handleSubmit,
		isLoading,
		isFormValid,
		handleInputChange,
		btnProps: {
			type: 'submit',
			text: 'Sign Up',
			loadingText: 'Signing Up',
		},
		inputs: [
			{
				title: 'Name',
				name: 'name',
				type: 'name',
				id: 'name',
				value: formData.name,
				required: true,
			},
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
				<CustomForm form={registerForm} />
				<div className='mt-2'>
					Already have an account, Login{' '}
					<Link to={'/login'} className='font-bold underline cursor-pointer'>
						here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
