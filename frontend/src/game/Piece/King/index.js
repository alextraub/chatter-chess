import Piece from '../Piece';

export default class King extends Piece {
	canMove([ fromRow, fromCol ], [ toRow, toCol ]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		return (numRows === 1 && numCols === 0) || (numRows === 1 && numCols === 1) || (numRows === 0 && numCols === 1);
	}
}
