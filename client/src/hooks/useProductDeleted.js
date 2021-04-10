import React, { useState } from 'react';

export const useProductDeleted = () => {
	const [deleted, setDeleted] = useState({
		success: false,
		error: false,
	});

	const deleteHandler = (msg) => {
		if (msg === 'success') {
			setDeleted({
				...deleted,
				success: true,
			});
			return;
		}
		if (msg === 'error') {
			setDeleted({
				...deleted,
				error: true,
			});
		}
	};

	return { deleted, setDeleted, deleteHandler };
};
