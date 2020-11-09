import './ChessPiece.css';

import React from 'react';
import PropTypes from 'prop-types';

import { whitePieceImages, blackPieceImages } from './pieceImages';

const ChessPiece = ({ black, type }) => {
	const color = black ? 'black' : 'white';
	const graphicsSet = !black ? whitePieceImages : blackPieceImages;
	return type === 'generic' ?
		<span data-testid="chess-piece" className={`piece ${color}`}>x</span> :
		<img data-testid="chess-piece" className={`piece ${color}`} src={graphicsSet[type]} alt={`${color} ${type}`} />
	;
}

ChessPiece.propTypes = {
	black: PropTypes.bool,
	type: PropTypes.oneOf([
		'rook',
		'knight',
		'bishop',
		'king',
		'queen',
		'pawn',
		'generic'
	]).isRequired
}
ChessPiece.defaultProps = {
	black: false
}

export default ChessPiece;
