import React from 'react';
import styled from 'styled-components';

const ProductOpen = ({ currentProduct }) => {
	return (
		<Wrapper>
			<h1>Product {currentProduct.barcode}</h1>
			<div className="line"></div>
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
