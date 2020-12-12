import { isPieceQueryObject } from '../utils/pieceUtils';

/**
 * A class to mantain a unique set of different abstract piece 'types' and their board positions
 */
class PieceSet {
	#pieces = {
		PAWN: [],
		ROOK: [],
		KNIGHT: [],
		BISHOP: [],
		QUEEN: [],
		KING: [],
		GENERIC: []
	}
	#player
	#count = 0

	/**
	 *
	 * @param {-1|'WHITE'|'BLACK'?} player if -1 (default) all pieces are able to be considered for addition into the set, otherwise the pieces must have the same player property value=
	 * @param {Piece[Piece[]]} board
	 * @throws {TypeError} board is not a 2D array of Pieces or null elements
	 */
	constructor(player=-1, pieces=[]) {
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.update = this.update.bind(this);

		if(player !== -1 && player !== 'WHITE' && player !== 'BLACK') {
			throw new TypeError('PieceSet may only be passed a first parameter of -1, "WHITE", or "BLACK"');
		}
		this.#player = player;

		if(!Array.isArray(pieces)) {
			throw new TypeError('pieces must be an array of Pieces in query object format');
		}

		for(let piece of pieces) {
			if(!isPieceQueryObject(piece)) {
				throw new TypeError('pieces must be an array of Pieces in query object format');
			}

			this.add(piece);
		}
	}

	/**
	 * Number of items in the set
	 */
	get size() {
		return this.#count;
	}

	get pieces() {
		return { ...this.#pieces };
	}

	/**
	 * Add a piece position to the set
	 *
	 * @param {{
	 * type: 'PAWN'|'ROOK'|'KNIGHT'|'BISHOP'|'QUEEN'|'KING'|'GENERIC';
	 * player: 'WHITE'|'BLACK';
	 * captured: boolean;
	 * position: null|{ row: 0|1|2|3|4|5|6|7; col: 0|1|2|3|4|5|6|7 }
	 * }} piece
	 * @returns {boolean} true if add operation was successful, false otherwise
	 * @throws {TypeError} piece is not a Piece query object
	 */
	add(piece) {
		if(!isPieceQueryObject(piece)) {
			throw new TypeError();
		}
		if(this.#player !== -1 && piece.player !== this.#player) {
			return false;
		}
		if(piece.position !== null && this.#pieces[piece.type].some((p => JSON.stringify(p.position) === JSON.stringify(piece.position)))) {
			return false;
		}
		this.#pieces[piece.type].push(piece);
		this.#count++;
		return true;
	}

	/**
	 * Removes a piece position to the set
	 *
	 * @param {{
	 * type: 'PAWN'|'ROOK'|'KNIGHT'|'BISHOP'|'QUEEN'|'KING'|'GENERIC';
	 * player: 'WHITE'|'BLACK';
	 * captured: boolean;
	 * position: null|{ row: 0|1|2|3|4|5|6|7; col: 0|1|2|3|4|5|6|7 }
	 * }} piece
	 * @returns {boolean} true if remove operation was successful, false otherwise
	 * @throws {TypeError} piece is not a Piece instance
	 */
	remove(piece) {
		if(!isPieceQueryObject(piece)) {
			throw new TypeError('piece must be a Piece in query object format');
		} else if(this.#player !== -1 && piece.player !== this.#player) {
			return false;
		}
		const jsonPiece = JSON.stringify(piece);

		let index = -1;
		for(let i=0; i<this.#pieces[piece.type].length; i++) {
			const p = JSON.stringify(this.#pieces[piece.type][i]);
			if(p === jsonPiece) {
				index = i;
				break;
			}
		}
		if(index === -1) {
			return false;
		}
		const arrLength = this.#pieces[piece.type].length;
		const subArr1 = index === 0 ? [] : this.#pieces[piece.type].slice(0, index+1);
		const subArr2 = index === arrLength - 1 ? [] : this.#pieces[piece.type].slice(index + 1, arrLength);
		this.#pieces[piece.type] = [...subArr1, ...subArr2];
		this.#count--;
		return true;
	}

	/**
	 * Updates a piece in the set
	 *
	 * @param {{
	 * type: 'PAWN'|'ROOK'|'KNIGHT'|'BISHOP'|'QUEEN'|'KING'|'GENERIC';
	 * player: 'WHITE'|'BLACK';
	 * captured: boolean;
	 * position: null|{ row: 0|1|2|3|4|5|6|7; col: 0|1|2|3|4|5|6|7 }
	 * }} piece
	 * @param {{
	 * type: 'PAWN'|'ROOK'|'KNIGHT'|'BISHOP'|'QUEEN'|'KING'|'GENERIC';
	 * player: 'WHITE'|'BLACK';
	 * captured: boolean;
	 * position: null|{ row: 0|1|2|3|4|5|6|7; col: 0|1|2|3|4|5|6|7 }
	 * }} newPiece
	 * @returns {boolean} true if update operation was successful, false otherwise
	 * @throws {TypeError} piece is not a Piece instance
	 */
	update(piece, newPiece) {
		if(!isPieceQueryObject(piece) || !isPieceQueryObject(newPiece)) {
			throw new TypeError('update must be passed 2 Pieces in query object format');
		}

		if(piece.type !== newPiece.type) {
			throw new TypeError('piece and newPiece must have the same piece type');
		}
		if(piece.player !== newPiece.player) {
			throw new TypeError('piece and newPiece must belong to the same player');
		}

		if(this.#player !== -1 && piece.player !== this.#player) {
			return false;
		}


		if(this.#pieces[piece.type].length > 0) {
			let index = -1;
			for(let i=0; i<this.#pieces[piece.type].length; i++) {
				const p = this.#pieces[piece.type][i];
				if(p.captured === piece.captured) {
					if(p.position === null && piece.position === null) {
						index = i;
						break;
					} else if(p.position.row === piece.position.row && p.position.col === piece.position.col) {
						index = i;
						break;
					}
				}
			}

			if(index === -1) {
				return false;
			}

			this.remove(piece);
			this.add(newPiece);
			return true;
		}
		return false;
	}

	/**
	 *
	 * @param {(position: [number, number]) => boolean} predicate
	 * @returns {[number,number][]}
	 */
	getPieces(predicate=() => true) {
		let results = [];
		Object.entries(this.#pieces)
			.filter(([_, pieceArray]) => pieceArray.length > 0)
			.map(([_, pieceArray]) => pieceArray
				.filter(piece => predicate(piece)))
			.forEach(pieceArray => {
				results = results.concat(pieceArray);
			});

		return results;
	}
}

export default PieceSet;
