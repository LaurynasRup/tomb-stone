import { useState } from 'react';

export const useProductInputs = (obj) => {
	const [inputs, setInputs] = useState({
		product: {
			product_type: obj.product.product_type,
			type_img: obj.product.type_img,
		},
		barcode: obj.barcode,
		length: obj.dimensions.short,
		height: obj.dimensions.long,
		width: obj.dimensions.width,
		location: obj.warehouse_location,
		editedBy: obj.edited_by,
		comments: obj.comments,
		reserved: obj.reserved.isReserved,
		reserveId: obj.reserved.id,
	});

	const inputHandler = (e) => {
		if (e.target.id === 'reserved') {
			setInputs({
				...inputs,
				reserved: !inputs.reserved,
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

	return { inputs, inputHandler, selectHandler };
};
