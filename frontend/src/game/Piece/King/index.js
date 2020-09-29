import Piece from '../Piece';

export default class King extends Piece {
	constructor(position, player) {
		super(position, player);
	}

	canMoveTo({row, col}) {
		if (row === this.position.row - 1 || row === this.position.row + 1) {
			// diagonal movement
			if (col === this.position.col - 1 || col === this.position.col + 1) {
				return true;
			// up/down movement
			} else if (col === this.position.col) {
				return true;
			} else {
				return "The King cannot move into that position";
			}
		} else if (row === this.position.row) {
			// left/right movement
			if (col === this.position.col - 1 || col === this.position.col + 1) {
				return true;
			} else {
				return "The King cannot move into that position";
			}
		} else {
			return "The King cannot move into that position";
		}
	}
}
