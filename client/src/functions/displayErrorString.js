export const displayError = (array, item, error) => {
	if (array.includes(item)) return error;
	return '';
};
