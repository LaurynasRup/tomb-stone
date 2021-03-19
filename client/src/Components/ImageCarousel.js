import React, { useState } from 'react';
// Styled
import styled from 'styled-components';
// React Icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageCarousel = () => {
	const arr = [
		'https://www.rubberduckbathrooms.co.uk/images/big/carrara-marble-slab-B-689.jpg',
		'https://images.photowall.com/products/57653/marble-with-yellow-veins.jpg?h=699&q=85',
		'https://www.ilovewallpaper.com/images/liquid-marble-wallpaper-pink-gold-p7299-24098_image.jpg',
	];

	const [count, setCount] = useState(0);
	const changeImgHandler = (e) => {
		const target = e.target.closest('.chevron');

		if (target.classList.contains('left')) {
			let newCount = count - 1;
			setCount(newCount);
		} else {
			let newCount = count + 1;
			setCount(newCount);
		}
	};
	return (
		<StyledOuter>
			<img src={arr[count]} alt="Marble Texture" />
			{count !== 0 && (
				<FaChevronLeft
					count={count}
					arr={arr}
					size={40}
					className="chevron left"
					onClick={changeImgHandler}
				/>
			)}
			{count !== arr.length - 1 && (
				<FaChevronRight
					count={count}
					arr={arr}
					size={40}
					className="chevron right"
					onClick={changeImgHandler}
				/>
			)}
		</StyledOuter>
	);
};

const StyledOuter = styled.div`
	width: 100%;
	height: 60vh;
	min-width: 200px;
	border: solid 1px black;
	margin: 2rem 0rem;
	position: relative;
	display: flex;
	align-items: center;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	svg {
		cursor: pointer;
		position: absolute;
		color: rgba(0, 0, 0, 0.7);
	}
	svg.left {
		left: 10px;
	}
	svg.right {
		right: 10px;
	}
`;

export default ImageCarousel;
