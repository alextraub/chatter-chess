import Piece from '../Piece';

export default class Queen extends Piece {
	constructor(position, player) {
		super(position, player);
	}

	canMoveTo({row, col}) {
		if (row !== this.position.row) {
			// up/down movement
			if (col === this.position.col) {
				return true;
			} else {
				const rowDif = this.position.row - row;
				const colDif = this.position.col - col;
				if (Math.abs(rowDif) !== Math.abs(colDif)) {
					return "The Queen cannot move into that position";
				} else {
					return true;
				}
			}
		} else if (row === this.position.row) {
			// left/right movement
			if (col !== this.position.col) {
				return true;
			} else {
				return "The King cannot move into that position";
			}
		} else {
			return "The King cannot move into that position";
		}
	}
}
