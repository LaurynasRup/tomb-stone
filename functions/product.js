// Return product detail or null
const detailOrNull = (detail, array) => {
	if (detail) {
		return detail;
	} else {
		array.push(null);
		return;
	}
};

module.exports = detailOrNull;
