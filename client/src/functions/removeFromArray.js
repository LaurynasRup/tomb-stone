// Remove a number of items from array
export const removeFromArray = (arrayOriginal, arrayRemove) => {
	// iterate through array and remove items
	let newArray = arrayOriginal.filter((el) => !arrayRemove.includes(el[0]));
	return newArray;
};
