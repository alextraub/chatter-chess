import Piece from '../Piece';

export default class Knight extends Piece {
	get type() {
		return 'knight';
	}

	canMove([ fromRow, fromCol ], [ toRow, toCol ], mode=0) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ], mode);
		if(!validFinalPosition || typeof(validFinalPosition) === 'string') {
			return validFinalPosition;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		if((numRows == 2 && numCols == 1) || (numRows == 1 && numCols == 2)) {
			return true;
		}

		return mode === 0 ?
			false : `A ${this.type} can only move 2 spaces vertically and 1 horizontally or 1 vertically and 2 horizontally`;
	}
}
