import React, { useState, useEffect } from 'react';
import { Form, Input, InputGroup, Button } from 'reactstrap';
import { Auth } from 'aws-amplify';
import AuthUI from '../AuthUI';
import PropTypes from 'prop-types';
import redirect from '../../../utils/redirect';

const VerifyForm = ({ initialAlert, location, history }) => {
	const [email, setEmail] = useState('');
	const [step, setStep] = useState(0);
	const [code, setCode] = useState('');
	const [alert, setAlert] = useState({
		...initialAlert
	});

	useEffect(() => {
		if(location.state !== undefined && location.state.email !== undefined) {
			setStep(1);
			setEmail(location.state.email);
		}
	}, [location.state]);

	/* Helper function to hide any currently displayed alert */
	const hideAlert = () => {
		setAlert({
			...alert,
			content: ''
		});
	}

	/* Helper function that will redirect to the signin page that will also display an alert informing user that an email was sent */
	const showSuccessAlert = () => {
		redirect('/signin', location, history, {
			alert: {
				type: 'success',
				content: 'Account has been verified'
			}
		})
	}

	const handleCodeChange = e => {
		if(e.target.value.length === 0 || e.target.value.charAt(e.target.value.length - 1).match(/[0-9]/)) {
			setCode(e.target.value);
		}
	}

	const handleSubmit = async e => {
		e.preventDefault();

		if(step === 0) {
			try {
				await Auth.resendSignUp(email)
					.then(data => {
						showSuccessAlert();
					})
					.catch(err => {
						if(err.code === 'UserNotFoundException') {
							setStep(1);
						} else {
							setAlert({ type: 'danger', content: 'There was a problem sending the verification email' });
						}
					});
				setEmail('');
			} catch {
				//
			}
		} else {
			try {
				await Auth.confirmSignUp(email, code)
					.then(() => {
						showSuccessAlert();
					})
					.catch(() => {
						setAlert({
							type: 'danger',
							content: 'Invalid code'
						});
					})
			} catch {
				//
			}
		}
	}

	const renderstep0 = () => (
		<Form inline onSubmit={handleSubmit}>
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
	);

	const renderstep1 = () => (
		<Form inline onSubmit={handleSubmit}>
			<InputGroup>
				<Input
					type="text"
					value={code}
					onChange={handleCodeChange}
					required
					placeholder="Enter code"
				/>
				<Button type="submit">Submit</Button>
			</InputGroup>
		</Form>
	);

	return (
		<AuthUI header="Resend verification email"
			alert={alert}
			toggleAlert={hideAlert}>
			{step === 0 ? renderstep0() : renderstep1()}
		</AuthUI>
	)

}

VerifyForm.propTypes = {
	initialAlert: PropTypes.shape({
		type: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
	}),
	location: PropTypes.object,
	history: PropTypes.object
}


VerifyForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default VerifyForm;
