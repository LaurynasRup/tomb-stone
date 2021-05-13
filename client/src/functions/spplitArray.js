// Split array into smaller arrays
export const splitArray = (array, perPage) => {
	const arr = array.reduce((resArray, item, index) => {
		const chunkIdx = Math.floor(index / perPage);

		if (!resArray[chunkIdx]) {
			resArray[chunkIdx] = [];
		}

		resArray[chunkIdx].push(item);

		return resArray;
	}, []);

	return arr;
};
