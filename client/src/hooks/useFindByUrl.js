import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useFindByUrl = () => {
	const location = useLocation();
	const pathArray = location.pathname.split('/');
	const productId = pathArray[pathArray.length - 1];

	const currentProduct = useSelector((state) =>
		state.products.products.find((el) => el._id === productId)
	);

	return currentProduct;
};
