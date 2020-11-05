import Piece from '../Piece';

/**
 * A class to mantain a unique set of different abstract piece 'types' and their board positions
 */
class PieceSet {
	pieces = {
		pawn: [],
		rook: [],
		knight: [],
		bishop: [],
		queen: [],
		king: [],
		generic: []
	}
	player

	/**
	 *
	 * @param {-1|0|1?} player if -1 (default) all pieces are able to be considered for addition into the set, otherwise the pieces must have the same player property value=
	 * @param {Piece[Piece[]]} board
	 * @throws {TypeError} board is not a 2D array of Pieces or null elements
	 */
	constructor(player=-1, board=undefined) {
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.update = this.update.bind(this);

		this.player = player;

		if(board !== undefined) {
			if(!Array.isArray(board)) {
				throw new TypeError('board must be a 2D array of Pieces and null elements only');
			}

			for(let r=0; r<board.length; r++) {
				if(!Array.isArray(board[r])) {
					throw new TypeError('board must be a 2D array of Pieces and null elements only');
				}

				const row = board[r];

				for(let c=0; c<row.length; c++) {
					const element = row[c];
					if(element !== null) {
						this.add(element, [r,c]);
					}
				}
			}
		}
	}

	/**
	 * Add a piece position to the set
	 *
	 * @param {Piece} piece
	 * @param {[number, number]} position
	 * @returns {boolean} true if add operation was successful, false otherwise
	 * @throws {TypeError} piece is not a Piece instance
	 */
	add(piece, [row, col]) {
		if(piece === null || !(piece instanceof Piece)) {
			throw new TypeError();
		}
		if(this.player !== -1 && piece.player !== this.player) {
			return false;
		}
		if(this.pieces[piece.type]) {
			if(this.pieces[piece.type].some((p => JSON.stringify(p) === JSON.stringify([row, col])))) {
				return false;
			}
			this.pieces[piece.type].push([row, col]);
		} else {
			this.pieces[piece.type] = [[row, col]];
		}
		return true;
	}

	/**
	 * Removes a piece position to the set
	 *
	 * @param {Piece} piece
	 * @param {[number, number]} position
	 * @returns {boolean} true if remove operation was successful, false otherwise
	 * @throws {TypeError} piece is not a Piece instance
	 */
	remove(piece, [row, col]) {
		if(piece === null || !(piece instanceof Piece)) {
			throw new TypeError();
		} else if(this.player !== -1 && piece.player !== this.player) {
			return false;
		} else if(!this.pieces[piece.type]) {
			throw false;
		}

		const jsonPos = JSON.stringify([row, col]);
		const hasPiece = this.pieces[piece.type].some(e => JSON.stringify(e) === jsonPos);
		if(!hasPiece) {
			return false;
		}
		const newPieceArray = this.pieces[piece.type].filter(([r, c]) => r !== row || c !== col);
		this.pieces[piece.type] = newPieceArray;
		return true;
	}

	/**
	 * Updates a piece in the set
	 *
	 * @param {Piece} piece
	 * @param {[number, number]} currentPosition
	 * @param {[number, number]} newPosition
	 * @returns {boolean} true if update operation was successful, false otherwise
	 * @throws {TypeError} piece is not a Piece instance
	 */
	update(piece, [curRow, curCol], [newRow, newCol]) {
		if(piece === null || !(piece instanceof Piece)) {
			throw new TypeError();
		}

		if(this.player !== -1 && piece.player !== this.player) {
			return false;
		}


		if(this.pieces[piece.type]) {
			const jsonPos = JSON.stringify([curRow, curCol]);
			let pIndex = -1;
			for(let i=0; i<this.pieces[piece.type].length; i++) {
				if(JSON.stringify(this.pieces[piece.type][i]) === jsonPos) {
					pIndex = i;
					break;
				}
			}

			if(pIndex >= 0) {
				this.pieces[piece.type][pIndex] = [newRow, newCol];
				return true;
			}
		}
		return false;
	}
}

export default PieceSet;
