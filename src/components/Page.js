import React from 'react';
import PropTypes from 'prop-types';
import AccountButton from './auth/AccountButton';
import { Container } from 'reactstrap';

const Page = ({ children, noAccountButton, requireSignIn, centered }) => {

	const renderAccountButton = () => {
		return !noAccountButton ?
			<AccountButton requireSignIn={requireSignIn} /> : '';
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
	requireSignIn: PropTypes.bool,
	noAccountButton: PropTypes.bool,
	centered: PropTypes.bool,
	children: PropTypes.element
}

export default Page;
