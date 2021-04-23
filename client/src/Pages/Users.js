// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersAction } from '../Redux/actions/userAction';
// Styled Comp
import {
	Wrapper,
	StyledTable,
	BtnContCntr,
} from '../StyledComps/styledComponents';
import { BtnRedSm, BtnSm, BtnLink } from '../Components/Button';
// Icons
import { MdDone, MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect } from 'react';
const Users = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.users);
	useEffect(() => {
		dispatch(getAllUsersAction());
	}, [dispatch]);
	return (
		<Wrapper>
			<h1>Users</h1>
			<div className="line"></div>
			<StyledTable>
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Admin</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, idx) => (
						<tr key={idx}>
							<td>{user.name}</td>
							<td>{user.username}</td>
							<td>{user.admin && <MdDone />}</td>
							<td>
								<BtnSm>
									<MdEdit />
								</BtnSm>
							</td>
							<td>
								<BtnRedSm>
									<MdDelete />
								</BtnRedSm>
							</td>
						</tr>
					))}
				</tbody>
			</StyledTable>
			<BtnContCntr>
				<BtnLink link="#">
					<AiOutlinePlus />
					&nbsp; Add new user
				</BtnLink>
			</BtnContCntr>
		</Wrapper>
	);
};

export default Users;
