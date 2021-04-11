import { useState } from 'react';

export const useInputErrors = () => {
	const [inputErrors, setInputErrors] = useState({
		show: false,
		errors: [],
	});

	const inputErrorHandler = (errorsArr, fn) => {
		if (errorsArr.length > 0) {
			setInputErrors({
				show: true,
				errors: errorsArr,
			});
		} else {
			setInputErrors({
				show: false,
				errors: [],
			});
			fn();
		}
	};

	return { inputErrors, setInputErrors, inputErrorHandler };
};
