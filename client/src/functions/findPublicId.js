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
