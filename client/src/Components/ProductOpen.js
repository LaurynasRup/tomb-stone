import React from 'react';
import styled from 'styled-components';
// Compnents
import ProductDetails from './ProductDetails';
import ImageCarousel from './ImageCarousel';
import Button from './Button';
// Icons
import { BsArrowLeft } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';

const ProductOpen = ({
	currentProduct,
	closeModalHandler,
	imgOpen,
	setImgOpen,
	editable,
}) => {
	return (
		<>
			{imgOpen.open && (
				<ImageModal closeModalHandler={closeModalHandler} img={imgOpen} />
			)}
			<Wrapper>
				<h1>Product {currentProduct.barcode}</h1>
				<div className="line"></div>
				<ProductDetails
					currentProduct={currentProduct}
					editable={editable}
					closeModalHandler={closeModalHandler}
					imgOpen={imgOpen}
					setImgOpen={setImgOpen}
				/>
				<ImageCarousel closeModalHandler={closeModalHandler} />
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
		</>
	);
};

// Image modal
const ImageModal = ({ img, closeModalHandler }) => {
	return (
		<ModalOuter className="outer">
			<img src={img.src} alt={img.src} />
			<div className="close-btn">
				<VscChromeClose size={40} onClick={closeModalHandler} />
			</div>
		</ModalOuter>
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

const ModalOuter = styled.div`
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 90%;
		height: 75%;
		object-fit: cover;
	}
	.close-btn {
		position: absolute;
		top: 30px;
		right: 30px;
		svg {
			color: #fff;
		}
	}
`;

export default ProductOpen;
