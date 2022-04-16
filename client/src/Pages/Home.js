import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
// Components
import ProductTable from '../Components/ProductTable';
import ProductFilter from '../Components/ProductFilter';
import FilterRow from '../Components/FilterRow';
import Pagination from '../Components/Pagination';
import { BtnLink } from '../Components/Button';
import BarcodeModal from '../Components/BarcodeModal';
import ImageModal from '../Components/ImageModal';
// Fns
import { filterProducts } from '../functions/filterProducts';
import { splitArray } from '../functions/spplitArray';
import { onDetected } from '../functions/onDetected';
// Utils
import { emptyFilterObj } from '../Utils/objects';
// Hooks
import { useFilterProducts } from '../hooks/useFilterProducts';
import { usePagination } from '../hooks/usePagination';
import { useBarcodeModal } from '../hooks/useBarcodeModal';
import { useModalHandler } from '../hooks/useModalHandler';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../Redux/actions/productsAction';
import { typesAction } from '../Redux/actions/typesAction';
// Icons
import { BsPlus } from 'react-icons/bs';
// Products per page
const PER_PAGE = 15;

const Home = () => {
  const location = useLocation();
  // Retrieve token
  const { token, userType } = useSelector(state => state.user);
  // Grab products & loading from redux state
  const { products, isLoading } = useSelector(state => state.products);
  // Sort state
  const [sortProducts, setStoreProducts] = useState('');
  // Change sort proucts
  const sortHandler = e => {
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
    filterBarcodeHandler,
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
  const types = Object.values(useSelector(state => state.types.types));

  // Handle image modal
  const { imgOpen, modalHandler } = useModalHandler();

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

  // // Set initial products
  // useEffect(() => {
  //   setDisplayProducts(products);
  // }, [products]);

  // Update products every time that filter is updated
  // useEffect(() => {
  //   setCurrentPage(1);
  //   filterProducts(products, filterInputs, sortProducts, setDisplayProducts);
  // }, [filterInputs, products, sortProducts, setCurrentPage]);

  // Barcode result
  const [result, setResult] = useState(filterInputs.barcode);
  // Barcode Modal Handling
  const { barcodeModalOpen, barcodeModalHandler } = useBarcodeModal(
    result,
    filterBarcodeHandler,
    setResult
  );

  // Send to filtered page
  const history = useHistory();
  const filteredLinkHandler = () => {
    let urlParamsArr = [];
    let sortVar = '';

    // Add filters
    for (let [key, value] of Object.entries(filterInputs)) {
      if (value !== '') {
        urlParamsArr.push(`${key}=${value}`);
      }
    }

    // Add sort
    if (urlParamsArr.length !== 0 && sortProducts !== '') {
      sortVar = `&sort=${sortProducts}`;
    } else if (urlParamsArr.length === 0 && sortProducts !== '') {
      sortVar = `sort=${sortProducts}`;
    } else {
      sortVar = '';
    }

    history.push(`/home?${urlParamsArr.join('&')}${sortVar}`);
  };

  //Grab url params & convert to obj
  const urlParamsToFilter = (emptyObj, urlParamsStr) => {
    // convert params to obj
    const params = urlParamsStr.slice(1).split('&');
    for (let param of params) {
      const tempArr = param.split('=');
      emptyObj[tempArr[0]] = tempArr[1];
    }
    return emptyObj;
  };

  // Run Filter Function everytime location changes
  useEffect(() => {
    if (location.search === '') {
      setDisplayProducts(products);
    } else {
      const filterObj = urlParamsToFilter(emptyFilterObj, location.search);
      filterProducts(products, filterObj, setDisplayProducts);
    }
  }, [location, products]);

  return (
    <>
      {imgOpen.open && <ImageModal img={imgOpen} modalHandler={modalHandler} />}
      {barcodeModalOpen && (
        <BarcodeModal
          result={result}
          setResult={setResult}
          onDetected={onDetected}
          barcodeModalHandler={barcodeModalHandler}
        />
      )}
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
              barcodeModalHandler={barcodeModalHandler}
              filterInputs={filterInputs}
              filteredLinkHandler={filteredLinkHandler}
            />
          )}

          <ProductTable
            products={spltArray[currentPage - 1]}
            isLoading={isLoading}
            allTypes={types}
            modalHandler={modalHandler}
          />
        </div>
        {userType !== 'regular' && (
          <div className="btn-add-cont">
            <BtnLink link="/product_add" className="btn_add">
              <BsPlus /> &nbsp; Add new product
            </BtnLink>
          </div>
        )}
        <Pagination spltArray={spltArray} countHandler={countHandler} />
      </StyledWrapper>
    </>
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

  .btn-add-cont {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1rem auto;
  }
`;

export default Home;
