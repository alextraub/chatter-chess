import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AccountButton from './auth/AccountButton';
import { Container, Spinner } from 'reactstrap';
import AuthType from '../types/AuthType';
import { AuthContext } from './auth/AuthProvider';

const Page = ({ children, noAccountButton, authType, centered, location, history }) => {
	const [loading, isLoading] = useState(true);
	const auth = useContext(AuthContext);

	useEffect(() => {
		isLoading(auth.loading)
	}, [auth.loading]);


	const renderAccountButton = () => {
		return !noAccountButton ?
			<AccountButton authType={authType} location={location} history={history} /> : '';
	}

	return !loading ? (
		<>
			{renderAccountButton()}
			<Container className={`justify-content-center ${centered ? 'd-flex h-100 ' : ''}`}>
				{centered ?
					<div className="w-75 mb-auto">{children}</div> :
					<>{children}</>}
			</Container>
		</>
	) : (
		<Container className="justify-content-center d-flex h-100">
			<div className="my-auto">
				<Spinner />
			</div> :
		</Container>
	);
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
