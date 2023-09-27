function Loading() {
	return (
		<div className='fixed inset-0 flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600'>
			<div className='bg-white rounded-lg p-4'>
				<div className='flex justify-center items-center mb-4'>
					<svg
						className='animate-spin h-8 w-8 text-blue-500 mr-2'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4.373L9.243 9.62l-1.414 1.415L12 14.2l3.17-3.165-1.415-1.415L12 12.38V4a8 8 0 00-8 8h4z'
						></path>
					</svg>
					<div className='text-2xl font-semibold text-blue-500'>Loading...</div>
				</div>
				<p className='text-gray-700 text-center'>
					Please wait while the content is loading.
				</p>
			</div>
		</div>
	);
}

export default Loading;
