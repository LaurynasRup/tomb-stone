import React from 'react';
import styled from 'styled-components';
// Components
import ProductTable from '../Components/ProductTable';
import { BtnLink } from '../Components/Button';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';
// Redux
import { useSelector } from 'react-redux';

const Home = () => {
	// Grab user type
	const { userType } = useSelector((state) => state.user);
	return (
		<StyledWrapper>
			<h1>Products</h1>
			<div className="filter"></div>
			<ProductTable />
			<div className="btn-cont">
				{userType === 'admin' && (
					<BtnLink link="/product_add">
						<AiOutlinePlus />
						&nbsp; Add new product
					</BtnLink>
				)}
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	/* max-width: 1200px; */
	padding: 3rem;
	overflow: scroll;
	margin: 0 auto;
	@media (max-width: 600px) {
		padding: 3rem 1.5rem;
	}
	h1 {
		font-weight: 400;
		margin-bottom: 2rem;
		@media (max-width: 600px) {
			font-size: 1.6rem;
		}
	}
	.btn-cont {
		padding-top: 1.5rem;
		width: 100%;
		display: flex;
		justify-content: center;
	}
`;

export default Home;
