const CustomForm = ({form}) => {
	return (
		<>
			<h2 className='text-3xl font-extrabold text-center text-gray-800 mb-6'>
				{form.name}
			</h2>
			<form onSubmit={form.handleSubmit}>
				{form.inputs.map((inputProps) => (
					<div className='mb-4' key={inputProps.name}>
						<label
							htmlFor={inputProps.name}
							className='block text-sm font-medium text-gray-600'
						>
							{inputProps.title}
						</label>
						<input
							data-testid={'input'}
							type={inputProps.type}
							id={inputProps.id}
							name={inputProps.name}
							value={inputProps.value}
							onChange={form.handleInputChange}
							required={inputProps.isRequired}
							className='w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400'
						/>
					</div>
				))}
				<div className='flex items-center justify-between'>
					<button
						data-testid='btn'
						type={form.btnProps.type}
						disabled={form.isLoading || !form.isFormValid}
						className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 ${
							!form.isFormValid && 'bg-opacity-50 cursor-not-allowed'
						}`}
						style={{transition: 'background-color 0.3s ease'}}
					>
						{form.isLoading ? form.btnProps.loadingText : form.btnProps.text}
					</button>
				</div>
			</form>
		</>
	);
};

export default CustomForm;
