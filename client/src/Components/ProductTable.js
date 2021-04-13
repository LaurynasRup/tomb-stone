import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { productsAction } from '../Redux/actions/productsAction';
import { typesAction } from '../Redux/actions/typesAction';
import { useHistory } from 'react-router-dom';
// Icons
import { MdDone } from 'react-icons/md';
const ProductTable = () => {
	// Retrieve token
	const { token } = useSelector((state) => state.user);
	const { products, isLoading } = useSelector((state) => state.products);
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
	const history = useHistory();
	const openProductHandler = (id) => {
		history.push(`product_view/${id}`);
	};

	return (
		<>
			{!isLoading && (
				<StyledTable>
					<thead>
						<tr>
							<th>Barcode</th>
							<th>Type</th>
							<th>Length</th>
							<th>Height</th>
							<th>Width</th>
							<th>Place</th>
							<th>Reserved</th>
						</tr>
					</thead>
					<tbody>
						{products.map((prod) => (
							<tr
								key={prod._id}
								id={prod._id}
								onClick={() => openProductHandler(prod._id)}
							>
								<td>{prod.barcode}</td>
								<td>{prod.product.product_type} </td>
								<td>{prod.dimensions.short}</td>
								<td>{prod.dimensions.long}</td>
								<td>{prod.dimensions.width}</td>
								<td>{prod.warehouse_location}</td>
								<td className="mid">
									{prod.reserved.isReserved ? <MdDone size={20} /> : ''}
								</td>
							</tr>
						))}
					</tbody>
				</StyledTable>
			)}
		</>
	);
};

const StyledTable = styled.table`
	border-collapse: collapse;
	width: 100%;
	th {
		border-top: solid 1px #5c5c5c;
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;
		text-align: left;
		font-weight: 600;
		background: #d6d6d6;
		min-width: 100px;
	}
	tbody {
		tr {
			transition: background 0.2s ease;
			&:hover {
				background: #eeeeee;
			}
		}
	}
	td {
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;
		cursor: pointer;
	}
`;

export default ProductTable;
