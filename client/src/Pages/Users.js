// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllUsersAction,
	deleteUserAction,
} from '../Redux/actions/userAction';
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
import MessageModal from '../Components/MessageModal';
import ConfirmMessageModal from '../Components/ConfirmMessageModal';
// Hooks
import { useShowMsgModal } from '../hooks/useShowMsgModal';
import { useConfirmMsgModal } from '../hooks/useConfirmMsgModal';
const Users = () => {
	// Display add user modal
	const [displayAddUser, setDisplayAddUser] = useState(false);
	// Control add user modal
	const showAddUserModal = () => {
		setDisplayAddUser(!displayAddUser);
	};
	// Close modal on outer div click
	const closeAddUserModal = (e) => {
		if (e) {
			if (e.target.classList.contains('outer')) {
				// clear inputs
				setUserDetails({ ...emptyUserObj });
				showAddUserModal();
			}
		} else {
			// clear inputs
			setUserDetails({ ...emptyUserObj });
			showAddUserModal();
		}
	};

	const { showMsg, showModalMsgHandler } = useShowMsgModal();

	const dispatch = useDispatch();
	// Grab All Users from state
	const { users } = useSelector((state) => state.users);
	// Grab current user
	const currentUser = useSelector((state) => state.user);
	// Grab token
	const { token } = useSelector((state) => state.user);
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
	// State to track user to be deleted
	const [userToDelete, setUserToDelete] = useState(null);
	// State to handle delete confirm modal
	const { showConfirmModal, confirmModalhandler } = useConfirmMsgModal();

	// Handle delete button click
	const deleteUserHandler = (e) => {
		const target = e.target.closest('button').parentNode;
		const userId = target.getAttribute('userid');
		const userToDel = users.filter((user) => user._id === userId);
		setUserToDelete(userToDel[0]);
		confirmModalhandler();
	};
	// Handle delete user confirmation
	const confirmDeleteHandler = () => {
		confirmModalhandler();
		dispatch(deleteUserAction(token, userToDelete._id));
	};
	return (
		<>
			{showConfirmModal && (
				<ConfirmMessageModal
					msg={`Delete user ${userToDelete.name} ?`}
					cancelHandler={confirmModalhandler}
					confirmHandler={confirmDeleteHandler}
				/>
			)}
			{displayAddUser && (
				<AddUserModal
					closeAddUserModal={closeAddUserModal}
					userDetails={userDetails}
					userDetailsHandler={userDetailsHandler}
					showAddUserModal={showAddUserModal}
					showModalMsgHandler={showModalMsgHandler}
				/>
			)}
			{showMsg.display && (
				<MessageModal
					msg={showMsg.msg}
					link={showMsg.link}
					linkTxt={showMsg.linkTxt}
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
										<div userid={user._id} onClick={deleteUserHandler}>
											<BtnRedSm>
												<MdDelete />
											</BtnRedSm>
										</div>
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
