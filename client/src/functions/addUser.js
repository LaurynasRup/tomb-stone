export const addUser = (
	dispatch,
	userDetails,
	actionFn,
	token,
	modalFn1,
	modalFn2,
	inputErrHandler,
	userId
) => {
	// Store errors
	const errors = [];

	// Transfer user details to array
	const inputsArray = Object.entries(userDetails);

	// If input empty - add to errors arr
	inputsArray.forEach((entry) => {
		if (entry[1] === '') {
			errors.push(entry[0]);
		}
	});

	// See if passwords are matching
	if (userDetails.password !== '' && userDetails.confirmPass !== '') {
		if (userDetails.password !== userDetails.confirmPass) {
			errors.push('passwordMatch');
		}
	}

	// Fn to dispatch
	const pass = () => {
		// Contruct obj to dispatch
		const userObjDispatch = {
			name: userDetails.name,
			username: userDetails.username,
			password: userDetails.password,
			admin: userDetails.admin,
		};
		// Dispatch
		dispatch(actionFn(token, userObjDispatch, modalFn1, modalFn2, userId));
	};

	inputErrHandler(errors, pass);
};
