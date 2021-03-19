import React, { useState } from 'react';
import styled from 'styled-components';
// Compnents
import ProductDetails from './ProductDetails';
import ImageCarousel from './ImageCarousel';
import Button from './Button';
// Icons
import { BsArrowLeft } from 'react-icons/bs';

const ProductOpen = ({ currentProduct }) => {
	const [editable] = useState(false);
	return (
		<Wrapper>
			<h1>Product {currentProduct.barcode}</h1>
			<div className="line"></div>
			<ProductDetails currentProduct={currentProduct} editable={editable} />
			<ImageCarousel />
			<ButtonsWrapper>
				<Button link="/home">
					<BsArrowLeft size={20} />
					<span style={{ paddingLeft: '0.2rem' }}>Back</span>
				</Button>
				<div className="btns-right">
					<Button link="#">Split</Button>
					<Button link="#">Edit</Button>
				</div>
			</ButtonsWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding-bottom: 2rem;
	width: 100%;
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

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	.btns-right {
		display: inherit;
		button {
			&:last-of-type {
				margin-left: 0.5rem;
			}
		}
	}
`;

export default ProductOpen;
