import React, { useState } from 'react';
import { Form, Input, InputGroup, Button } from 'reactstrap';
import { Auth } from 'aws-amplify';
import AuthUI from '../AuthUI';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import redirect from '../../../utils/redirect';

const ResendVerificationForm = ({ initialAlert }) => {
	const location = useLocation();
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [alert, setAlert] = useState({
		...initialAlert
	});

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
				content: 'Verification email sent'
			}
		});
	}

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await Auth.resendSignUp(email)
				.then(data => {
					showSuccessAlert();
				})
				.catch(err => {
					if(err.code === 'UserNotFoundException') {
						showSuccessAlert();
					} else {
						setAlert({ type: 'danger', content: 'There was a problem sending the verification email' });
					}
				});
			setEmail('');
		} catch {
			//
		}
	}


	return (
		<AuthUI header="Resend verification email"
			alert={alert}
			toggleAlert={hideAlert}>
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
		</AuthUI>
	)

}

ResendVerificationForm.propTypes = {
	initialAlert: PropTypes.shape({
		type: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
	})
}


ResendVerificationForm.defaultProps = {
	initialAlert: {
		type: 'danger',
		content: ''
	}
}

export default ResendVerificationForm;
