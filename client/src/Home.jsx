import {useEffect, useState} from 'react';

import Snake from './components/Snake';
import Food from './components/Food';
import LeaderBoard from './components/LeaderBoard';
import Header from './components/Header';
import './App.css';
import {
	API_URL,
	GRID_SIZE,
	SNAKE_INITIAL,
	initialSnakeState,
	initialSnakeSpeed,
	gameStates,
} from './constants/constants';

const Home = () => {
	const [snake, setSnake] = useState([...initialSnakeState]);
	const [food, setFood] = useState(generateFoodPosition());
	const [direction, setDirection] = useState('DOWN');
	const [gameState, setGameState] = useState('');
	const [gameTimer, setGameTimer] = useState(3);
	const [score, setScore] = useState(0);
	const [topPlayers, setTopPlayers] = useState([]);
	const [gameSpeed, setGameSpeed] = useState(initialSnakeSpeed);

	// will get top 5 players
	useEffect(() => {
		getTopPlayers();
	}, []);

	// to start the loop for the snake
	useEffect(() => {
		if (gameState === gameStates.paused)
			return window.addEventListener('keydown', handleKeyPress);
		// will return if game is over
		if (gameState !== gameStates.start) return;
		window.addEventListener('keydown', handleKeyPress);

		// set game level
		setGameSpeed(increaseGameSpeed(score));

		const gameLoop = setInterval(() => {
			// create new snake
			const newSnake = [...snake];
			// get head of the snake
			const newHead = {...newSnake[0]};
			// set head based on direction
			switch (direction) {
				case 'UP':
					newHead.y -= 1;
					break;
				case 'DOWN':
					newHead.y += 1;
					break;
				case 'LEFT':
					newHead.x -= 1;
					break;
				case 'RIGHT':
					newHead.x += 1;
					break;
				default:
					break;
			}
			// add new head to snake
			newSnake.unshift(newHead);

			// remove the tail if the snake didn't eat the food
			if (newHead.x !== food.x || newHead.y !== food.y) {
				newSnake.pop();
			} else {
				// Generate new food position
				setFood(generateFoodPosition());
				// set score
				setScore((prev) => prev + 5);
			}

			// Check collision with walls
			if (
				newHead.x < 0 ||
				newHead.x >= GRID_SIZE ||
				newHead.y < 0 ||
				newHead.y >= GRID_SIZE
			) {
				setGameState(gameStates.over);
				clearInterval(gameLoop);
				setUserScore();
				return;
			}

			// end game when head touches body
			// starting i with 1 to ignore initial snake state
			for (let i = 2; i < newSnake.length; i++) {
				if (newSnake[i].x === newHead.x && newSnake[i].y === newHead.y) {
					if (newSnake[i].x !== SNAKE_INITIAL) {
						setGameState(gameStates.over);
						clearInterval(gameLoop);
						setUserScore();
						return;
					}
				}
			}

			setSnake(newSnake);
		}, gameSpeed);
		// if game over
		if (gameState === gameStates.over) {
			clearInterval(gameLoop);
			setUserScore();
		}

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
			clearInterval(gameLoop);
		};
	}, [snake, food, direction, gameState]);

	// start the timer before game
	useEffect(() => {
		let gameCounter;
		if (gameState === 'INIT' || gameState === 'START') {
			if (gameTimer === 0) {
				setGameState('START');
				return clearInterval(gameCounter);
			}
			setScore(0);
			gameCounter = setInterval(() => {
				setGameTimer((prev) => prev - 1);
			}, 500);
		} else {
			setGameTimer(3);
		}
		return () => clearInterval(gameCounter);
	}, [gameTimer, gameState]);

	const handleKeyPress = (e) => {
		// will play/pause the game when shift key is pressed
		if (e.keyCode === 32) {
			gameState !== gameStates.paused
				? setGameState(gameStates.paused)
				: setGameState(gameStates.start);
			return;
		}
		// will check game state before setting the direction
		if (gameState !== gameStates.init) {
			switch (e.key) {
				case 'ArrowUp':
					if (direction !== 'DOWN') {
						setDirection('UP');
					}
					break;
				case 'ArrowDown':
					if (direction !== 'UP') {
						setDirection('DOWN');
					}
					break;
				case 'ArrowLeft':
					if (direction !== 'RIGHT') {
						setDirection('LEFT');
					}
					break;
				case 'ArrowRight':
					if (direction !== 'LEFT') {
						setDirection('RIGHT');
					}
					break;
				default:
					break;
			}
		}
	};

	function increaseGameSpeed(score) {
		switch (score) {
			case score < 50:
				return 100;
			case score > 50 && score < 100:
				return 90;
			case score > 100 && score < 150:
				return 80;
			case score > 150 && score < 200:
				return 70;
			case score > 200 && score < 250:
				return 60;
			default:
				return 100;
		}
	}

	// to generate a random position for the food
	function generateFoodPosition() {
		// Generate random x and y coordinates within the grid
		const maxX = GRID_SIZE - 1; // Maximum x coordinate
		const maxY = GRID_SIZE - 1; // Maximum y coordinate

		// Generate random coordinates for the food
		const randomX = Math.floor(Math.random() * (maxX + 1));
		const randomY = Math.floor(Math.random() * (maxY + 1));

		// Ensure the food doesn't spawn on the snake's body
		const snakeBody = snake.map((segment) => `${segment.x}_${segment.y}`);
		const foodPosition = `${randomX}_${randomY}`;

		if (snakeBody.includes(foodPosition)) {
			// Recurse to generate a new position if the food would spawn on the snake
			return generateFoodPosition();
		}

		return {x: randomX, y: randomY};
	}

	function setUserScore() {
		let userData = JSON.parse(localStorage.getItem('user'));
		if (userData) {
			const highScore = userData.highScore;
			userData.highScore =
				userData.highScore < score ? score : userData.highScore || score;
			userData.score = score;
			// update score only if current score is greater than previous high
			if (score > highScore) {
				saveScoreToDB(userData);
			}
			localStorage.setItem('user', JSON.stringify(userData));
		}
	}

	const getTopPlayers = async () => {
		try {
			const response = await fetch(`${API_URL}/api/v1/user/getHighScores`);
			const resp = await response.json();
			if (resp.success) {
				setTopPlayers([...resp.result]);
			}
		} catch (error) {
			alert(error);
		}
	};

	const saveScoreToDB = async (user) => {
		try {
			const response = await fetch(`${API_URL}/api/v1/user/setHighScore`, {
				method: 'POST',
				//credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			const resp = await response.json();
			if (resp.success) {
				getTopPlayers();
			}
		} catch (error) {
			alert(error);
		}
	};

	const startTimer = (isRestart) => {
		setGameState(gameStates.init);
		if (isRestart) {
			setSnake([...initialSnakeState]);
			setDirection('DOWN');
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex'>
			{/* Header */}
			<Header />

			{/* Leaderboard */}
			<div className='p-2 mt-[80px]'>
				<LeaderBoard players={topPlayers} />
			</div>

			{/* Game board */}
			<div className='container mx-auto mt-4'>
				<div
					className={`game ${
						gameState === gameStates.over
							? 'ended'
							: gameState === gameStates.start
							? 'start'
							: 'paused'
					} bg-white rounded-lg overflow-hidden shadow-md`}
				>
					{direction}
					<div
						className='board grid grid-cols-20 grid-rows-20 w-400 h-400 mx-auto border-2 border-gray-300'
						data-testid='board'
					>
						{/* Render Snake and Food components here */}
						<Snake snake={snake} />
						<Food food={food} />
					</div>
					{gameState === '' || gameState === gameStates.init ? (
						<div
							className='game-starter flex items-center justify-center text-white cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
							onClick={() => startTimer(false)}
							data-testid='start'
						>
							{gameState === '' ? (
								<div className='starter text-3xl font-extrabold text-slate-900'>
									Start
								</div>
							) : (
								<div
									className='timer text-3xl font-extrabold text-slate-900'
									data-testid='timerCount'
								>
									{gameTimer}
								</div>
							)}
						</div>
					) : gameState === gameStates.over ? (
						<div
							className='game-restarter flex items-center justify-center text-white cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
							onClick={() => startTimer(true)}
						>
							<div className='starter text-3xl font-extrabold text-slate-900'>
								Game Over
							</div>
						</div>
					) : null}
				</div>
				<div
					data-testid='score'
					className='score text-white mt-4 text-2xl font-bold'
				>
					Score: {score}
				</div>
			</div>
		</div>
	);
};

export default Home;
