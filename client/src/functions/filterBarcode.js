export const filterBarcode = (products, barcode) => {
	let newArr = [...products];

	if (barcode === '') {
		newArr = [...products];
	}

	if (barcode !== '') {
		newArr = newArr.filter(item => item.barcode.toString().includes(barcode));
	}

	return newArr;
};
