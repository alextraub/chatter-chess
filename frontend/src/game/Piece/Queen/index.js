import Piece from '../Piece';

export default class Queen extends Piece {
	canMove([ fromRow, fromCol ], [ toRow, toCol ]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;
		// diagonal up right
		if (numRows > 0 && numCols > 0 && Math.abs(numRows) === Math.abs(numCols)) {
			let currR = fromRow + 1;
			let currC = fromCol + 1;
			while (currR <= toRow && currC <= toCol) {
				if (super.boardState.getPiece(currR, currC) !== null) {
					return false;
				}
				currR++;
				currC++;
			}
			return true;

		// diagonal up left
		} else if (numRows > 0 && numCols < 0 && Math.abs(numRows) === Math.abs(numCols)) {
			let currR = fromRow + 1;
			let currC = fromCol - 1;
			while (currR <= toRow && currC >= toCol) {
				if (super.boardState.getPiece(currR, currC) !== null) {
					return false;
				}
				currR++;
				currC--;
			}
			return true;

		// diagonal down right
		} else if (numRows < 0 && numCols > 0 && Math.abs(numRows) === Math.abs(numCols)) {
			let currR = fromRow - 1;
			let currC = fromCol + 1;
			while (currR >= toRow && currC <= toCol) {
				if (super.boardState.getPiece(currR, currC) !== null) {
					return false;
				}
				currR--;
				currC++;
			}
			return true;

		// diagonal down left
		} else if (numRows < 0 && numCols < 0 && Math.abs(numRows) === Math.abs(numCols)) {
			let currR = fromRow - 1;
			let currC = fromCol - 1;
			while (currR >= toRow && currC >= toCol) {
				if (super.boardState.getPiece(currR, currC) !== null) {
					return false;
				}
				currR--;
				currC--;
			}
			return true;

		// up
		} else if (numRows > 0 && numCols === 0) {
			let currR = fromRow + 1;
			while (currR <= toRow) {
				if (super.boardState.getPiece(currR, fromCol) !== null) {
					return false;
				}
				currR++;
			}
			return true;

		// down
		} else if (numRows < 0 && numCols === 0) {
			let currR = fromRow - 1;
			while (currR >= toRow) {
				if (super.boardState.getPiece(currR, fromCol) !== null) {
					return false;
				}
				currR--;
			}
			return true;

		// right
		}  else if (numRows === 0 && numCols > 0) {
			let currC = fromCol + 1;
			while (currC <= toCol) {
				if (super.boardState.getPiece(fromRow, currC) !== null) {
					return false;
				}
				currC++;
			}
			return true;

		// left
		} else if (numRows === 0 && numCols < 0) {
			let currC = fromCol - 1;
			while (currC >= toCol) {
				if (super.boardState.getPiece(fromRow, currC) !== null) {
					return false;
				}
				currC--;
			}
			return true;
		} else {
			return false;
		}
	}
}
