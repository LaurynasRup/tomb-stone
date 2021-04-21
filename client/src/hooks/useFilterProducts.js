import { useState } from 'react';

export const useFilterProducts = () => {
	const emptyFilterInputObj = {
		barcode: '',
		type: '',
		length: '',
		height: '',
		width: '',
		place: '',
		reserved: '',
	};

	// Control filter inputs
	const [filterInputs, setFilterInputs] = useState(emptyFilterInputObj);

	const filterValuesHandler = (e) => {
		setFilterInputs({
			...filterInputs,
			[e.target.id]: e.target.value,
		});
	};

	const filterSelectHandler = (e) => {
		const idx = e.target.selectedIndex;
		const el = e.target.childNodes[idx].value;
		setFilterInputs({
			...filterInputs,
			[e.target.id]: el,
		});
	};

	const clearInputs = () => {
		setFilterInputs(emptyFilterInputObj);
	};

	return {
		filterInputs,
		setFilterInputs,
		filterValuesHandler,
		filterSelectHandler,
		clearInputs,
	};
};
