import React from 'react';
import styled from 'styled-components';
// Components
import ProductTable from '../Components/ProductTable';
import { BtnLink } from '../Components/Button';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';

const Home = () => {
	return (
		<StyledWrapper>
			<h1>Products</h1>
			<div className="filter"></div>
			<ProductTable />
			<div className="btn-cont">
				<BtnLink link="/product_add">
					<AiOutlinePlus />
					&nbsp; Add new product
				</BtnLink>
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	height: 92vh;
	padding: 3rem;
	h1 {
		font-weight: 400;
		margin-bottom: 2rem;
	}
	.btn-cont {
		padding-top: 1.5rem;
		width: 100%;
		display: flex;
		justify-content: center;
	}
`;

export default Home;
