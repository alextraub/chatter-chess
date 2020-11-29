import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SignInAndOutButton from './SignInAndOutButton';
import { Container } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import redirect from '../utils/redirect';

const Page = ({ children, hasAccountButton, centered, requireSignIn, user }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const rCondtion = () => requireSignIn && !user.loading && user.data === null;
		redirect('/signin', location, history, {}, rCondtion);
	});

	const renderAccountButton = () => {
		return hasAccountButton ?
			<SignInAndOutButton user={user} /> : '';
	}

	return (
		<>
			{renderAccountButton()}
			<Container className={`justify-content-center ${centered ? 'd-flex h-100 ' : ''}`}>
				{centered ?
					<div className="my-auto">{children}</div> :
					<>{children}</>}
			</Container>
		</>
	)
}

Page.propTypes = {
	hasAccountButton: PropTypes.bool,
	centered: PropTypes.bool,
	user: PropTypes.shape({
		loading: PropTypes.bool,
		data: PropTypes.object
	}).isRequired,
	children: PropTypes.element,
	requireSignIn: PropTypes.bool
}

export default Page;
