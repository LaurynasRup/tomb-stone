import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
// Compoenents
import ProductOpen from '../Components/ProductOpen';
const ProductView = () => {
	const location = useLocation();
	// Grab product id from the url
	const pathArray = location.pathname.split('/');
	const productId = pathArray[pathArray.length - 1];
	// find product in products array
	const currentProduct = useSelector((state) =>
		state.products.products.find((el) => el._id === productId)
	);
	const history = useHistory();
	if (!currentProduct) {
		history.push('/home');
	}
	return (
		<Wrapper>
			{currentProduct && <ProductOpen currentProduct={currentProduct} />}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 92vh;
	padding: 3rem;
`;

export default ProductView;
