import { ModalWrapper, StyledForm } from '../StyledComps/styledComponents';
// Components
import { BtnGreen } from '../Components/Button';
// Hooks
import { useInputErrors } from '../hooks/useInputErrors';
// functions
import { displayError } from '../functions/displayErrorString';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Redux Action
import { addNewUserAction } from '../Redux/actions/userAction';

const AddUserModal = ({
	closeAddUserModal,
	userDetails,
	userDetailsHandler,
	showAddUserModal,
	showModalMsgHandler,
}) => {
	// Grab token
	const { token } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// Manage errors
	const { inputErrors, inputErrorHandler } = useInputErrors();
	const submitHandler = () => {
		const errors = [];
		// Inputs array
		const inputsArray = Object.entries(userDetails);
		// If empty input, add to errors array
		inputsArray.forEach((entry) => {
			if (entry[1] === '') {
				errors.push(entry[0]);
			}
		});
		// Do passwords match
		if (userDetails.password !== '' && userDetails.confirmPass !== '') {
			if (userDetails.password !== userDetails.confirmPass) {
				errors.push('passwordMatch');
			}
		}
		// Fn to dispatch
		const pass = () => {
			// Construct user obj
			const userObjDispatch = {
				name: userDetails.name,
				username: userDetails.username,
				password: userDetails.password,
				admin: userDetails.admin,
			};
			// dispatch
			dispatch(
				addNewUserAction(
					token,
					userObjDispatch,
					showAddUserModal,
					showModalMsgHandler
				)
			);
		};
		inputErrorHandler(errors, pass);
	};
	return (
		<>
			<ModalWrapper className="outer" onClick={closeAddUserModal}>
				<div className="inner">
					<h1>Add new user</h1>
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
										value={userDetails.admin}
										onChange={userDetailsHandler}
									/>
									&nbsp;
									<label htmlFor="is_admin">Make admin</label>
								</div>
							</div>
						</div>
					</StyledForm>
					<BtnGreen handler={submitHandler}>Store new user</BtnGreen>
				</div>
			</ModalWrapper>
		</>
	);
};

export default AddUserModal;
