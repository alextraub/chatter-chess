import React from 'react';
import PropTypes from 'prop-types';

import Piece, { pieceName } from '../../game/Piece';

/**
 *
 * @param {{piece: Piece}} props
 * type is the full lowercase name of the type of chess piece (i.e., rook, bishop, etc)
 */
const BoardPiece = ({ piece }) => {
	const color = piece.isBlack() ? 'black' : 'white';
	const pieceType = pieceName(piece);
	const classes = `piece ${color} ${pieceType}`;

	return (
		<span data-testid="board-piece" className={classes} />
	);
}

BoardPiece.propTypes = {
	piece: PropTypes.instanceOf(Piece)
};

export default BoardPiece;
