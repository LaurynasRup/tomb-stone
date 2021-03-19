import React, { useState } from 'react';
import styled from 'styled-components';
// Compnents
import ProductDetails from './ProductDetails';
import ImageCarousel from './ImageCarousel';

const ProductOpen = ({ currentProduct }) => {
	const [editable] = useState(false);
	return (
		<Wrapper>
			<h1>Product {currentProduct.barcode}</h1>
			<div className="line"></div>
			<ProductDetails currentProduct={currentProduct} editable={editable} />
			<ImageCarousel />
			<h1>button</h1>
			<h1>button</h1>
			<h1>button</h1>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	h1 {
		font-weight: 400;
		margin-bottom: 1rem;
	}
	.line {
		width: 100%;
		height: 1px;
		background: #32394d;
		margin-bottom: 1rem;
	}
`;

export default ProductOpen;
