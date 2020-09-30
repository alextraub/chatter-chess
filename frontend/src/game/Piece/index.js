/*
	Import any Piece class from this file (the default import is the Piece class itself)
*/

import Piece from './Piece';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import King from './King';
import Queen from './Queen';

export default Piece;

const pieceName = piece => {
	if(piece instanceof Piece) {
		if(piece instanceof Pawn)
			return 'pawn';
		if(piece instanceof Rook)
			return 'rook';
		if(piece instanceof Knight)
			return 'knight';
		if(piece instanceof Bishop)
			return 'bishop';
		if(piece instanceof King)
			return 'king';
		if(piece instanceof Queen)
			return 'queen';
	}

	return 'generic';
}

export {
	Pawn,
	Rook,
	Knight,
	Bishop,
	King,
	Queen,
	pieceName
};
