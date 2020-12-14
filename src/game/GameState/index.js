import BoardState from '../BoardState';
import { inCheck, inCheckMate } from '../Check';
import {canSwapIn, createPiece} from '../utils/pieceUtils';
import Piece from '../Piece';
import { standardGame } from '../utils/gameUtils';

export default class GameState {
	#turn
	#boardState
	#boardPieces=[]
	#capturedPieces = {
		WHITE: {
			PAWN: [],
			ROOK: [],
			KNIGHT: [],
			BISHOP: [],
			QUEEN: [],
			KING: [],
			GENERIC: []
		},
		BLACK: {
			PAWN: [],
			ROOK: [],
			KNIGHT: [],
			BISHOP: [],
			QUEEN: [],
			KING: [],
			GENERIC: []
		}
	}
	#check
	#swapping = false;
	#swapList = [];

	constructor(initialState=standardGame) {
		this.#turn = initialState.turn;
		this.#check = initialState.check;

		for(let piece of initialState.pieces) {
			if(!piece.captured) {
				this.#boardPieces.push(piece);
			} else {
				this.#capturedPieces[piece.player][piece.type] = [
					...this.#capturedPieces[piece.player][piece.type],
					piece
				]
			}
		}

		this.#boardState = new BoardState(this.#boardPieces);

		this.putCapturedPiece = this.putCapturedPiece.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.getPiece = this.getPiece.bind(this);
		this.getCapturedPieces = this.getCapturedPieces.bind(this);
		this.isInCheck = this.isInCheck.bind(this);
		this.isInCheckMate = this.isInCheckMate.bind(this);
		this.performMove = this.performMove.bind(this);
		this.rollbackMove = this.rollbackMove.bind(this);
		this.performPromotion = this.performPromotion.bind(this);
	}

	get player() {
		return this.#turn % 2;
	}

	get turn() {
		return this.#turn;
	}

	nextTurn() {
		this.#turn++;
	}

	getCapturedPieces() {
		return {
			WHITE: {...this.#capturedPieces.WHITE},
			BLACK: {...this.#capturedPieces.BLACK}
		};
	}

	get capturedPieces() {
		const flattenPieces = player => {
			return Object.entries(this.#capturedPieces[player]).map(([_, pieceArray]) => {
				return [...pieceArray.map(piece => piece)]
			})
		}
		let result = [];
		for(let type of flattenPieces('WHITE')) {
			result = [...result, ...type];
		}
		for(let type of flattenPieces('BLACK')) {
			result = [...result, ...type];
		}

		console.log(result)
		return result;
	}

	get pieces() {
		const arr = [...this.#boardPieces];
		return [
			...arr,
			...this.capturedPieces
		].filter(e => !Array.isArray(e));
	}

	putCapturedPiece(piece) {
		this.#capturedPieces = {
			...this.#capturedPieces,
			[piece.player]: {
				...this.#capturedPieces[piece.player],
				[piece.type]: [
					...this.#capturedPieces[piece.player][piece.type],
					piece
				]
			}
		}
	}

	get check() {
		return {
			WHITE: {
				...this.#check.WHITE
			},
			BLACK: {
				...this.#check.BLACK
			}
		};
	}

	get board() {
		return this.#boardState.getBoard();
	}

	get swapping() {
		return this.#swapping;
	}

	get swapList() {
		return [...this.#swapList];
	}

	static asQueryObject(gameState) {
		return {
			turn: gameState.turn,
			pieces: [...gameState.pieces],
			check: gameState.check
		}
	}

	isInCheck(player, checkCallback=inCheck) {
		const pieces = (player === 0 ?
			this.#boardState.whitePieces :
			this.#boardState.blackPieces).pieces;
		if(!pieces['KING']) {
			return false;
		}

		for(let k of pieces['KING']) {
			const { row, col } = k.position;
			const pos = [row, col];
			if(checkCallback(pos, this.#boardState, player)) {
				return true;
			}
		}

		return false;
	}

	isInCheckMate(player) {
		return this.isInCheck(player, inCheckMate);
	}

	updateCheck(player) {
		const p = player === 0 ?
			"WHITE" :
			"BLACK";
		const newStatus = this.isInCheck(player);
		const newMate = newStatus && this.isInCheckMate(player);
		this.#check = {
			...this.#check,
			[p]: {
				status: newStatus,
				mate: newMate
			}
		}
	}

	getPiece(position) {
		return this.#boardState.getPiece(position);
	}

	/**
	 * Perform a move
	 *
	 * @param {[number, number]} from
	 * @param {[number, number]} to
	 */
	performMove(from, to) {
		const fromPiece = this.getPiece(from);
		const toPiece = this.getPiece(to);
		this.#boardState.movePiece(from, to);
		if (this.isInCheck(this.player)) {
			this.rollbackMove(from, fromPiece, to, toPiece);
			return false;
		}
		if (toPiece !== null) {
			this.putCapturedPiece(Piece.asQueryObject(toPiece, null));
		}
		const promotion = this.canPromote(to);
		if (!promotion) {
			this.updateCheck(this.player === 0 ? 1 : 0);
			if(!this.#check.WHITE.mate && !this.#check.BLACK.mate) {
				this.nextTurn();
			}
		}
		this.#boardPieces = [...this.#boardState.pieces];
		this.#boardState = new BoardState(this.#boardPieces);

		return true;
	}

	/**
	 * Given pieces and positions involved in a move, this method reverse the effect
	 * of performing a move from from to to, assuming that move was made last
	 *
	 * @param {[number, number]} from
	 * @param {Piece} fromPiece
	 * @param {[number, number]} to
	 * @param {Piece} toPiece
	 */
	rollbackMove(from, fromPiece, to, toPiece) {
		if(fromPiece.player === 0) {
			this.#boardState.whitePieces.remove(Piece.asQueryObject(fromPiece, from));
		} else {
			this.#boardState.blackPieces.remove(Piece.asQueryObject(fromPiece, from));
		}
		// Move the fromPiece to from
		this.#boardState.placePiece(fromPiece, from);
		// Undo and place any captured piece
		if(toPiece !== null) {
			toPiece.captured = false;
			this.#boardState.placePiece(toPiece, to);
		} else {
			this.#boardState.board[to[0]][to[1]] = null;
		}
	}

	/**
	 * Determine if a piece at a specified position can be promoted
	 *
	 * @param {[number, number]} to
	 */
	canPromote(to) {
		const piece = this.getPiece(to);
		if (piece.canSwapOut && to[0] === piece.swapRow) { // Piece is swappable and at a swappble position
			const pieces = piece.player === 0 ?
				this.#capturedPieces.WHITE :
				this.#capturedPieces.BLACK;
			const pieceTypes = this.getPossiblePromotionArray(to, pieces); // All possible types of pieces that can be swapped in
			if (pieceTypes.length > 0) { // Only move forward in the swap procedure if there are pieces that can be swapped in
				this.#swapping = to;
				this.#swapList = pieceTypes;
				return true;
			}
		}
		return false
	}

	/**
	 * Determine the types of piece at a porivded position can be promoted
	 *
	 * @param {[number, number]} to
	 * @param {object} pieces an object of piece query object arrays, as values, and piece types as keys
	 */
	getPossiblePromotionArray(to, pieces) {
		const currentPiece = this.getPiece(to);
		const result = Object.entries(pieces)
			// Filter out any piece type with no captured pieces and then any that cannot be swapped in
			.filter(([_, pieceArr]) => {
				if(pieceArr.length > 0 && canSwapIn(pieceArr[0].type)) {
					this.#boardState.placePiece(createPiece(pieceArr[0]), to);
					const causesCheck = this.isInCheck(this.player);
					return !causesCheck;
				}
				return false;
			})
			.map(([_, pieceArr]) => { // For the remaing piece arrays, map each to an object denoting what type of pieces it has and if they are black or not
				return {
					type: pieceArr[0].type,
					black: pieceArr[0].player === "BLACK"
				}
			});
		if(this.getPiece(to) !== currentPiece) {
			this.#boardState.placePiece(currentPiece, to);
		}
		return result;
	}

	/**
	 * Promotes a piece (located at the location in the swapping property, if not false) to a valid piece
	 * that has been captured.
	 *
	 * @param {string} type the type of piece to promote to
	 */
	performPromotion(type) {
		if (this.#swapping !== false) {
			const pieces = this.player === 0 ?
				this.#capturedPieces.WHITE :
				this.#capturedPieces.BLACK;
			const piece = this.getPiece(this.#swapping);
			piece.captured = true;
			const newPiece = pieces[type].pop();
			this.#boardState.placePiece(createPiece(newPiece), this.#swapping);
			this.putCapturedPiece(Piece.asQueryObject(piece, null));
			this.#swapping = false;
			this.#swapList = [];

			this.#boardPieces = [...this.#boardState.pieces];
			this.nextTurn();
		}
	}
}
