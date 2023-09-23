const API_URL = 'https://snake-no5a.onrender.com';

const GRID_SIZE = 20; // Number of cells in each row/column
const CELL_SIZE = 20; // Size of each cell in pixels
const SNAKE_INITIAL = 9;

const initialSnakeState = [
	{x: SNAKE_INITIAL, y: 2},
	{x: SNAKE_INITIAL, y: 3},
	{x: SNAKE_INITIAL, y: 4},
];
const scoreInterval = 5;
const maxScore = GRID_SIZE * CELL_SIZE * scoreInterval;
const initialSnakeSpeed = 100;

const gameLevels = {
	1: 100,
	2: 90,
	3: 80,
	4: 70,
	5: 60,
	6: 50,
	4: 40,
};

const gameStates = {
	init: 'INIT',
	start: 'START',
	paused: 'PAUSED',
	over: 'OVER',
};

export {
	API_URL,
	GRID_SIZE,
	CELL_SIZE,
	SNAKE_INITIAL,
	initialSnakeState,
	scoreInterval,
	maxScore,
	initialSnakeSpeed,
	gameLevels,
	gameStates,
};
