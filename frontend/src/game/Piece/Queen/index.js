import Piece from '../Piece';

export default class Queen extends Piece {
	canMove([ fromRow, fromCol ], [ toRow, toCol ]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = Math.abs(toRow - fromRow);
		const numCols = Math.abs(toCol - fromCol);

		return ((numRows === numCols) && (numRows !== 0) && (numCols !== 0)) || (numRows > 0 && numCols === 0) || (numRows === 0 && numCols > 0);
	}
}
