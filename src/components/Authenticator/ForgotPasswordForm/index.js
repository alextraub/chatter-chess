import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, InputGroup, Button } from 'reactstrap';
import { Auth } from 'aws-amplify';
import AuthUI from '../AuthUI';
import PropTypes from 'prop-types';
import { useLocation, useHistory, Link } from 'react-router-dom';
import redirect from '../../../utils/redirect';
import linkTo from '../../../utils/linkTo';

const ForgotPasswordForm = ({ initialAlert }) => {
	const location = useLocation();
	const history = useHistory();

	const [step, setStep] = useState(0);
	const [email, setEmail] = useState('');
	const [alert, setAlert] = useState({
		...initialAlert
	});
	const [code, setCode] = useState('');
	const [passwords, setPasswords] = useState({
		password: '',
		confirmPassword: ''
	});

	const [passwordChanged, setPasswordChanged] = useState(false);

	const setError = content => {
		setAlert({
			type: 'danger',
			content
		})
	}

	const validPassword = () => {
		const { password } = passwords;

		return password.length >= 8 &&
			password.match(/[a-z]/) !== null && password.match(/[A-Z]/) !== null;
	}

	const invalidPassword = () => {
		return passwordChanged && !validPassword();
	}

	function handlePasswordChange(e) {
		if(e.target.name === 'password' && !passwordChanged) {
			setPasswordChanged(true);
		}
		setPasswords({
			...passwords,
			[e.target.name]: e.target.value
		});
	}

	const hideAlert = () => {
		setAlert({
			...alert,
			content: ''
		});
	}

	const showSuccessAlert = () => {
		redirect('/signin', location, history, {
			alert: {
				type: 'success',
				content: 'Password successfully changed'
			}
		});
	}

	const handleSubmit = async e => {
		e.preventDefault();

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
								Oh no! Something went wrong!&nbsp;<Link to={linkTo('/resend-verification', location)}>Resend verification link</Link>
								</>
							})
						}
					});
			} catch {
				//
			}
		} else if(step === 1) {
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
				try {
					await Auth.forgotPasswordSubmit(email, code, passwords.password)
						.then(() => {
							showSuccessAlert();
						}, () => {
							setError('Oh no! Something went wrong!');
						});
				} catch {
					//
				}
			}

		}
	}

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

	const handleCodeChange = e => {
		if(e.target.value.length === 0 || e.target.value.charAt(e.target.value.length - 1).match(/[0-9]/)) {
			setCode(e.target.value);
		}
	}

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
	})
}


ForgotPasswordForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default ForgotPasswordForm;
