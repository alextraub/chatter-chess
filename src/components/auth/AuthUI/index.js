import React, { useEffect } from 'react';
import { Alert, Card, CardHeader, CardBody, CardFooter, CardText } from 'reactstrap';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

const AuthUI = ({ header, children, footer, alert, toggleAlert }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		if(location.state !== undefined && location.state.alert !== undefined) {
			history.replace(location.pathname, {
				...location.state,
				alert: undefined
			})
		}
	}, [location, history]);

	const renderFooter = () => footer ?
		<CardFooter>{footer}</CardFooter> : '';

	return (
		<Card color="light h-50">
			<CardHeader>
				{typeof(header) === 'string' ?
					<CardText>{header}</CardText> : header}
			</CardHeader>
			<CardBody className="pb-5 pt-2">
				<Alert
					color={alert.type}
					isOpen={alert.content !== ''}
					toggle={() => toggleAlert()}
				>
					{alert.content}
				</Alert>
				{children}
			</CardBody>
			{renderFooter()}
		</Card>
	)
}

AuthUI.propTypes = {
	alert: PropTypes.shape({
		type: PropTypes.string,
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
	}),
	toggleAlert: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
	footer: PropTypes.element,
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

AuthUI.defaultProps = {
	alert: {
		type: 'danger',
		content: ''
	},
	header: 'Authentication'
}

export default AuthUI;
