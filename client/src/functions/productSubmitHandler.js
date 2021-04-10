import { removeFromArray } from './removeFromArray';
import { constructObj } from './constructDispatchObj';

export const productSubmitHandler = (inputsObj, disp, action, errorHandler) => {
	// store errors in array
	const errors = [];

	// if reserved && no reserve ID - error
	if (inputsObj.reserved && !inputsObj.reserveId) {
		errors.push('reserveId');
	}

	// Grab input object entries
	const inputsArray = Object.entries(inputs);
	let pureInputs = removeFromArray(inputsArray, [
		'reserved',
		'reserveId',
		'comments',
		'product',
	]);

	// If input is empty - push key into errors array
	pureInputs.forEach((input) => {
		if (!input[1]) errors.push(input[0]);
	});

	// Check for errors
	const pass = () => {
		const objDispatch = constructObj(inputs, originObj);
		disp(action);
	};

	errorHandler(errors, pass);
};
