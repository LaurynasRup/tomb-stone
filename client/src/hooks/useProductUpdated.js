import React, { useState } from 'react';

export const useProductUpdated = () => {
	const [updated, setUpdated] = useState({
		success: false,
		error: false,
	});

	const updatedHandler = (msg) => {
		if (msg === 'success') {
			setUpdated({
				...updated,
				success: true,
			});
			return;
		}
		if (msg === 'error') {
			setUpdated({
				...updated,
				error: true,
			});
		}
	};

	return { updated, setUpdated, updatedHandler };
};
