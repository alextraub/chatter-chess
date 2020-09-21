import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} props - { black: bool, type: string } where black denotes if the piece is a black piece and
 * type is the full lowercase name of the type of chess piece (i.e., rook, bishop, etc)
 */
const BoardPiece = ({ black, type }) => {
	const classes = `${black ? 'black' : 'white'} piece ${type}`;

	return (
		<span data-testid="board-piece" className={classes} />
	);
}

BoardPiece.propTypes = {
	black: PropTypes.bool,
	type: PropTypes.oneOf([
		'pawn',
		'rook',
		'bishop',
		'knight',
		'king',
		'queen'
	]).isRequired
};


export default BoardPiece;
