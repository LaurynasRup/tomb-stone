// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersAction } from '../Redux/actions/userAction';
// Styled Comp
import {
	Wrapper,
	StyledTable,
	BtnContCntr,
} from '../StyledComps/styledComponents';
import { BtnRedSm, BtnSm, Btn } from '../Components/Button';
// Icons
import { MdDone, MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
// Components
import AddUserModal from '../Components/AddUserModal';
const Users = () => {
	// Display add user modal
	const [displayAddUser, setDisplayAddUser] = useState(false);
	// Control add user modal
	const showAddUserModal = () => {
		setDisplayAddUser(!displayAddUser);
	};
	// Close modal on outer div click
	const closeAddUserModal = (e) => {
		if (e.target.classList.contains('outer')) {
			// clear inputs
			setUserDetails({ ...emptyUserObj });
			showAddUserModal();
		}
	};
	const dispatch = useDispatch();
	// Grab All Users from state
	const { users } = useSelector((state) => state.users);
	// Grab current user
	const currentUser = useSelector((state) => state.user);
	// Dispatch get all users action
	useEffect(() => {
		dispatch(getAllUsersAction());
	}, [dispatch]);

	// State to add or edit user
	const emptyUserObj = {
		name: '',
		username: '',
		password: '',
		confirmPass: '',
		admin: false,
	};
	const [userDetails, setUserDetails] = useState(emptyUserObj);
	const userDetailsHandler = (e) => {
		if (e.target.type !== 'checkbox') {
			setUserDetails({
				...userDetails,
				[e.target.id]: e.target.value,
			});
		} else {
			setUserDetails({
				...userDetails,
				admin: e.target.checked,
			});
		}
	};
	return (
		<>
			{displayAddUser && (
				<AddUserModal
					closeAddUserModal={closeAddUserModal}
					userDetails={userDetails}
					userDetailsHandler={userDetailsHandler}
				/>
			)}
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
									{currentUser.name === user.name || !user.admin ? (
										<BtnSm>
											<MdEdit />
										</BtnSm>
									) : (
										''
									)}
								</td>
								<td>
									{currentUser.name === user.name || !user.admin ? (
										<BtnRedSm>
											<MdDelete />
										</BtnRedSm>
									) : (
										''
									)}
								</td>
							</tr>
						))}
					</tbody>
				</StyledTable>
				<BtnContCntr>
					<Btn handler={showAddUserModal}>
						<AiOutlinePlus />
						&nbsp; Add new user
					</Btn>
				</BtnContCntr>
			</Wrapper>
		</>
	);
};

export default Users;
