import React, { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { Button, ButtonGroup, Spinner, Tooltip } from 'reactstrap';
import { AuthContext } from '../AuthProvider';
import PropTypes from 'prop-types';
import AuthType from '../../../types/AuthType';

const AccountButton = ({ authType, location, history }) => {
	const auth = useContext(AuthContext);

	const [signingOut, isSigningOut] = useState(false); // Signals a change of the currently authenticated user


	useEffect(() => {
		if(signingOut && !auth.authenticated) {
			isSigningOut(false);
		}

		if(!auth.authenticated && authType === AuthType.AUTH_ONLY) {
			history.push('/signin', {
				from: location.pathname
			})
		}
	}, [signingOut, auth, authType, location.pathname, history]);

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

	const id = "Tooltip-logged-in-user"

	const renderModalToggle = () => {
		if(signingOut) {
			return (
				<Button disabled type="button" color="primary" id={id}>
					<Spinner size="sm" />
				</Button>
			)
		} else {
			return auth.authenticated ?
				<>
					<Button id={id} type="button" color="primary" onClick={() => {
						isSigningOut(true);
						Auth.signOut();
					}}>Sign out</Button>
					<Tooltip
						isOpen={tooltipOpen}
						toggle={toggleTooltip}
						target={id}
					>
						{auth.user.attributes.email}
					</Tooltip>
				</> :
				<ButtonGroup>
					<Button color="primary" onClick={() => {
						history.push('/signin', {
							from: location.pathname
						});
					}}>Sign in</Button>
					<Button color="light" outline onClick={() => {
						history.push('/signup', {
							from: location.pathname
						});
					}}>Register</Button>
				</ButtonGroup>
		}
	}

	return (
		<>
			{renderModalToggle()}
		</>
	)
}

AccountButton.propTypes = {
	authType: PropTypes.oneOf(Object.entries(AuthType).map(([_, v]) => v)),
	location: PropTypes.object,
	history: PropTypes.object
}

export default AccountButton;
