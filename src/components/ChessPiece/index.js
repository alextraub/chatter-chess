import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChessPawn,
	faChessRook,
	faChessKnight,
	faChessBishop,
	faChessQueen,
	faChessKing,
	faSquare
} from '@fortawesome/free-solid-svg-icons';



const ChessPiece = ({ black, type, size, quantity, className, offsetX }) => {
	const color1 = black ? 'black' : '#eee';
	const color2 = black ? '#aaa	' : '#aaa';


	const chessIcon = type => {
		switch(type) {
		case 'pawn': return faChessPawn;
		case 'rook': return faChessRook;
		case 'knight': return faChessKnight;
		case 'bishop': return faChessBishop;
		case 'queen': return faChessQueen;
		case 'king': return faChessKing;
		default: return faSquare;
		}
	}

	const grow = type === 'king' || type === 'queen' ? 4 : 6;
	const offsetH = offsetX === 0 ? '' :
		offsetX < 0 ? `left-${offsetX}` : `right-${offsetX}`

	let piece = <>
		<FontAwesomeIcon transform={`grow-${grow} ${offsetH} up-1`} size={size} icon={chessIcon(type)} color={color2} />
		<FontAwesomeIcon transform={`grow-3 ${offsetH}`} size={size} icon={chessIcon(type)} color={color1} />
	</>

	if(quantity !== 0) {
		piece = <>
			{piece}
			<span className="text-container mx-3 mt-0 mb-3 fa-layers-counter fa-layers-bottom-right fa-3x">{quantity}</span>
		</>
	}

	return <span data-label={`${black ? 'black' : 'white'} ${type}`} data-testid="chess-piece" className={`fa-layers fa-fw ${className}`.trim()} aria-label={`${black ? 'black' : 'white'} ${type}`}>
		{piece}
	</span>
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
	]).isRequired,
	quantity: PropTypes.number,
	className: PropTypes.string,
	offsetX: PropTypes.oneOf([-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]),
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
ChessPiece.defaultProps = {
	black: false,
	quantity: 0,
	size: '1x',
	className: '',
	offsetX: 0
}

export default ChessPiece;
