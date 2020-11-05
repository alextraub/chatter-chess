import Piece from '../Piece';

export default class King extends Piece {
	get type() {
		return 'king';
	}

	get canSwapIn() {
		return false;
	}

	canMove([ fromRow, fromCol ], [ toRow, toCol ], mode=0) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ], mode);
		if(!validFinalPosition || typeof(validFinalPosition) === 'string') {
			return validFinalPosition;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		if ((numRows === 1 && numCols === 1) || (numRows === 0 && numCols === 1) || (numRows === 1 && numCols === 0)) {
			return true;
		} else {
			return mode === 0 ?
				false: `A ${this.type} can only move 1 square in any direction`;
		}
	}
}
