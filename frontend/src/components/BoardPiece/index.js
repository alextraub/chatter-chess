import './BoardPiece.css';

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

	const typeMap = {
		'pawn': 'p',
		'rook': 'R',
		'knight': 'Kn',
		'bishop': 'B',
		'king': 'K',
		'Queen': 'Q',
		'generic': 'error'
	}

	return (
		<span data-testid="board-piece" className={classes}>{typeMap[pieceType]}</span>
	);
}

BoardPiece.propTypes = {
	piece: PropTypes.instanceOf(Piece)
};

export default BoardPiece;
