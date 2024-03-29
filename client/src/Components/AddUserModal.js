import { ModalWrapper, StyledForm } from '../StyledComps/styledComponents';
// Components
import { BtnGreen } from '../Components/Button';
// Hooks
import { useInputErrors } from '../hooks/useInputErrors';
// functions
import { displayError } from '../functions/displayErrorString';
import { addUser } from '../functions/addUser';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Redux Action
import { addNewUserAction, updateUserAcion } from '../Redux/actions/userAction';

const AddUserModal = ({
	closeAddUserModal,
	userDetails,
	userDetailsHandler,
	showAddUserModal,
	showModalMsgHandler,
	addOrEdit,
	editUserId,
}) => {
	// Grab token
	const { token } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();
	const submitHandler = () => {
		addUser(
			dispatch,
			userDetails,
			addNewUserAction,
			token,
			showAddUserModal,
			showModalMsgHandler,
			inputErrorHandler,
			editUserId
		);
	};
	const submitEditHandler = () => {
		addUser(
			dispatch,
			userDetails,
			updateUserAcion,
			token,
			showAddUserModal,
			showModalMsgHandler,
			inputErrorHandler,
			editUserId
		);
	};
	return (
		<>
			<ModalWrapper className="outer" onClick={closeAddUserModal}>
				<div className="inner">
					<h1>{addOrEdit === 'add' ? 'Add new user' : 'Edit user'}</h1>
					<div className="line"></div>
					<StyledForm>
						<div className="form-row">
							<div className="form-control">
								<label htmlFor="name">Full Name</label>
								<small style={{ color: 'red' }}>
									{displayError(
										inputErrors.errors,
										'name',
										'* Name is required'
									)}
									&nbsp;
								</small>
								<input
									type="text"
									id="name"
									placeholder="Enter full name..."
									value={userDetails.name}
									onChange={userDetailsHandler}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="username">Username</label>
								<small style={{ color: 'red' }}>
									{displayError(
										inputErrors.errors,
										'username',
										'* Username is required'
									)}
									&nbsp;
								</small>
								<input
									type="text"
									id="username"
									placeholder="Enter username..."
									value={userDetails.username}
									onChange={userDetailsHandler}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-control">
								<label htmlFor="password">Password</label>
								<small style={{ color: 'red' }}>
									{displayError(
										inputErrors.errors,
										'password',
										'* Password is required'
									)}
									&nbsp;
								</small>
								<input
									type="password"
									id="password"
									placeholder="Enter password..."
									value={userDetails.password}
									onChange={userDetailsHandler}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="password_confirm">Confirm Password</label>
								<small style={{ color: 'red' }}>
									{displayError(
										inputErrors.errors,
										'confirmPass',
										'* Password is required'
									)}
									{displayError(
										inputErrors.errors,
										'passwordMatch',
										'* Passwords do not match'
									)}
									&nbsp;
								</small>
								<input
									type="password"
									id="confirmPass"
									placeholder="Confirm password..."
									value={userDetails.confirmPass}
									onChange={userDetailsHandler}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-control">
								<div className="form-control-inline">
									<input
										type="checkbox"
										id="is_admin"
										checked={userDetails.admin}
										onChange={userDetailsHandler}
									/>
									&nbsp;
									<label htmlFor="is_admin">Make admin</label>
								</div>
							</div>
						</div>
					</StyledForm>
					{addOrEdit === 'add' && (
						<BtnGreen handler={submitHandler}>Add new user</BtnGreen>
					)}
					{addOrEdit === 'edit' && (
						<BtnGreen handler={submitEditHandler}>Save changes</BtnGreen>
					)}
				</div>
			</ModalWrapper>
		</>
	);
};

export default AddUserModal;
