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

const createPiece = (type, boardState=null, player=0) => {
	switch(type) {
	case 'pawn': return new Pawn(boardState, player);
	case 'rook': return new Rook(boardState, player);
	case 'knight': return new Knight(boardState, player);
	case 'bishop': return new Bishop(boardState, player);
	case 'queen': return new Queen(boardState, player);
	case 'king': return new King(boardState, player);
	default: return new DPiece(boardState, player);
	}
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
