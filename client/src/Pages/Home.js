import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// Components
import ProductTable from '../Components/ProductTable';
import ProductFilter from '../Components/ProductFilter';
import FilterRow from '../Components/FilterRow';
import Pagination from '../Components/Pagination';
// Fns
import { filterProducts } from '../functions/filterProducts';
import { splitArray } from '../functions/spplitArray';
// Hooks
import { useFilterProducts } from '../hooks/useFilterProducts';
import { usePagination } from '../hooks/usePagination';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../Redux/actions/productsAction';
import { typesAction } from '../Redux/actions/typesAction';

const PER_PAGE = 15;

const Home = () => {
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
	// Show & hide filter
	const [showFilter, setShowFilter] = useState(false);
	const displayFilterHandler = () => {
		if (!showFilter) {
			setShowFilter(true);
		} else {
			clearInputs();
			setShowFilter(false);
		}
	};
	// Grab product types
	const types = Object.values(useSelector((state) => state.types.types));

	// Use Pagination
	const spltArray = splitArray(displayProducts, PER_PAGE);
	const { currentPage, setCurrentPage, countHandler } =
		usePagination(spltArray);

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
		setCurrentPage(1);
		filterProducts(products, filterInputs, sortProducts, setDisplayProducts);
	}, [filterInputs, products, sortProducts, setCurrentPage]);

	return (
		<StyledWrapper>
			<h1>Products</h1>
			<div className="filter">
				<ProductFilter
					sortHandler={sortHandler}
					showFilter={showFilter}
					displayFilterHandler={displayFilterHandler}
				/>
			</div>
			<div className="filter-wrapper">
				{showFilter && (
					<FilterRow
						filterValuesHandler={filterValuesHandler}
						filterSelectHandler={filterSelectHandler}
						types={types}
					/>
				)}

				<ProductTable
					products={spltArray[currentPage - 1]}
					isLoading={isLoading}
				/>
			</div>
			<Pagination spltArray={spltArray} countHandler={countHandler} />
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	padding: 3rem;
	margin: 0 auto;
	overflow: hidden;
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

	.filter-wrapper {
		overflow-x: scroll;
	}
`;

export default Home;
