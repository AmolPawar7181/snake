import '@testing-library/jest-dom';
import Home from '../pages/Home';
import {
	render,
	fireEvent,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import {AuthContextProvider} from '../context/AuthContext';
import {StaticRouter} from 'react-router-dom/server';

window.alert = () => {};

test('score should be zero initially', () => {
	const home = render(
		<AuthContextProvider>
			<StaticRouter>
				<Home />
			</StaticRouter>
		</AuthContextProvider>
	);
	const score = home.getByTestId('score');
	expect(score.innerHTML).toBe('Score: 0');
});

test('start div should be invisible after 3 seconds of click', async () => {
	const home = render(
		<AuthContextProvider>
			<StaticRouter>
				<Home />
			</StaticRouter>
		</AuthContextProvider>
	);
	const start = home.getByTestId('start');
	fireEvent.click(start);

	await waitForElementToBeRemoved(start, {timeout: 3000});

	expect(start).not.toBeInTheDocument();
});
