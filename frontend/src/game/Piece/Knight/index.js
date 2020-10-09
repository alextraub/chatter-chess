import Piece from '../Piece';

export default class Knight extends Piece {
	canMove([ fromRow, fromCol ], [ toRow, toCol ]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		return (numRows == 2 && numCols == 1) || (numRows == 1 && numCols == 2);
	}
}