/**
 * A single chess piece with unknown type.
 * This class should be treated as abstract and never instantiated itself, but rather extended for derived classes.
 */
class Piece {
	#player = 0;
	#position = { row: -1, col: -1 };
	#captured = false;

	/**
	 *
	 * @param {{row: number; col: number;}} position location on the chess board
	 * @param {0|1} player - which player the piece belongs to, 0 for white, 1 for black
	 * @throws {Error} Only classes derived from Piece may be instantiated
	 * @throws {Error} throws an error if an invalid board position is passed in as the first argument
	 */
	constructor({ row, col }, player = 0) {}

	/**
	 * Returns if the piece belongs to the black player
	 *
	 * @returns {boolean} true if the piece is a black piece, false otherwise
	 */
	isBlack() {}

	/**
	 * Returns if the piece belongs to the white player
	 *
	 * @returns {boolean} true if the piece is a white piece, false otherwise
	 */
	isWhite() {}

	/**
	 * The most recent position of the piece
	 *
	 * @returns {{row: number; col: number;}} the current position of the piece on the chess board. If the piece isn't on the chess board, the position will be the last position the piece was located at when it was on the board
	 */
	get position() {
		return null;
	}

	/**
	 * Change the piece's most recent board position
	 *
	 * @param {{row: number; col: number;}} position the new position of the piece where row and col are between 0 and 7 (inclusive)
	 * @throws {Error} throws an error if position is not a valid board position
	 */
	#setPosition = ({ row, col }) => {};

	/**
	 * Check if a piece is allowed to move to a specified position on the board
	 *
	 * @virtual
	 * @param {{row: number; col: number;}} position the desired position to move the piece to
	 * @returns {true|string} true if the piece can move to the provided position, or a string explaining why the move is not valid
	 */
	canMoveTo({ row, col }) {}

	/**
	 * Performs a valid move, removing any captured piece, or reports why a move is in valid
	 *
	 * @param {{row: number; col: number;}} position the desired board position to move the piece to
	 * @returns {true|string} true if the move was perofrmed, otherwise a string explaining why the move couldn't be performed
	 */
	move({ row, col }) {}

	/**
	 * Whether or not the piece has been captured by the opponent
	 */
	get captured() {
		return false;
	}

	/**
	 * Capture an opponent's piece
	 *
	 * @param {Piece} capturedPiece the piece to capture
	 * @throws {Error} throws an error if the piece to capture cannot be captured
	 */
	capture(capturedPiece) {}
}

export default Piece;
