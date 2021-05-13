import { useState } from 'react';

export const usePagination = (splitArray) => {
	const [currentPage, setCurrentPage] = useState(1);

	const countHandler = (e) => {
		const idx = e.target.selectedIndex;
		const el = e.target.childNodes[idx];

		setCurrentPage(+el.value);
	};

	return { currentPage, setCurrentPage, countHandler };
};
