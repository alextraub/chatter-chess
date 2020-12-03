/*
	Import any Piece class from this file (the default import is the Piece class itself)
*/

import Piece from './Piece';
import DPiece from './DPiece';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import King from './King';
import Queen from './Queen';

export default Piece;

const createPiece = (type, boardState=null, player=0, captured=false) => {
	let piece;
	switch(type.toLowerCase()) {
	case 'pawn': piece = new Pawn(boardState, player);
		break;
	case 'rook': piece = new Rook(boardState, player);
		break;
	case 'knight': piece = new Knight(boardState, player);
		break;
	case 'bishop': piece = new Bishop(boardState, player);
		break;
	case 'queen': piece = new Queen(boardState, player);
		break;
	case 'king': piece = new King(boardState, player);
		break;
	default: piece = new DPiece(boardState, player);
		break;
	}
	if(captured) {
		piece.captured = true;
	}

	return piece;
}

export {
	DPiece,
	Pawn,
	Rook,
	Knight,
	Bishop,
	King,
	Queen,
	createPiece
};
