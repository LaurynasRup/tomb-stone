import { removeFromArray } from './removeFromArray';
import { constructObj } from './constructDispatchObj';

export const addProduct = (
	inputs,
	dispatch,
	actionFn,
	token,
	modalhandler,
	productId,
	inputErrHandler
) => {
	// Track errors
	const errors = [];

	// If reserved without id - error
	if (inputs.reserved && !inputs.reserveId) {
		errors.push('reserveId');
	}

	// If no type selected - error
	if (!inputs.product.product_type) errors.push('type');

	// If length < height - error
	if (inputs.length < inputs.height) errors.push('dimensions_error');

	// Input Object Entries - to Array
	const inputsArray = Object.entries(inputs);

	// Remove no required fields
	let pureInputs = removeFromArray(inputsArray, [
		'reserved',
		'reserveId',
		'comments',
		'product',
	]);

	// If input is empty - push key to errors
	pureInputs.forEach((input) => {
		if (!input[1]) errors.push(input[0]);
	});

	// Function to dispatch
	const pass = () => {
		// Construct Obj to dispatch
		const objDispatch = constructObj(inputs);
		// Dispatch action
		dispatch(actionFn(token, objDispatch, modalhandler, productId));
	};

	inputErrHandler(errors, pass);
};
