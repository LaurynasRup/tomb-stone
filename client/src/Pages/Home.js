import React from 'react';
import styled from 'styled-components';
// Components
import ProductTable from '../Components/ProductTable';

const Home = () => {
	return (
		<StyledWrapper>
			<h1>Products</h1>
			<div className="filter"></div>
			<ProductTable />
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	height: 100vh;
	padding: 3rem;
	h1 {
		font-weight: 400;
		margin-bottom: 2rem;
	}
`;

export default Home;
