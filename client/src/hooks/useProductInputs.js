import { useState } from 'react';

export const useProductInputs = (obj, userName) => {
	const [inputs, setInputs] = useState({
		product: {
			product_type: obj.product.product_type,
			type_img: obj.product.type_img,
		},
		barcode: obj.barcode,
		length: obj.dimensions.long,
		height: obj.dimensions.short,
		width: obj.dimensions.width,
		location: obj.warehouse_location,
		editedBy: userName,
		comments: obj.comments,
		reserved: obj.reserved.isReserved,
		reserveId: obj.reserved.id,
		productImg: obj.product_img,
	});

	const inputHandler = (e) => {
		if (e.target.id === 'reserved') {
			setInputs({
				...inputs,
				reserved: !inputs.reserved,
				reserveId: inputs.reserved ? inputs.reserveId : '',
			});
			return;
		}
		setInputs({
			...inputs,
			[e.target.id]: e.target.value,
		});
	};

	const selectHandler = (e) => {
		const idx = e.target.selectedIndex;
		const el = e.target.childNodes[idx];
		const imgAttr = el.getAttribute('imgsrc');

		setInputs({
			...inputs,
			product: {
				product_type: e.target.value,
				type_img: imgAttr,
			},
		});
	};

	const imageUploadInputHandler = (arr) => {
		setInputs({
			...inputs,
			productImg: JSON.stringify(arr),
		});
	};
	return { inputs, inputHandler, selectHandler, imageUploadInputHandler };
};
