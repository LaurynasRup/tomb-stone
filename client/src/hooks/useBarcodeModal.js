import { useState } from 'react';
import Quagga from 'quagga';

export const useBarcodeModal = (result, fn) => {
	const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);

	const barcodeModalHandler = (e) => {
		e.preventDefault();
		if (barcodeModalOpen) {
			fn(result);
			Quagga.stop();
			setBarcodeModalOpen(false);
		} else {
			setBarcodeModalOpen(true);
		}
	};

	return { barcodeModalOpen, barcodeModalHandler };
};
