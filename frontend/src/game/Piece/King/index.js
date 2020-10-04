import Piece from '../Piece';

export default class King extends Piece {
	canMove([ fromRow, fromCol ], [ toRow, toCol ]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;
		// diagonal up right
		if (numRows === 1 && numCols === 1) {
			let currR = fromRow + 1;
			let currC = fromCol + 1;
			return super.boardState.getPiece(currR, currC) === null;

			// diagonal up left
		} else if (numRows === 1 && numCols === -1) {
			let currR = fromRow + 1;
			let currC = fromCol - 1;
			return super.boardState.getPiece(currR, currC) === null;

			// diagonal down right
		} else if (numRows === -1 && numCols === 1) {
			let currR = fromRow - 1;
			let currC = fromCol + 1;
			return super.boardState.getPiece(currR, currC) === null;

			// diagonal down left
		} else if (numRows === -1 && numCols === -1) {
			let currR = fromRow - 1;
			let currC = fromCol - 1;
			return super.boardState.getPiece(currR, currC) === null;

			// up
		} else if (numRows === 1 && numCols === 0) {
			let currR = fromRow + 1;
			return super.boardState.getPiece(currR, fromCol) === null;

			// down
		} else if (numRows === -1 && numCols === 0) {
			let currR = fromRow - 1;
			return super.boardState.getPiece(currR, fromCol) === null;

			// right
		}  else if (numRows === 0 && numCols === 1) {
			let currC = fromCol + 1;
			return super.boardState.getPiece(fromRow, currC) === null;

			// left
		} else if (numRows === 0 && numCols === -1) {
			let currC = fromCol - 1;
			return super.boardState.getPiece(fromRow, currC) === null;

		} else {
			return false;
		}
	}
}
