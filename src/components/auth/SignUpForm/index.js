import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, FormGroup, Label, Button, Row, Col, CardText } from 'reactstrap';
import { Auth } from 'aws-amplify';
import FederatedSignInButtons from '../FederatedSignInButtons';
import AuthUI from '../AuthUI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import linkTo from '../../../utils/linkTo';
import redirect from '../../../utils/redirect';
import { AuthContext } from '../AuthProvider';

const SignUpForm = ({ initialAlert, location, history }) => {
	const auth = useContext(AuthContext);

	useEffect(() => {
		// Redirect users that are already signed in
		const shouldRedirect = () => auth.authenticated;
		const fallback = location.state === undefined ||
			location.state.from === undefined || location.state.from === location.pathname;
		const rPath = fallback ? '/' : location.state.from;

		if(!redirect(rPath, location, history, {}, shouldRedirect)) { // If no redirect happened this render
			if(location.state && location.state.alert !== undefined) { // Remove any alerts in the route state that have already been shown
				setAlert(location.state.alert);
			}
		}
	}, [location, history, auth.authenticated]);

	// Keep track of all the form input data
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [passwordChanged, setPasswordChanged] = useState(false); // Detect the first time the password field has a change made
	const [alert, setAlert] = useState({ ...initialAlert }); // Load in the initailAlert and allow it to be updated depending on the formData

	/* Clears the alert content which will cause the component to hide the alert element */
	const hideAlert = () => {
		setAlert({
			...alert,
			content: ''
		});
	}

	/* Helper function that sets an alert and displays it with the danger theme colors */
	const setError = newContent => {
		setAlert({
			...alert,
			type: 'danger',
			content: newContent
		});
	}

	/* Fired anytime a change event is fired from one of the form input fields and updates the related attribute in the formData based on the input's name attribute */
	function handleChange(e) {
		// Handle first password input change
		if(e.target.name === 'password' && !passwordChanged) {
			setPasswordChanged(true);
		}

		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	/* IMPORTANT - this function may not reflect the serverside validation, it is only here to cut down on the number of API requests made during account signup */
	const validPassword = () => {
		const { password } = formData;

		return password.length >= 8 &&
			password.match(/[a-z]/) !== null && password.match(/[A-Z]/) !== null;
	}

	/* IMPORTANT - this function may not reflect the serverside validation, it is only here to cut down on the number of API requests made during account signup */
	const invalidPassword = () => {
		return passwordChanged && !validPassword();
	}

	async function handleSubmit(e) {
		e.preventDefault();
		// Client side error messages
		if(!validPassword()) {
			if(formData.password.length < 8) {
				setError('Password must be at least 8 charcters');
			} else {
				setError('Password must contain both upper and lower case letters');
			}
		} else if(formData.password !== formData.confirmPassword) {
			setError('Make sure your passwords match')
		} else {
			// Server side API request
			try {
				await Auth.signUp({
					username: formData.email,
					password: formData.password,
					userAttributes: {
						email: formData.email
					}
				}).then(() => {
					// On successful signup
					redirect('/verify', location, history, {
						alert: {
							type: 'success',
							content: 'Verification code sent'
						},
						email: formData.email
					});
				}, data => setError(data.message)) // Signup failure
					.catch(err => console.log(err)); // Signup threw an exception
			} catch (error) { // Catch all
				console.log(error);
			}
		}
	}

	/* Renders out the form portion of the signup component */
	const renderForm = () => {
		return (
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="signup-email">Email</Label>
					<Input
						id="signup-email"
						type="email"
						name="email"
						onChange={handleChange}
						required
						value={formData.email}
						placeholder="name@example.com"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="signup-password">Password</Label>
					<Input
						id="signup-password"
						type="password"
						name="password"
						onChange={handleChange}
						required
						valid={validPassword()}
						invalid={invalidPassword()}
						value={formData.password}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="signup-confirm-password">Confirm password</Label>
					<Input
						id="signup-confirm-password"
						type="password"
						name="confirmPassword"
						onChange={handleChange}
						required
						value={formData.confirmPassword}
						invalid={invalidPassword() || (passwordChanged && formData.password !== formData.confirmPassword)}
						valid={validPassword() && formData.confirmPassword === formData.password}
					/>
				</FormGroup>
				<Button className="m-lg-2">Sign up</Button>
				<br className="d-lg-none" />
				<Link to={linkTo("/verify", location)}>Resend email</Link>
			</Form>
		);
	}



	return  (
		<AuthUI header="Create an account"
			alert={alert}
			footer={
				<>Already have an account? <Link to={linkTo("/signin", location)}>Sign in</Link></>
			}
			toggleAlert={hideAlert}
		>
			<Row>
				<Col>
					{renderForm()}
				</Col>
				<Col>
					<CardText>Sign in using a different method</CardText>
					<FederatedSignInButtons className="my-1" setAlert={setAlert} round />
				</Col>
			</Row>
		</AuthUI>
	)

}

SignUpForm.propTypes = {
	initialAlert: PropTypes.shape({
		type: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
	}),
	location: PropTypes.object,
	history: PropTypes.object
}

SignUpForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default SignUpForm;
