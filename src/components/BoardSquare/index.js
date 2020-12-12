import './BoardSquare.css';
import React from "react";
import PropTypes from "prop-types";
import ChessPiece from '../ChessPiece';

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
			return <>
				<ChessPiece className="d-flex d-sm-none" size="1x" black={piece.player === 'BLACK'}  type={piece.type} />
				<ChessPiece className="d-none d-sm-flex" size="2x" black={piece.player === 'BLACK'}  type={piece.type} />
			</>
		}
	}

	const renderPositionLabel = () => {
		if(position) {
			return <span className="bg-warning">{position}</span>;
		} else {
			return '';
		}
	}


	return (
		<div data-testid={`${position}`} className={`square ${squareColor}`}>
			<div data-testid="position-container" className="text-container align-text-top d-inline-flex justify-content-end position-container">{renderPositionLabel()}</div>
			<div data-testid="piece-container" className="h-100 flex-column d-inline-flex justify-content-center align-items-center">{renderPiece()}</div>
		</div>
	);
}

BoardSquare.propTypes = {
	black: PropTypes.bool,
	piece: PropTypes.shape({
		type: PropTypes.oneOf(['PAWN', 'ROOK', 'KNIGHT', 'BISHOP', 'QUEEN', 'KING', 'GENERIC']),
		player: PropTypes.oneOf(['WHITE', 'BLACK'])
	}),
	position: PropTypes.string
};

BoardSquare.defaultProps = {
	piece: null,
	position: 'board-square'
};

export default BoardSquare;
