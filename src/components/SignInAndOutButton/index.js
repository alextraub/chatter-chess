import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Button, Spinner, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const SignInAndOutButton = ({ user: { loading, data } }) => {
	const [isLoading, setLoading] = useState(true); // Signals a change of the currently authenticated user

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

	useEffect(() => {
		setLoading(loading);
	}, [loading]);

	const id = "Tooltip-logged-in-user"

	const renderModalToggle = () => {
		if(isLoading) {
			return (
				<Button disabled type="button" color="primary" id={id}>
					<Spinner size="sm" />
				</Button>
			)
		} else {
			return data ?
				<>
					<Button id={id} type="button" color="primary" onClick={() => {
						setLoading(true);
						Auth.signOut();
					}}>Sign out</Button>
					<Tooltip
						isOpen={tooltipOpen}
						toggle={toggleTooltip}
						target={id}
					>
						{data.attributes.email}
					</Tooltip>
				</> :
				<Button color="primary" onClick={async () => {
					setLoading(true);
					try {
						await Auth.federatedSignIn();
					} catch (err) {
						console.log(err);
					} finally {
						setLoading(false)
					}
				}}>Sign in</Button>
		}
	}

	return (
		<>
			{renderModalToggle()}
		</>
	)
}

SignInAndOutButton.propTypes = {
	user: PropTypes.shape({
		loading: PropTypes.bool, // An API call is in progress when true
		data: PropTypes.any // Data payload from the authenticated user, or null if there isn't one
	})
}

export default SignInAndOutButton;
