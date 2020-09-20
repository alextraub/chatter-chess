import React from "react";
import PropTypes from "prop-types";

/**
 * A single square on a chess board
 * @param {*} props
 */
const BoardSquare = props => {
	const { black, piece } = props;

	const squareColor = black ? 'black' : 'white';
	const pieceClassName = piece ?
		`piece ${piece.type} ${piece.black ? 'black' : 'white'}`
		: '';

	return (
		<div className={`square ${squareColor}`}>
			<span className={pieceClassName}>{}</span>
		</div>
	);
}

BoardSquare.propTypes = {
	black: PropTypes.bool,
	piece: PropTypes.oneOfType([
		PropTypes.undefined,
		PropTypes.shape({
			type: PropTypes.oneOf('p', 'r', 'b', 'kn', 'ki', 'q', ''),
			black: PropTypes.bool
		})
	])
}

BoardSquare.defaultProps = {
	black: false,
	piece: undefined
}

export default BoardSquare;
