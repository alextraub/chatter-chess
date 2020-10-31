import BoardState from '../../BoardState';
import { boardPositionToString } from '../../utils/boardPosition';

/**
 * A single chess piece with unknown type.
 * This class should be treated as abstract and never instantiated itself, but rather extended for derived classes.
 */
class Piece {
	#player;
	boardState;
	#captured = false;

	/**
	 *
	 * @todo check that boardState is a non-null instance of BoardState
	 *
	 * @param {BoardState} boardstate
	 * @param {0|1} player which player the piece belongs to, 0 for white, 1 for black
	 * @throws {TypeError} Only classes derived from Piece may be instantiated
	 * @throws {ReferenceError} boardState cannot be null or anything other than a BoardState instance
	 * @throws {TypeError} throws an error if player is anything other than 0 or 1
	 */
	constructor(boardState, player=0) {
		if(new.target === Piece) {
			throw new TypeError('Piece is abstract and cannot be instantiated');
		}
		if(boardState === undefined || !(boardState instanceof BoardState)) {
			throw new TypeError(`Piece constructor expected to be passed a BoardState but got ${boardState}`);
		}
		if(player !== 0 && player !== 1) {
			throw new TypeError('Piece\'s constructor was pased a value for player that was not 0 or 1');
		}

		this.boardState = boardState;
		this.#player = player;
	}

	/**
	 * @returns {string} the full length, lowercase word for what type of piece this is, like rook, bishop, etc
	 */
	get type() {
		return 'generic';
	}

	/**
	 * Get the player this piece belongs to, 0 for white, 1 for black
	 */
	get player() {
		return this.#player;
	}

	/**
	 * Returns if the piece belongs to the black player
	 *
	 * @returns {boolean} true if the piece is a black piece, false otherwise
	 */
	isBlack() {
		return this.#player === 1;
	}

	/**
	 * Returns if the piece belongs to the white player
	 *
	 * @returns {boolean} true if the piece is a white piece, false otherwise
	 */
	isWhite() {
		return this.#player === 0;
	}

	/**
	 * A boolean representing if this Piece is captured or not
	 */
	get captured() {
		return this.#captured;
	}

	/**
	 * Set the Piece captured field to true or false, if provided a non-boolean value, a TypeError will be thrown
	 */
	set captured(newCaptured) {
		if(typeof(newCaptured) !== 'boolean') {
			throw new TypeError(`Piece.captured must be a boolean but got ${newCaptured}`);
		}

		this.#captured = newCaptured;
	}

	/**
	 * Determine if a piece can move from a given position to a target position
	 * Arguments are assumed to be valid positions on teh board.
	 *
	 * Derived classes must call the Piece class' method first, to verify that a move is valid for a generic piece, then if it is, check if the move is valid for the specific type of piece
	 *
	 * @virtual
	 * @param {[number, number]} from the starting position
	 * @param {[number, number]} to the desired position to move the piece to
	 * @param {0|1?} mode optionally set to 0 (default) to only return true or false, or 1 to return error messages if move is invalid
	 * @returns {boolean|string} ture if the piece is able to move from from to to otherwise false for mode 0 and an error message if mode 1
	 * @throws {TypeError} throws error when missing arguments or invalid parameter types are passed
	 */
	canMove([ fromRow, fromCol ], [ toRow, toCol ], mode=0) {
		if(mode !== 0 && mode !== 1) {
			throw TypeError(`canMove can only have a mode paremeter of 0 or 1 but got ${mode}`);
		}

		if(fromRow === toRow && fromCol === toCol) { // check that the from and to positions are different
			return mode === 0 ?
				false : 'You must move a piece to a new position';
		}

		const targetSquare = this.boardState.getPiece([ toRow, toCol ])
		if(targetSquare === null) {
			return true;
		} else if(this.isWhite() && targetSquare.isBlack()) {
			return true;
		} else if(this.isBlack() && targetSquare.isWhite()) {
			return true;
		}

		return mode === 0 ?
			false : `You already have a piece at ${boardPositionToString([toRow, toCol])}`;
	}
}

export default Piece;
