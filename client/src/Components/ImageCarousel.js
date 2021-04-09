import React, { useState } from 'react';
// Styled
import styled from 'styled-components';
// React Icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageCarousel = ({ modalHandler, images }) => {
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
		<>
			{JSON.parse(images).length > 0 && (
				<StyledOuter>
					<img
						src={JSON.parse(images)[count]}
						alt="Marble Texture"
						onClick={modalHandler}
					/>
					{count !== 0 && (
						<FaChevronLeft
							count={count}
							arr={JSON.parse(images)}
							size={40}
							className="chevron left"
							onClick={changeImgHandler}
						/>
					)}
					{count !== JSON.parse(images).length - 1 && (
						<FaChevronRight
							count={count}
							arr={JSON.parse(images)}
							size={40}
							className="chevron right"
							onClick={changeImgHandler}
						/>
					)}
				</StyledOuter>
			)}
		</>
	);
};

const StyledOuter = styled.div`
	width: 100%;
	height: 60vh;
	min-width: 200px;
	border: solid 1px #a3a3a3;
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
		color: rgba(0, 0, 0, 0.8);
	}
	svg.left {
		left: 10px;
	}
	svg.right {
		right: 10px;
	}
`;

export default ImageCarousel;
