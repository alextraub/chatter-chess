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
		const shouldRedirect = () => user.data !== null;
		// const fallback = location.state === undefined ||
		// 	location.state.from === undefined || location.state.from === location.pathname;
		// const rPath = fallback ? '/' : location.state.from;

		return redirect('/', location, history, {}, shouldRedirect);
	}, [location, history, user.data]);

	useEffect(() => {
		if(!handleLogin()) {
			if(location.state && location.state.alert !== undefined) {
				setAlert(location.state.alert);
			}
		}
	}, [location, history, user.data, handleLogin]);

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

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

	const handleSubmit = async e => {
		e.preventDefault();

		await Auth.signIn(formData.email, formData.password)
			.then(creds => {
				if(creds) {
					handleLogin();
				}
			}, data => {
				console.log(data);
				if(!user.loading) {
					setError(<>
						Email or password is invalid.&nbsp;<Link to={linkTo('/resend-verification', location)}>Resend verification link</Link>
					</>)
				}
			});
	}

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
			<Button type="submit">Login</Button>
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
