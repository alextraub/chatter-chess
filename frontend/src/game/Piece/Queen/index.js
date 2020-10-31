import Piece from '../Piece';

export default class Queen extends Piece {
	get type() {
		return 'queen';
	}

	canMove([ fromRow, fromCol ], [ toRow, toCol ], mode=0) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ], mode);
		if(!validFinalPosition) {
			return false;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;
		// diagonal up right
		if (numRows > 0 && numCols > 0 && Math.abs(numRows) === Math.abs(numCols)) {
			let currR = fromRow + 1;
			let currC = fromCol + 1;
			while (currR < toRow && currC < toCol) {
				if (this.boardState.getPiece([currR, currC]) !== null) {
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
			while (currR < toRow && currC > toCol) {
				if (this.boardState.getPiece([currR, currC]) !== null) {
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
			while (currR > toRow && currC < toCol) {
				if (this.boardState.getPiece([currR, currC]) !== null) {
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
			while (currR > toRow && currC > toCol) {
				if (this.boardState.getPiece([currR, currC]) !== null) {
					return false;
				}
				currR--;
				currC--;
			}
			return true;

		// up
		} else if (numRows > 0 && numCols === 0) {
			let currR = fromRow + 1;
			while (currR < toRow) {
				if (this.boardState.getPiece([currR, fromCol]) !== null) {
					return false;
				}
				currR++;
			}
			return true;

		// down
		} else if (numRows < 0 && numCols === 0) {
			let currR = fromRow - 1;
			while (currR > toRow) {
				if (this.boardState.getPiece([currR, fromCol]) !== null) {
					return false;
				}
				currR--;
			}
			return true;

		// right
		}  else if (numRows === 0 && numCols > 0) {
			let currC = fromCol + 1;
			while (currC < toCol) {
				if (this.boardState.getPiece([fromRow, currC]) !== null) {
					return false;
				}
				currC++;
			}
			return true;

		// left
		} else if (numRows === 0 && numCols < 0) {
			let currC = fromCol - 1;
			while (currC > toCol) {
				if (this.boardState.getPiece([fromRow, currC]) !== null) {
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
