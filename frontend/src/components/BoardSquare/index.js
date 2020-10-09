import './BoardSquare.css';
import React from "react";
import PropTypes from "prop-types";
import BoardPiece from '../BoardPiece';
import Piece from '../../game/Piece';

/**
 *
 * A single square on a chess board.
 *
 * @param {{black: boolean; piece:null|Piece}} props
 * the piece located on the square, or undefined if there isn't any
 */
const BoardSquare = ({ black, piece }) => {

	const squareColor = black ? 'black' : 'white';

	const renderPiece = () => {
		if(piece === null) {
			return '';
		} else {
			return <BoardPiece piece={piece} />
		}
	}

	return (
		<div data-testid="board-square" className={`square ${squareColor}`}>
			{renderPiece()}
		</div>
	);
}

BoardSquare.propTypes = {
	black: PropTypes.bool,
	piece: PropTypes.instanceOf(Piece)
};

BoardSquare.defaultProps = {
	piece: null
};

export default BoardSquare;