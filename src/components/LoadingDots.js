import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const LoadingDots = ({ hidden, color }) => {

	if(hidden) {
		return '';
	} else {
		return (
			<span className="d-inline-flex align-self-center">
				<Spinner color={color} style={{width: '0.5rem', height: '0.5rem'}} type="grow" className="mx-sm-1" />
				<Spinner color={color} style={{width: '0.5rem', height: '0.5rem'}} type="grow" className="mr-sm-1" />
				<Spinner color={color} style={{width: '0.5rem', height: '0.5rem'}} type="grow" />
			</span>
		);
	}
}

LoadingDots.propTypes = {
	hidden: PropTypes.bool,
	color: PropTypes.string
};

LoadingDots.defaultProps = {
	hidden: true,
	color: 'primary'
};

export default LoadingDots;
