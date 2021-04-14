import React from 'react';
// Styled
import styled from 'styled-components';
// Redux
import { useSelector } from 'react-redux';
// Icons
import { RiDeleteBin6Line } from 'react-icons/ri';

const AllTypesTable = () => {
	const { types } = useSelector((state) => state.types);
	const typesArray = Object.values(types);
	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Type Name</th>
					<th>Type Code</th>
					<th>Type Image</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{typesArray.map((type) => (
					<tr key={type._id}>
						<td>{type.name}</td>
						<td>{type.type_id}</td>
						<td>
							<img src={type.image} alt="Product Texture" />
						</td>
						<td>
							<RiDeleteBin6Line size={23} />
						</td>
					</tr>
				))}
			</tbody>
		</StyledTable>
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
	th:nth-of-type(3),
	th:nth-of-type(4) {
		text-align: center;
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

		img {
			height: 25px;
			width: 25px;
			border-radius: 50%;
		}
	}
	td:nth-of-type(3),
	td:nth-of-type(4) {
		text-align: center;
	}
`;
export default AllTypesTable;
