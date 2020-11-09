import Piece from '../Piece';

export default class Queen extends Piece {
	get type() {
		return 'queen';
	}

	canMove([ fromRow, fromCol ], [ toRow, toCol ], mode=0) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ], mode);
		if(!validFinalPosition || typeof(validFinalPosition) === 'string') {
			return validFinalPosition;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;
		// diagonal up right
		if (numRows > 0 && numCols > 0 && Math.abs(numRows) === Math.abs(numCols)) {
			let currR = fromRow + 1;
			let currC = fromCol + 1;
			while (currR < toRow && currC < toCol) {
				const squareCheck = this.isNextSquareInPathEmpty([currR, currC], mode);
				if(squareCheck !== true) {
					return squareCheck;
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
				const squareCheck = this.isNextSquareInPathEmpty([currR, currC], mode);
				if(squareCheck !== true) {
					return squareCheck;
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
				const squareCheck = this.isNextSquareInPathEmpty([currR, currC], mode);
				if(squareCheck !== true) {
					return squareCheck;
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
				const squareCheck = this.isNextSquareInPathEmpty([currR, currC], mode);
				if(squareCheck !== true) {
					return squareCheck;
				}

				currR--;
				currC--;
			}
			return true;

		// up
		} else if (numRows > 0 && numCols === 0) {
			let currR = fromRow + 1;
			while (currR < toRow) {
				const squareCheck = this.isNextSquareInPathEmpty([currR, fromCol], mode);
				if(squareCheck !== true) {
					return squareCheck;
				}

				currR++;
			}
			return true;

		// down
		} else if (numRows < 0 && numCols === 0) {
			let currR = fromRow - 1;
			while (currR > toRow) {
				const squareCheck = this.isNextSquareInPathEmpty([currR, fromCol], mode);
				if(squareCheck !== true) {
					return squareCheck;
				}
				currR--;
			}
			return true;

		// right
		}  else if (numRows === 0 && numCols > 0) {
			let currC = fromCol + 1;
			while (currC < toCol) {
				const squareCheck = this.isNextSquareInPathEmpty([fromRow, currC], mode);
				if(squareCheck !== true) {
					return squareCheck;
				}

				currC++;
			}
			return true;

		// left
		} else if (numRows === 0 && numCols < 0) {
			let currC = fromCol - 1;
			while (currC > toCol) {
				const squareCheck = this.isNextSquareInPathEmpty([fromRow, currC], mode);
				if(squareCheck !== true) {
					return squareCheck;
				}
				currC--;
			}
			return true;
		} else {
			return mode === 0 ?
				false : `A ${this.type} can only move vertically, horizontally, or diagonally`;
		}
	}
}
