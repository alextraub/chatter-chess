import Piece from '../Piece';

export default class Knight extends Piece {
	canMove([ fromRow, fromCol ], [ toRow, toCol ], returnErrors=false) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ], returnErrors);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		if((numRows == 2 && numCols == 1) || (numRows == 1 && numCols == 2)) {
			return true;
		}

		return returnErrors ? 'Knights can\'t move that way' : false;
	}
}
