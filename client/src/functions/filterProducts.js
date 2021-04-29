export const filterProducts = (products, filterInputs, sortInput, fn) => {
	let newArr = products;
	if (filterInputs.barcode !== '') {
		newArr = newArr.filter((item) =>
			item.barcode.toString().includes(filterInputs.barcode)
		);
	}
	if (filterInputs.type !== '') {
		newArr = newArr.filter(
			(item) => item.product.product_type === filterInputs.type
		);
	}
	if (filterInputs.length !== '') {
		newArr = newArr.filter(
			(item) => item.dimensions.long >= filterInputs.length
		);
	}
	if (filterInputs.height !== '') {
		newArr = newArr.filter(
			(item) => item.dimensions.short >= filterInputs.height
		);
	}
	if (filterInputs.width !== '') {
		newArr = newArr.filter(
			(item) => item.dimensions.width >= filterInputs.width
		);
	}
	if (filterInputs.place !== '') {
		newArr = newArr.filter((item) =>
			item.warehouse_location.includes(filterInputs.place)
		);
	}
	if (filterInputs.reserved !== '') {
		newArr = newArr.filter(
			(item) => item.reserved.isReserved === strToBool(filterInputs.reserved)
		);
	}

	if (sortInput !== '') {
		if (sortInput === 'length_asc') {
			newArr = newArr.sort((a, b) => a.dimensions.long - b.dimensions.long);
		}
		if (sortInput === 'length_desc') {
			newArr = newArr.sort((a, b) => b.dimensions.long - a.dimensions.long);
		}
		if (sortInput === 'height_asc') {
			newArr = newArr.sort((a, b) => a.dimensions.short - b.dimensions.short);
		}
		if (sortInput === 'height_desc') {
			newArr = newArr.sort((a, b) => b.dimensions.short - a.dimensions.short);
		}
		if (sortInput === 'width_asc') {
			newArr = newArr.sort((a, b) => a.dimensions.width - b.dimensions.width);
		}
		if (sortInput === 'width_desc') {
			newArr = newArr.sort((a, b) => b.dimensions.width - a.dimensions.width);
		}
	} else {
		return newArr;
	}

	fn([...newArr]);
};

const strToBool = (str) => {
	if (str === 'true') return true;
	if (str === 'false') return false;
	return;
};
