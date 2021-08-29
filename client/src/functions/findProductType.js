export const findProductType = (allTypes, typeCode) => {
	const productType = allTypes.filter(type => type.type_id === typeCode);
	if (productType.length === 0) return 'Type does not exist';
	return productType[0].name;
};
