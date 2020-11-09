import Piece from './Piece';

/**
This class provides a way to call methods and the constructor from Piece without getting an error, and using the Piece class' implementation
*/
export default class DPiece extends Piece {
	canMove([fromRow, fromCol], [toRow, toCol], mode=0) {
		return super.canMove([fromRow, fromCol], [toRow, toCol], mode);
	}
}
