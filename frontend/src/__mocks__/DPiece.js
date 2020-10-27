import Piece from '../game/Piece/Piece';

/**
This class provides a way to call methods and the constructor from Piece without getting an error, and using the Piece class' implementation
*/
export default class DPiece extends Piece {
	canMove([fromRow, fromCol], [toRow, toCol]) {
		return super.canMove([fromRow, fromCol], [toRow, toCol]);
	}
}
