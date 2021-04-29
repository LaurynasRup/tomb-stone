import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// Styled Comp
import { BtnContCntr } from '../StyledComps/styledComponents';
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
	// Sort state
	const [sortProducts, setStoreProducts] = useState('');
	// Change sort proucts
	const sortHandler = (e) => {
		const idx = e.target.selectedIndex;
		const el = e.target.childNodes[idx].value;
		setStoreProducts(el);
	};
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
		filterProducts(products, filterInputs, sortProducts, setDisplayProducts);
	}, [filterInputs, products, sortProducts]);

	return (
		<StyledWrapper>
			<h1>Products</h1>
			<div className="filter">
				<ProductFilter
					filterValuesHandler={filterValuesHandler}
					filterSelectHandler={filterSelectHandler}
					clearInputs={clearInputs}
					sortHandler={sortHandler}
				/>
			</div>
			<div className="table-wr">
				<ProductTable products={displayProducts} isLoading={isLoading} />
			</div>
			<BtnContCntr>
				{userType === 'admin' && (
					<BtnLink link="/product_add">
						<AiOutlinePlus />
						&nbsp; Add new product
					</BtnLink>
				)}
			</BtnContCntr>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	padding: 3rem;
	/* overflow-x: scroll; */
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

	.table-wr {
		overflow: scroll;
	}
`;

export default Home;
