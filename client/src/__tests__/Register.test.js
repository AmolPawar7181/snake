import Register from '../pages/Register';
import {render, fireEvent} from '@testing-library/react';
import {AuthContextProvider} from '../context/AuthContext';
import {StaticRouter} from 'react-router-dom/server';

// unit tests
test('inputs should be loaded', () => {
	const register = render(
		<AuthContextProvider>
			<StaticRouter>
				<Register />
			</StaticRouter>
		</AuthContextProvider>
	);
	const inputs = {
		0: 'name',
		1: 'email',
		2: 'password',
	};

	const input = register.getAllByTestId('input');

	// will look for inputs
	for (let i = 0; i < input.length; i++) {
		expect(input[i].name).toBe(inputs[i]);
	}
});

test('button should be disabled ', () => {
	const register = render(
		<AuthContextProvider>
			<StaticRouter>
				<Register />
			</StaticRouter>
		</AuthContextProvider>
	);
	const btn = register.getByTestId('btn');
	expect(btn.disabled).toBe(true);
});

test('button should be enabled on text change ', () => {
	const register = render(
		<AuthContextProvider>
			<StaticRouter>
				<Register />
			</StaticRouter>
		</AuthContextProvider>
	);

	const input = register.getAllByTestId('input');
	const btn = register.getByTestId('btn');

	fireEvent.change(input[0], {target: {value: 'a'}});
	fireEvent.change(input[1], {target: {value: 'p'}});
	fireEvent.change(input[2], {target: {value: 'p'}});
	expect(btn.disabled).toBe(false);
});
