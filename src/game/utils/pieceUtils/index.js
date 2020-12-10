import { Pawn, Rook, Knight, Bishop, Queen, King, DPiece } from '../../Piece';

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

const canSwapIn = type => {
	return createPiece(type).canSwapIn;
}

const canSwapOut = type => {
	return createPiece(type).canSwapIn;
}

export {
	createPiece,
	canSwapIn,
	canSwapOut
};
