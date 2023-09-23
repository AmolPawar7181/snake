import React from 'react';
import {CELL_SIZE} from '../constants/constants';

const Snake = ({snake}) => {
	return (
		<>
			{snake.map((pos, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: pos.x * CELL_SIZE,
						top: pos.y * CELL_SIZE,
						width: CELL_SIZE,
						height: CELL_SIZE,
						backgroundColor: 'green',
						borderRadius: '6px',
					}}
				></div>
			))}
		</>
	);
};

export default Snake;
