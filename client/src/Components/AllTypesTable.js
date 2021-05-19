// Styled
import styled from 'styled-components';
// Components
import { BtnRedSm } from '../Components/Button';
// Icons
import { MdDelete } from 'react-icons/md';

const AllTypesTable = ({ productDeleteHandler, typesArray }) => {
	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Name</th>
					<th>Code</th>
					<th>Image</th>
					<th>Delete</th>
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
							<BtnRedSm
								handler={() => productDeleteHandler(type.type_id, type._id)}
							>
								<MdDelete />
							</BtnRedSm>
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
	min-width: 400px;
	overflow-y: scroll;
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
			cursor: default;
			transition: background 0.2s ease;
		}
	}
	td {
		border-bottom: solid 1px #5c5c5c;
		padding: 0.4rem;

		img {
			height: 25px;
			width: 25px;
			border-radius: 50%;
		}
	}
`;
export default AllTypesTable;
