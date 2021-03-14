export const inputErrors = (obj, errState) => {
	let errors = [];
	const fields = Object.values(obj);
	fields.forEach((field, idx) => {
		if (field === '') {
			//Get corresponding key
			const key = Object.keys(obj)[idx];
			errors.push(`Please enter ${key}`);
		}
		if (errors.length === fields.length) {
			errors = [];
			errors.push('Please enter all fields');
		}
	});
	errState([...errors]);
};
