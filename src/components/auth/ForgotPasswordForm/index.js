import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, InputGroup, Button } from 'reactstrap';
import { Auth } from 'aws-amplify';
import AuthUI from '../AuthUI';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import redirect from '../../../utils/redirect';
import linkTo from '../../../utils/linkTo';

const ForgotPasswordForm = ({ initialAlert, location, history }) => {

	const [step, setStep] = useState(0); // 0 - send code via email, 1 - change password
	const [email, setEmail] = useState('');
	const [alert, setAlert] = useState({
		...initialAlert
	});
	const [code, setCode] = useState('');
	const [passwords, setPasswords] = useState({
		password: '',
		confirmPassword: ''
	}); // Holds both the password and confirmation of the password

	const [passwordChanged, setPasswordChanged] = useState(false);

	/* IMPORTANT - this function may not reflect the serverside validation, it is only here to cut down on the number of API requests made during account signup */
	const validPassword = () => {
		const { password } = passwords;

		return password.length >= 8 &&
			password.match(/[a-z]/) !== null && password.match(/[A-Z]/) !== null;
	}

	/* IMPORTANT - this function may not reflect the serverside validation, it is only here to cut down on the number of API requests made during account signup */
	const invalidPassword = () => {
		return passwordChanged && !validPassword();
	}



	/* Helper function to hide any displayed alert */
	const hideAlert = () => {
		setAlert({
			...alert,
			content: ''
		});
	}

	/* Helper function to redirect the user back to the signin page and display an alert informing them that their password has been changted */
	const showSuccessAlert = () => {
		redirect('/signin', location, history, {
			alert: {
				type: 'success',
				content: 'Password successfully changed'
			}
		});
	}

	/* Helper function to display an alert using danger theme colors */
	const setError = content => {
		setAlert({
			type: 'danger',
			content
		})
	}

	/* Handles onChange events for the passwordd fields, based on the input field's name attribute */
	function handlePasswordChange(e) {
	// Handle first password (name not type) field onChange event
		if(e.target.name === 'password' && !passwordChanged) {
			setPasswordChanged(true);
		}

		setPasswords({
			...passwords,
			[e.target.name]: e.target.value
		});
	}

	/* Only allow digits to be entered into the code field in step 1 */
	const handleCodeChange = e => {
		if(e.target.value.length === 0 || e.target.value.charAt(e.target.value.length - 1).match(/[0-9]/)) {
			setCode(e.target.value);
		}
	}

	const handleSubmit = async e => {
		e.preventDefault();

		// Handle sneding of verification email
		if(step === 0) {
			try {
				await Auth.forgotPassword(email)
					.then(() => {
						setStep(1);
					})
					.catch(err => {
						if(err.code === 'InvalidParameterException') {
							setAlert({
								type: 'danger',
								content: <>
								Oh no! Something went wrong!&nbsp;<Link to={linkTo('/verify', location)}>Resend verification link</Link>
								</>
							})
						}
					});
			} catch {
				//
			}
		} else if(step === 1) { // Handle submission of new password verification
			// Client side error messages
			if(code.length !== 6) {
				setError('Verification code must be 6 digits');
			} if(!validPassword()) {
				if(passwords.password.length < 8) {
					setError('Password must be at least 8 charcters');
				} else {
					setError('Password must contain both upper and lower case letters');
				}
			} else if(passwords.password !== passwords.confirmPassword) {
				setError('Make sure your passwords match')
			} else {
				// Server side API request and response handling
				try {
					await Auth.forgotPasswordSubmit(email, code, passwords.password)
						.then(() => {
							showSuccessAlert(); // Change successful
						}, () => {
							setError('Oh no! Something went wrong!'); // Password change failed
						});
				} catch {
					//
				}
			}

		}
	}





	/* Renders the form for step 0 */
	const renderStep0 = () => {
		return <Form inline onSubmit={handleSubmit}>
			<InputGroup>
				<Input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					placeholder="name@example.com"
				/>
				<Button type="submit">Send</Button>
			</InputGroup>
		</Form>
	}

	/* Render the form for step 1 */
	const renderStep1 = () => {
		return <Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label for="step1-email">Email</Label>
				<Input
					type="email"
					id="step1-email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					placeholder="name@example.com"
				/>
			</FormGroup>
			<FormGroup>
				<Input type="text" required value={code} onChange={handleCodeChange} />
			</FormGroup>
			<FormGroup>
				<Label for="step1-password">Password</Label>
				<Input
					id="step1-password"
					type="password"
					name="password"
					onChange={handlePasswordChange}
					required
					valid={validPassword()}
					invalid={invalidPassword()}
					value={passwords.password}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="step1-confirm-password">Confirm password</Label>
				<Input
					id="step1-confirm-password"
					type="password"
					name="confirmPassword"
					onChange={handlePasswordChange}
					required
					value={passwords.confirmPassword}
					invalid={invalidPassword() || (passwordChanged && passwords.password !== passwords.confirmPassword)}
					valid={validPassword() && passwords.confirmPassword === passwords.password}
				/>
			</FormGroup>
			<Button type="submit">Submit</Button>
		</Form>
	}

	return (
		<AuthUI header="Forgotten password change"
			alert={alert}
			toggleAlert={hideAlert}>
			{step === 0 ? renderStep0() : renderStep1()}
		</AuthUI>
	)

}

ForgotPasswordForm.propTypes = {
	initialAlert: PropTypes.shape({
		type: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
	}),
	location: PropTypes.object,
	history: PropTypes.object
}


ForgotPasswordForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default ForgotPasswordForm;
