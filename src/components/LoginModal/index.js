import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Auth } from 'aws-amplify';
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';

import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';


const LoginModal = ({ isOpen, loading }) => {
	const [showSignin, setShowSignin] = useState(true);

	const toggle = () => {
		setShowSignin(!showSignin);
	}

	const displaySignin = () => (
		<>
			<LoginForm />
			<Button
				className="text-info btn-text-only"
			>
				Forgot password
			</Button>
			|
			<Button
				className="text-info btn-text-only"
				onClick={() => toggle()}>
				Signup
			</Button>
		</>
	);

	const displaySignup = () => (
		<>
			<SignupForm />
			<p>Already have an account? <Button
				color="transparent"
				onClick={() => toggle()}
				className="text-info btn-text-only">
					Signin
			</Button></p>
		</>
	)

	const socialLogins = [

		{
			name: 'google',
			provider: 'Google',
			icon: faGoogle
		},
		{
			name: 'facebook',
			provider: 'Facebook',
			icon: faFacebookF
		},
		{
			name: 'amazon',
			provider: 'LoginWithAmazon',
			icon: faAmazon
		}
	]

	return (
		<Modal size="xl" isOpen={isOpen} >
			<ModalHeader>
				{showSignin ? 'Sign in' : 'Sign up'}
			</ModalHeader>
			<ModalBody>
				<p>You are required to sign in to view this page.</p>
				<Row>
					<Col md="6">
						{showSignin ?
							displaySignin() : displaySignup()}
					</Col>
					<Col>
						{socialLogins.map(({ name, provider, icon }) =>
							<Button
								size="md"
								disabled={loading}
								className={`mx-1 btn-circle social ${name}`}
								onClick={async () => {
									try {
										await Auth.federatedSignIn({ provider });
									} catch (e) {
										console.log(e);
									}
								}}
								key={name}>
								<FontAwesomeIcon size="3x" icon={icon} />
							</Button>
						)}
					</Col>
				</Row>

			</ModalBody>
		</Modal>
	);
}

LoginModal.propTypes = {
	isOpen: PropTypes.bool,
	loading: PropTypes.bool
}

export default LoginModal;
