import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// Components
import ProductTable from '../Components/ProductTable';
import { BtnLink } from '../Components/Button';
import ProductFilter from '../Components/ProductFilter';
// Fns
import { filterProducts } from '../functions/filterProducts';
// Hooks
import { useFilterProducts } from '../hooks/useFilterProducts';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../Redux/actions/productsAction';
import { typesAction } from '../Redux/actions/typesAction';

const Home = () => {
	// Grab user type from redux state
	const { userType } = useSelector((state) => state.user);
	// Retrieve token
	const { token } = useSelector((state) => state.user);
	// Grab products & loading from redux state
	const { products, isLoading } = useSelector((state) => state.products);
	// Filter state
	const {
		filterInputs,
		filterValuesHandler,
		filterSelectHandler,
		clearInputs,
	} = useFilterProducts();

	const [displayProducts, setDisplayProducts] = useState([]);

	// Fetch products
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			// fetch products
			dispatch(productsAction(token));
			//fetch product types
			dispatch(typesAction());
		}
		// fetchTypes();
	}, [token, dispatch]);

	// Set initial products
	useEffect(() => {
		setDisplayProducts(products);
	}, [products]);

	// Update products every time that filter is updated
	useEffect(() => {
		filterProducts(products, filterInputs, setDisplayProducts);
	}, [filterInputs, products]);

	return (
		<StyledWrapper>
			<h1>Products</h1>
			<div className="filter"></div>
			<ProductFilter
				filterValuesHandler={filterValuesHandler}
				filterSelectHandler={filterSelectHandler}
				clearInputs={clearInputs}
			/>
			<ProductTable products={displayProducts} isLoading={isLoading} />
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
	max-width: 1200px;
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
