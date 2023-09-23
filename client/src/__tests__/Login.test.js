import '@testing-library/jest-dom';
import Login from '../pages/Login';
import {render, fireEvent} from '@testing-library/react';
import {AuthContextProvider} from '../context/AuthContext';
import {StaticRouter} from 'react-router-dom/server';
//import {userData} from '../../mocks/dummyData';

// global.fetch = () => {
// 	return Promise.resolve({
// 		json: () => {
// 			Promise.resolve(userData);
// 		},
// 	});
// };

// unit tests
test('inputs should be loaded', () => {
	const login = render(
		<AuthContextProvider>
			<StaticRouter>
				<Login />
			</StaticRouter>
		</AuthContextProvider>
	);
	const inputs = {
		0: 'email',
		1: 'password',
	};

	const input = login.getAllByTestId('input');

	// will look for inputs
	for (let i = 0; i < input.length; i++) {
		expect(input[i].name).toBe(inputs[i]);
	}
});

test('button should be disabled ', () => {
	const login = render(
		<AuthContextProvider>
			<StaticRouter>
				<Login />
			</StaticRouter>
		</AuthContextProvider>
	);

	//console.log(login);
	const btn = login.getByTestId('btn');

	// check button's state
	expect(btn.disabled).toBe(true);
	expect(btn).toBeInTheDocument();
});

test('button should be enabled on text change ', () => {
	const login = render(
		<AuthContextProvider>
			<StaticRouter>
				<Login />
			</StaticRouter>
		</AuthContextProvider>
	);

	const input = login.getAllByTestId('input');
	const btn = login.getByTestId('btn');

	fireEvent.change(input[0], {target: {value: 'a'}});
	fireEvent.change(input[1], {target: {value: 'p'}});
	expect(btn.disabled).toBe(false);
});
