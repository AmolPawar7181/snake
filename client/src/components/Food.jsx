import {CELL_SIZE} from '../constants/constants';

const Food = ({food}) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: food.x * CELL_SIZE,
				top: food.y * CELL_SIZE,
				width: CELL_SIZE,
				height: CELL_SIZE,
				backgroundColor: 'red',
				borderRadius: '6px',
			}}
		></div>
	);
};

export default Food;
