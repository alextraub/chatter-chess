import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'reactstrap';

const LoadingButton = ({ buttonProps, loading, spinnerProps, children }) => {

	return (
		<Button props={{ disabled:loading, ...buttonProps }}>
			{loading ?
				<Spinner props={{...spinnerProps}} /> : children}
		</Button>
	);
}

LoadingButton.propTypes = {
	loading: PropTypes.bool,
	buttonProps: PropTypes.object,
	spinnerProps: PropTypes.object,
	children: PropTypes.node
}

LoadingButton.defaultProps = {
	buttonProps: {},
	spinnerProps: {}
}

export default LoadingButton;
