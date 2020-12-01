import React from 'react';
import PropTypes from 'prop-types';
import AccountButton from './auth/AccountButton';
import { Container } from 'reactstrap';
import AuthType from '../types/AuthType';

const Page = ({ children, noAccountButton, authType, centered, location, history }) => {

	const renderAccountButton = () => {
		return !noAccountButton ?
			<AccountButton authType={authType} location={location} history={history} /> : '';
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
	authType: PropTypes.oneOf(Object.entries(AuthType).map(([_, v]) => v)),
	noAccountButton: PropTypes.bool,
	centered: PropTypes.bool,
	children: PropTypes.element,
	location: PropTypes.object,
	history: PropTypes.object
}

export default Page;
