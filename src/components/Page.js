import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountButton from './auth/AccountButton';
import { Container } from 'reactstrap';
import redirect from '../utils/redirect';

const Page = ({ children, hasAccountButton, centered, requireSignIn, user, location, history }) => {

	useEffect(() => {
		const rCondtion = () => requireSignIn && !user.loading && user.data === null;
		redirect('/signin', location, history, {}, rCondtion);
	});

	const renderAccountButton = () => {
		return hasAccountButton ?
			<AccountButton user={user} /> : '';
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
	requireSignIn: PropTypes.bool,
	history: PropTypes.object,
	location: PropTypes.object
}

export default Page;
