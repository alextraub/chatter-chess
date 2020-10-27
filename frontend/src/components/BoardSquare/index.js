import './BoardSquare.css';
import React from "react";
import PropTypes from "prop-types";
import ChessPiece from '../ChessPiece';
import Piece, { pieceName } from '../../game/Piece';

/**
 *
 * A single square on a chess board.
 *
 * @param {{black: boolean; piece:null|Piece}} props
 * the piece located on the square, or undefined if there isn't any
 */
const BoardSquare = ({ black, piece, position }) => {

	const squareColor = black ? 'black' : 'white';

	const renderPiece = () => {
		if(piece === null) {
			return '';
		} else {
			return <ChessPiece black={piece.isBlack()}  type={pieceName(piece)}/>
		}
	}

	const renderPositionLabel = () => {
		if(position) {
			return <span data-testid="position-label" className="label-position">{position}</span>
		} else {
			return '';
		}
	}

	return (
		<div data-testid="board-square" className={`square ${squareColor}`}>
			{renderPositionLabel()}
			<div data-testid="piece-container" className="piece-container">
				{renderPiece()}
			</div>
		</div>
	);
}

BoardSquare.propTypes = {
	black: PropTypes.bool,
	piece: PropTypes.instanceOf(Piece),
	position: PropTypes.string
};

BoardSquare.defaultProps = {
	piece: null
};

export default BoardSquare;
