import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Form, Input, CardText, FormGroup, Label, Button } from 'reactstrap';
import { Auth } from 'aws-amplify';
import AuthUI from '../AuthUI';
import FederatedSignInButtons from '../FederatedSignInButtons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import linkTo from '../../../utils/linkTo';
import redirect from '../../../utils/redirect';

const SignInForm = ({ initialAlert, user }) => {
	const location = useLocation();
	const history = useHistory();
	const [alert, setAlert] = useState({ ...initialAlert });

	const handleLogin = useCallback(() => {
		// Redirect condtion
		const shouldRedirect = () => user.data !== null;

		// Return if a redirect took place
		return redirect('/', location, history, {}, shouldRedirect);
	}, [location, history, user.data]);

	useEffect(() => {
		// Redirect users that are already signed in
		if(!handleLogin()) {
			if(location.state && location.state.alert !== undefined) {
				setAlert(location.state.alert);
			}
		}
	}, [location, history, user.data, handleLogin]);

	// State for the form input fields
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	/* Handler for onChange event for email and password fields, based on their input name attribute */
	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	/* Helper function to hide any currently displayed alert */
	const hideAlert = () => {
		setAlert({
			...alert,
			content: ''
		});
	}

	/* Helper function to display an error alert using danger theme colors */
	const setError = newContent => {
		setAlert({
			...alert,
			type: 'danger',
			content: newContent
		});
	}

	const handleSubmit = async e => {
		e.preventDefault();

		await Auth.signIn(formData.email, formData.password)
			.then(creds => {
				if(creds) { // Successfully got credentials from the API response
					handleLogin();
				}
			}, data => { // Failed to sign in
				console.log(data);
				if(!user.loading) { // Don't display an error until loading is finished
					setError(<>
						Email or password is invalid.&nbsp;<Link to={linkTo('/resend-verification', location)}>Resend verification link</Link>
					</>)
				}
			});
	}

	/* Renders out the form portion of the component */
	const renderForm = () => (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label for="signin-email">Email</Label>
				<Input
					id="signin-email"
					type="email"
					value={formData.email}
					required
					name="email"
					onChange={handleChange}
					placeholder="name@example.com" />
			</FormGroup>
			<FormGroup>
				<Label for="signin-password">Password</Label>
				<Input
					id="signin-password"
					type="password"
					name="password"
					value={formData.password}
					required
					placeholder="Password"
					onChange={handleChange} />
			</FormGroup>
			<Button type="submit" className="m-lg-2">Login</Button>
			<br className="d-lg-none" />
			<Link to={linkTo("/forgot-password", location)}>Reset password</Link>
		</Form>
	)

	return (
		<AuthUI header="Sign in"
			footer={
				<>Already have an account? <Link to={linkTo("/signup", location)}>Sign up</Link></>
			}
			alert={alert}
			toggleAlert={hideAlert}
		>
			<Row>
				<Col>{renderForm()}</Col>
				<Col>
					<CardText>Sign in using a different method</CardText>
					<FederatedSignInButtons user={user} className="my-1" setAlert={setAlert} round />
				</Col>
			</Row>
		</AuthUI>
	)
}

SignInForm.propTypes = {
	initialAlert: PropTypes.shape({
		type: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
	}),
	user: PropTypes.shape({
		loading: PropTypes.bool,
		data: PropTypes.object
	}).isRequired
}

SignInForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default SignInForm;
