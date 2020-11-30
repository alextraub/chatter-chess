import React, { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { Button, Spinner, Tooltip } from 'reactstrap';
import { AuthContext } from '../AuthProvider';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


const AccountButton = ({requireSignIn}) => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const location = useLocation();

	const [signingOut, isSigningOut] = useState(false); // Signals a change of the currently authenticated user


	useEffect(() => {
		if(signingOut && !auth.authenticated) {
			isSigningOut(false);
		}

		if(!auth.authenticated && requireSignIn) {
			history.push('/signin', {
				from: location.pathname
			})
		}
	}, [signingOut, auth.authenticated, requireSignIn, location.pathname, history]);

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
				<Button color="primary" onClick={() => {
					history.push('/signin', {
						from: location.pathname
					});
				}}>Sign in</Button>
		}
	}

	return (
		<>
			{renderModalToggle()}
		</>
	)
}

AccountButton.propTypes = {
	requireSignIn: PropTypes.bool
}

export default AccountButton;
