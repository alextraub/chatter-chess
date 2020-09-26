/**
 * A single chess piece with unknown type.
 * This class should be treated as abstract and never instantiated itself, but rather extended for derived classes.
 */
class Piece {
	#player;
	#position;
	#captured = false;

	/**
	 *
	 * @param {{row: number; col: number;}} position location on the chess board
	 * @param {0|1} player - which player the piece belongs to, 0 for white, 1 for black
	 * @throws {TypeError} Only classes derived from Piece may be instantiated
	 * @throws {TypeError|RangeError} throws an error if an invalid board position is passed in as the first argument
	 * @throws {TypeError} throws an error if player is anything other than 0 or 1
	 */
	constructor(position, player=0) {
		if(new.target === Piece) {
			throw new TypeError('Piece is abstract and cannot be instantiated');
		} else if(player !== 0 && player !== 1) {
			throw new TypeError('Piece\'s constructor was pased a value for player that was not 0 or 1');
		}

		this.#setPosition(position);
		this.#player = player;
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
	 * The most recent position of the piece
	 *
	 * @returns {{row: number; col: number;}} the current position of the piece on the chess board. If the piece isn't on the chess board, the position will be the last position the piece was located at when it was on the board
	 */
	get position() {
		return {...this.#position};
	}

	/**
	 * Change the piece's most recent board position
	 *
	 * @param {{row: number; col: number;}} position the new position of the piece where row and col are between 0 and 7 (inclusive)
	 * @throws {Error} throws an error if position is not a valid board position
	 */
	#setPosition = ({ row, col }) => {
		if(row === undefined || col === undefined) {
			throw new TypeError("Position was missing either a row or col property");
		} else if(typeof(row) !== 'number' || typeof(col) !== 'number') {
			throw new TypeError('Piece positions must have numeric row and col property values');
		} else if(row < 0 || row > 7 || col < 0 || col > 7) {
			throw new RangeError('Pieces must have a position with a row and col value each between 0 and 7 (inclusive)');
		}

		this.#position = { row, col };
	};


	/**
	 * Check if a piece is allowed to move to a specified position on the board
	 *
	 * @virtual
	 * @param {{row: number; col: number;}} position the desired position to move the piece to
	 * @returns {true|string} true if the piece can move to the provided position, or a string explaining why the move is not valid
	 */
	canMoveTo({ row, col }) {
		throw new Error('canMoveTo must be overridden in any derived class of Piece');
	}

	/**
	 * Performs a valid move or reports why a move is invalid
	 *
	 * @param {{row: number; col: number;}} position the desired board position to move the piece to
	 * @returns {true|string} true if the move was perofrmed, otherwise a string explaining why the move couldn't be performed
	 */
	move({ row, col }) {
		const validMove = this.canMoveTo({ row, col });
		if(validMove !== true) {
			return validMove;
		} else {
			try {
				this.#setPosition({ row, col });
			} catch (err) {
				return err;
			}
		}

		return true;
	}

	/**
	 * Whether or not the piece has been captured by the opponent
	 */
	get captured() {
		return this.#captured;
	}

	/**
	 *
	 * Change a piece from uncaptured to captured or from captured to uncaptured
	 *
	 * @param {boolean} capturedState
	 * @throws {TypeError} throws an error if capturedState is not a boolean
	 * @throws {EvalError} throws an error if trying to change the captured state of a piece to the current captured state of that piece
	 */
	setCaptured(capturedState) {
		if(typeof(capturedState) !== 'boolean') {
			throw new TypeError('Pieces can only have a boolean value for their captured state');
		} else if(this.#captured === capturedState) {
			throw new EvalError('Piece already had a captured state of ' + capturedState);
		}

		this.#captured = capturedState;
	}
}

export default Piece;
