export const consctructObj = (obj, obj2) => {
	return {
		barcode: obj.barcode,
		comments: obj.comments,
		dimensions: {
			dimensions_short: obj.length,
			dimensions_long: obj.height,
			dimensions_width: obj.width,
		},
		edited_by: obj.editedBy,
		product: {
			product_type: obj.product.product_type,
			type_img: obj.product.type_img,
		},
		product_img: obj2.product_img,
		reserved: {
			isReserved: obj.reserved,
			id: obj.reserveId,
		},
		warehouse_location: obj.location,
	};
};
