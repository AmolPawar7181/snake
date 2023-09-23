import React from 'react';

const LeaderBoard = ({players}) => {
	return (
		<div className='bg-white rounded-lg p-4 shadow-md'>
			<h2 className='text-2xl font-bold mb-4'>Leaderboard</h2>
			<div className='overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr>
							<th className='py-2 px-4 text-left'>#</th>
							<th className='py-2 px-4 text-left'>Player</th>
							<th className='py-2 px-4 text-left'>Score</th>
						</tr>
					</thead>
					<tbody>
						{players && players.length > 0 ? (
							players.map((player, i) => (
								<tr
									key={player._id}
									className={i % 2 === 0 ? 'bg-gray-100' : ''}
								>
									<td className='py-2 px-4'>{i + 1}</td>
									<td className='py-2 px-4'>{player.name}</td>
									<td className='py-2 px-4'>{player.highScore}</td>
								</tr>
							))
						) : (
							<tr className={'bg-gray-100'}>
								<td className='py-2 px-4' colSpan={3}>
									Loading...
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LeaderBoard;
