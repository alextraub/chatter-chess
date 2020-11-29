import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Auth } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faAmazon } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import redirect from '../../../utils/redirect';

const FederatedSignInButtons = ({ setAlert=() => {}, size='md', iconSize='2x', round, className='', user }) => {
	const location = useLocation();
	const history = useHistory();

	const providers = [
		{
			name: 'facebook',
			provider: 'Facebook',
			icon: faFacebookF
		},
		{
			name: 'google',
			provider: 'Google',
			icon: faGoogle
		},
		{
			name: 'amazon',
			provider: 'LoginWithAmazon',
			icon: faAmazon
		}
	]

	const setError = content => {
		setAlert({
			type: 'danger',
			content
		})
	}

	return (
		<ListGroup horizontal className={className}>
			{providers.map(({ name, icon, provider }) => (
				<ListGroupItem style={{border: 'none', background: 'none'}} key={name}>
					<Button size={size} onClick={async () => {
						if(user.loading) {
							return;
						} else if(user.data !== null) {
							setError('You are already signed in');
						} else {
							try {
								await Auth.federatedSignIn({ provider })
									.then(creds => {
										const rConditon = () => !!creds;
										const rPath = location.state === undefined || location.state.from === undefined || location.state.from === location.pathname ?
											'/' : location.state.from;

										redirect(rPath, location, history, {}, rConditon);
									});
							} catch (error) {
								setError('Something went wrong whwile trying to authenticat you. Please try again later.');
							}
						}
					}}
					className={`${round ? 'btn-circle' : ''} social ${name}`.trim()}>
						<FontAwesomeIcon size={iconSize} icon={icon} />
					</Button>
				</ListGroupItem>
			))}
		</ListGroup>
	)
}

FederatedSignInButtons.propTypes = {
	size: PropTypes.string,
	iconSize: PropTypes.string,
	round: PropTypes.bool,
	className: PropTypes.string,
	setAlert: PropTypes.func,
	user: PropTypes.shape({
		data: PropTypes.object,
		loading: PropTypes.bool
	}).isRequired
}

export default FederatedSignInButtons;
