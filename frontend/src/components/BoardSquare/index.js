import React from "react";
import PropTypes from "prop-types";
import './BoardSquare.css';
import BoardPiece from '../BoardPiece';

/**
 *
 * A single square on a chess board.
 *
 * @param {*} props { black: bool, piece: object } where black denotes if the square is black and piece has information about
 * the piece located on the square, or undefined if there isn't any
 */
const BoardSquare = ({ black, piece }) => {

	const squareColor = black ? 'black' : 'white';

	const renderPiece = () => {
		if(piece === undefined) {
			return '';
		} else {
			const { type, black } = piece;
			return <BoardPiece type={type} black={black}/>
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
	piece: PropTypes.shape({
		black: PropTypes.bool,
		type: PropTypes.string.isRequired
	})
}

export default BoardSquare;
