import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const SignInAndOutButton = ({ user: { loading, data } }) => {
	const [isLoading, setLoading] = useState(true); // Signals a change of the currently authenticated user

	useEffect(() => {
		setLoading(loading);
	}, [loading]);

	if(isLoading) {
		return (
			<Button disabled type="button" color="primary">
				<Spinner size="sm" />
			</Button>
		)
	} else {
		return data ?
			<Button type="button" color="primary" onClick={() => {
				setLoading(true);
				Auth.signOut();
			}}>Sign out</Button> :
			<Button color="primary" onClick={() => {
				setLoading(true);
				Auth.federatedSignIn();
			}}>Sign in</Button>
	}
}

SignInAndOutButton.propTypes = {
	user: PropTypes.shape({
		loading: PropTypes.bool, // An API call is in progress when true
		data: PropTypes.any // Data payload from the authenticated user, or null if there isn't one
	})
}

export default SignInAndOutButton;
