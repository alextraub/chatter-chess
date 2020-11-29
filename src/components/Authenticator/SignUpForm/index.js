import React, { useState, useEffect } from 'react';
import { Form, Input, FormGroup, Label, Button, Row, Col, CardText } from 'reactstrap';
import { Auth } from 'aws-amplify';
import FederatedSignInButtons from '../FederatedSignInButtons';
import AuthUI from '../AuthUI';
import { Link, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import linkTo from '../../../utils/linkTo';
import redirect from '../../../utils/redirect';

const SignUpForm = ({ initialAlert, user }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const shouldRedirect = () => user.data !== null;
		const fallback = location.state === undefined ||
			location.state.from === undefined || location.state.from === location.pathname;
		const rPath = fallback ? '/' : location.state.from;

		if(!redirect(rPath, location, history, {}, shouldRedirect)) {
			if(location.state && location.state.alert !== undefined) {
				setAlert(location.state.alert);
			}
		}
	}, [location, history, user.data]);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [alert, setAlert] = useState({ ...initialAlert })

	const hideAlert = () => {
		setAlert({
			...alert,
			content: ''
		});
	}

	const setError = newContent => {
		setAlert({
			...alert,
			type: 'danger',
			content: newContent
		});
	}

	function handleChange(e) {
		if(e.target.name === 'password' && !passwordChanged) {
			setPasswordChanged(true);
		}
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	}

	const validPassword = () => {
		const { password } = formData;

		return password.length >= 8 &&
			password.match(/[a-z]/) !== null && password.match(/[A-Z]/) !== null;
	}

	const invalidPassword = () => {
		return passwordChanged && !validPassword();
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if(!validPassword()) {
			if(formData.password.length < 8) {
				setError('Password must be at least 8 charcters');
			} else {
				setError('Password must contain both upper and lower case letters');
			}
		} else if(formData.password !== formData.confirmPassword) {
			setError('Make sure your passwords match')
		} else {
			try {
				await Auth.signUp({
					username: formData.email,
					password: formData.password,
					userAttributes: {
						email: formData.email
					}
				}).then(() => {
					redirect('/signin', location, history, {
						alert: {
							type: 'success',
							content: 'Signed up successfully. Check your email for a verifcation link.'
						}
					});
				}, data => setError(data.message))
					.catch(err => console.log(err));
			} catch (error) {
				console.log(error);
			}
		}
	}

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
				<Button>Sign up</Button>
				<Link to={linkTo("/resend-verification", location)}>Resend verification email</Link>
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
					<FederatedSignInButtons user={user} className="my-1" setAlert={setAlert} round />
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
	user: PropTypes.shape({
		loading: PropTypes.bool,
		data: PropTypes.object
	}).isRequired
}

SignUpForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default SignUpForm;
