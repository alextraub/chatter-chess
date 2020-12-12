import { Pawn, Rook, Knight, Bishop, Queen, King, DPiece } from '../../Piece';

const createPiece = pieceQueryObject => {
	if(!isPieceQueryObject(pieceQueryObject)) {
		throw new TypeError('createPiece must be an object in the format of a Piece\'s query object format');
	}
	let piece;
	const player = pieceQueryObject.player === 'WHITE' ? 0 : 1;
	switch(pieceQueryObject.type) {
	case 'PAWN': piece = new Pawn(null, player);
		break;
	case 'ROOK': piece = new Rook(null, player);
		break;
	case 'KNIGHT': piece = new Knight(null, player);
		break;
	case 'BISHOP': piece = new Bishop(null, player);
		break;
	case 'QUEEN': piece = new Queen(null, player);
		break;
	case 'KING': piece = new King(null, player);
		break;
	default: piece = new DPiece(null, player);
		break;
	}
	if(pieceQueryObject.captured) {
		piece.captured = true;
	}

	return piece;
}

const canSwapIn = type => {
	return createPiece({type, player: 'WHITE', captured: true, position: null}).canSwapIn;
}

const canSwapOut = type => {
	return createPiece({type, player: 'WHITE', captured: true, position: null}).canSwapIn;
}

const isPieceQueryObject = piece => {
	if(typeof(piece) !== 'object') {
		return false;
	}

	if(piece.player === undefined || piece.type === undefined || piece.captured === undefined || piece.position === undefined) {
		return false;
	}

	if(piece.player !== 'WHITE' && piece.player !== 'BLACK') {
		return false;
	}

	const types = ['PAWN', 'ROOK', 'KNIGHT', 'BISHOP', 'QUEEN', 'KING', 'GENERIC'];
	if(!types.some(t => piece.type === t)) {
		return false;
	}

	if(typeof(piece.captured) !== 'boolean') {
		return false;
	}

	if(piece.position === null) {
		return true;
	}

	if(typeof(piece.position) !== 'object' || piece.position.row === undefined || piece.position.col === undefined) {
		return false;
	}

	if(typeof(piece.position.row) !== 'number' || typeof(piece.position.col) !== 'number') {
		return false;
	}

	const { row, col } = piece.position;
	if(!Number.isInteger(row) || !Number.isInteger(col)) {
		return false;
	}

	return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export {
	createPiece,
	canSwapIn,
	canSwapOut,
	isPieceQueryObject
};
