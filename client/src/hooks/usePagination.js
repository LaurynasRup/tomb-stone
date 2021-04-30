import { useState } from 'react';

export const usePagination = (splitArray) => {
	const [currentPage, setCurrentPage] = useState(1);

	const countHandler = (e) => {
		const target = e.target.closest('svg');
		if (target.classList.contains('inc')) {
			if (currentPage !== splitArray.length) {
				setCurrentPage(currentPage + 1);
			}
		}
		if (target.classList.contains('dec')) {
			if (currentPage !== 1) {
				setCurrentPage(currentPage - 1);
			}
		}
	};

	return { currentPage, setCurrentPage, countHandler };
};
