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
	 * @throws {Error} Throws an error if the Piece class is instantiated by itself, and not a derived class
	 */
	constructor({ row, col }, player=0) {
		if(this instanceof Piece && this !== Piece) {
			throw new Error('Piece is abstract and can\'t be initialized');
		}

		this.#position = { row, col };
		this.#player = player;
	}

	/**
	 * Returns true of the piece is black, false otherwise
	 * @returns {boolean}
	 */
	isBlack() {}

	/**
	 * Returns true if the piece is white, otherwise false
	 * @returns {boolean}
	 */
	isWhite() {}

	/**
	 * Get the current position of the piece
	 *
	 * @returns { row: number; col: number; }
	 */
	get position() {
		return { ...this.#position };
	}

	/* Set the position of a piece */
	#setPosition = ({ row, col }) => {}

	/**
	 * Given a position, determine if the piece is allowed to move to that location
	 *
	 * @param {row: number; col: number;} position
	 *
	 * @returns {boolean}
	 * @throws {Error} Throws an error if not implemented by derived classes from the Piece class
	 */
	canMoveTo({ row, col }) {
		throw new Error('canMoveTo({ row, col }) must be overridden');
	}

	/**
	 * Moves the piece to a provied position
	 *
	 * @param {row: number; col: number;} position
	 */
	move({ row, col }) {
		if(this === Piece) {
			throw new Error('move({ row, col }) is abstract and must be implemented by classes that extend Piece');
		}
	}

	/**
	 * Rutrns if a piece is on the board
	 * @returns {boolean}
	 */
	get captured() {
		return this.#captured;
	}

	#setCaptured = newCaptured => {
		this.#captured = newCaptured;
	}

	/**
	 * Removes the piece from the board
	 */
	capture(capturerer) {

	}
}

export default Piece;
