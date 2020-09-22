/**
 * A single chess piece with unknown type.
 * This class should be treated as abstract and never instantiated itself, but rather extended for derived classes.
 */
class Piece {
	#player = 0; // 0 -> white and 1 -> black
	#position = { row: -1, col: -1 };
	#captured = false;

	/**
	 *
	 * @param {{row: number; col: number}} position - An object with row and col properties that are both between 0 and 7 (inclusive)
	 * @param {number} player - 0 or 1 (0 by default) where 0 is a white piece and 1 is a black piece
	 */
	constructor({ row, col }, player=0) {}

	/**
	 * Returns true of the piece is black, false otherwise
	 * @returns {boolean}
	 */
	isBlack() {}
	isWhite() {}

	get position() {
		return { ...this.#position };
	}

	#setPosition = ({ row, col }) => {}

	canMoveTo({ row, col }) {}

	move({ row, col }) {}

	get captured() {
		return this.#captured;
	}

	capture() {}

	free() {}

}

export default Piece;
