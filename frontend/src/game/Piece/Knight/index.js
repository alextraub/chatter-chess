import Piece from '../Piece';

export default class Knight extends Piece {
	get type() {
		return 'knight';
	}

	canMove([ fromRow, fromCol ], [ toRow, toCol ]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		if((numRows == 2 && numCols == 1) || (numRows == 1 && numCols == 2)) {
			return true;
		}

		return false;
	}
}
