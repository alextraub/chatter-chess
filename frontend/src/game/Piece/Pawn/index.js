import Piece from '../Piece';

export default class Pawn extends Piece {
	get type() {
		return 'pawn';
	}

	canMove([fromRow, fromCol], [toRow, toCol], mode=0) {
		const validFinalPosition = super.canMove([fromRow, fromCol], [toRow, toCol], mode);
		if (!validFinalPosition) {
			return false;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;

		//    ****** for the pawn moving up 1 *******     \\

		if ((Math.abs(numRows) === 1 || Math.abs(numRows) === 2) && numCols === 0) {
			if (numRows < 0 && this.isBlack()) {
				return false;
			}
			if (numRows > 0 && this.isWhite()) {
				return false;
			}
			if (Math.abs(numRows) === 2) {
				if (fromRow === 1 && this.isWhite()) {
					if (this.boardState.getPiece([fromRow - 1, fromCol]) !== null) {
						return false;
					}

				}
				if (fromRow === 6 && this.isBlack()) {
					if (this.boardState.getPiece([fromRow + 1, fromCol]) !== null) {
						return false;
					}

				}

			}
			if (!((Math.abs(fromRow) === 1) || (Math.abs(fromRow) === 6)))
				if (Math.abs(numRows) === 2)
					return false;
			//if the to position is empty, return true
			return this.boardState.getPiece([toRow, toCol]) === null

		}
		if (Math.abs(numCols) === 1) {
			if (numRows === -1 && this.isBlack()) {
				return false;
			} else if (numRows === 1 && this.isWhite()) {
				return false;
			}
			return (this.boardState.getPiece([toRow, toCol]) != null);
		}

		return false;
	}

}
