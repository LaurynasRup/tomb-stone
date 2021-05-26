import { useState } from 'react';
import Quagga from 'quagga';

export const useBarcodeModal = (result, fn, fn2) => {
	const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);

	const barcodeModalHandler = (e) => {
		e.preventDefault();
		if (barcodeModalOpen) {
			fn(result);
			Quagga.stop();
			setBarcodeModalOpen(false);
			document.body.classList.remove('no_scroll');
		} else {
			setBarcodeModalOpen(true);
			fn2('');
			window.scrollTo(0, 0);
			document.body.classList.add('no_scroll');
		}
	};

	return { barcodeModalOpen, barcodeModalHandler };
};
