import React from "react";
import PropTypes from "prop-types";

/**
 * A single square on a chess board
 * @param {*} props
 */
const BoardSquare = props => {
	const { black, piece } = props;

	return (
		<div className={black ? "black" : "white"}>
			<span>{piece}</span>
		</div>
	);
}

BoardSquare.propTypes = {
	black: PropTypes.bool,
	piece: PropTypes.oneOf('p', 'r', 'b', 'kn', 'ki', 'q', '')
}

BoardSquare.defaultProps = {
	black: false,
	piece: ''
}

export default BoardSquare;
