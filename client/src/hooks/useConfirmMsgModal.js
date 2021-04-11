import { useState } from 'react';

export const useConfirmMsgModal = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const confirmModalhandler = () => {
		setShowConfirmModal(!showConfirmModal);
	};

	return { showConfirmModal, setShowConfirmModal, confirmModalhandler };
};
