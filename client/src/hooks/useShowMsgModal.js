import { useState } from 'react';

export const useShowMsgModal = () => {
	const [showMsg, setShowMsg] = useState({
		display: false,
		msg: '',
		link: '',
		linkTxt: '',
	});

	const showModalMsgHandler = (msg) => {
		switch (msg) {
			case 'update success':
				return setShowMsg({
					...showMsg,
					display: true,
					msg: 'Product has been updated succesfully',
					link: '/home',
					linkTxt: 'Go Back',
				});
			case 'update error':
				return setShowMsg({
					...setShowMsg,
					display: true,
					msg: 'Could not update product',
					link: '/home',
					linkTxt: 'Go Back',
				});
			case 'add success':
				return setShowMsg({
					...showMsg,
					display: true,
					msg: 'Product has been added succesfully',
					link: '/home',
					linkTxt: 'Go Back',
				});
			case 'add error':
				return setShowMsg({
					...setShowMsg,
					display: true,
					msg: 'Could not add new product',
					link: '/home',
					linkTxt: 'Go Back',
				});
			case 'delete success':
				return setShowMsg({
					...showMsg,
					display: true,
					msg: 'Item deleted succesfully',
					link: '/home',
					linkTxt: 'Go Back',
				});
			case 'delete error':
				return setShowMsg({
					...showMsg,
					display: true,
					msg: 'Could not delete item',
					link: '/home',
					linkTxt: 'Go Back',
				});
			default:
				return setShowMsg({
					...showMsg,
				});
		}
	};

	return { showMsg, setShowMsg, showModalMsgHandler };
};
