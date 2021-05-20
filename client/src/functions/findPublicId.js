export const findPublicId = (urlStr) => {
	const imgStrArr = urlStr.split('/');
	const public_id = [
		imgStrArr[imgStrArr.length - 2],
		imgStrArr[imgStrArr.length - 1],
	]
		.join('/')
		.split('.')[0];

	return public_id;
};

export const findMultiPublicId = (strArray) => {
	const idArray = [];

	strArray.forEach((str) => {
		const imgStrArr = str.split('/');
		const public_id = [
			imgStrArr[imgStrArr.length - 2],
			imgStrArr[imgStrArr.length - 1],
		]
			.join('/')
			.split('.')[0];

		idArray.push(public_id);
	});

	return idArray;
};
