// Split array into smaller arrays
export const splitArray = (array) => {
	const arr = array.reduce((resArray, item, index) => {
		const chunkIdx = Math.floor(index / 15);

		if (!resArray[chunkIdx]) {
			resArray[chunkIdx] = [];
		}

		resArray[chunkIdx].push(item);

		return resArray;
	}, []);

	return arr;
};
