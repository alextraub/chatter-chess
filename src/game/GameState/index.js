import BoardState from '../BoardState';
import { inCheck, inCheckMate } from '../Check';
import {canSwapIn, canSwapOut, createPiece} from '../utils/pieceUtils';

const initialCheck = {
	white: {
		status: false,
		mate: false
	},
	black: {
		status: false,
		mate: false
	}
};

export default class GameState {
	#turn
	#boardState
	#boardPieces=[]
	#capturedPieces = {
		white: {
			pawn: [],
			rook: [],
			knight: [],
			bishop: [],
			queen: [],
			king: [],
			generic: []
		},
		black: {
			pawn: [],
			rook: [],
			knight: [],
			bishop: [],
			queen: [],
			king: [],
			generic: []
		}
	}
	#check
	player
	#swapping = false
	#swapList = []

	constructor(turn=0, check=initialCheck, pieces=[]) {
		this.#turn = turn;
		this.#check = check;

		pieces.forEach(piece => {
			if(!piece.captured) {
				this.#boardPieces.push(piece);
			} else {
				this.#capturedPieces[piece.player.toLowerCase()][piece.type.toLowerCase()].push(piece);
			}
		});

		this.#boardState = new BoardState(this.#boardPieces);

		this.putCapturedPiece = this.putCapturedPiece.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
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

	get capturedPieces() {
		const pieces = [];
		const flattenPieces = player => {
			Object.entries(this.#capturedPieces[player]).forEach(([_, pieceArray]) => {
				pieceArray.forEach(piece => {
					pieces.push(piece);
				})
			})
		}

		flattenPieces('white');
		flattenPieces('black');
		return pieces;
	}

	get pieces() {
		return [
			...this.#boardPieces,
			...this.capturedPieces
		];
	}

	putCapturedPiece(piece) {
		this.#capturedPieces = {
			...this.#capturedPieces,
			[piece.player.toLowerCase()]: {
				...this.#capturedPieces[piece.player.toLowerCase()],
				[piece.type.toLowerCase()]: [
					...this.#capturedPieces[piece.player.toLowerCase()][piece.type.toLowerCase()],
					piece
				]
			}
		}
	}

	get check() {
		return {
			white: {
				...this.#check.white
			},
			black: {
				...this.#check.black
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
			whiteCheckStatus: gameState.check.white,
			blackCheckStatus: gameState.check.black
		}
	}

	isInCheck(player, checkCallback=inCheck) {
		const pieces = player === 0 ?
			this.#capturedPieces.white :
			this.#capturedPieces.black;
		if(!pieces['king']) {
			return false;
		}

		for(let pos of pieces['king']) {
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
			"white" :
			"black";
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

	performMove(from, to) {
		const fromPiece = this.getPiece(from);
		const toPiece = this.getPiece(to);
		this.#boardState.movePiece(from, to);
		if (this.isInCheck(this.player)) {
			this.rollbackMove(from, fromPiece, to, toPiece);
			return false;
		}
		if (toPiece !== null) {
			this.putCapturedPiece(toPiece);
		}
		const promotion = this.canPromote(to);
		if (!promotion) {
			this.updateCheck(this.player);
			if(!this.#check.white.mate && !this.#check.black.mate) {
				this.nextTurn();
			}
		}
		return true;
	}

	rollbackMove(from, fromPiece, to, toPiece) {
		if(fromPiece.player === 0) {
			this.#boardState.whitePieces.remove(fromPiece, from);
		} else {
			this.#boardState.blackPieces.remove(fromPiece, from);
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

	canPromote(to) {
		const piece = this.getPiece(to);
		if (piece.canSwapOut && to[0] === piece.swapRow) { // Piece is swappable and at a swappble position
			const pieces = piece.player === 0 ?
				this.#capturedPieces.white :
				this.#capturedPieces.black;
			const pieceTypes = this.getPossiblePromotionArray(to, pieces); // All possible types of pieces that can be swapped in
			if (pieceTypes.length > 0) { // Only move forward in the swap procedure if there are pieces that can be swapped in
				this.#swapping = to;
				this.#swapList = pieceTypes;
				return true;
			}
		}
		return false
	}

	getPossiblePromotionArray(to, pieces) {
		const currentPiece = this.getPiece(to);
		const result = Object.entries(pieces)
			// Filter out any piece type with no captured pieces and then any that cannot be swapped in
			.filter(([_, pieceArr]) => {
				if(pieceArr.length > 0 && canSwapIn(pieceArr[0].type)) {
					this.#boardState.placePiece(pieceArr[0], to);
					const causesCheck = this.isInCheck(this.player);
					return !causesCheck;
				}
				return false;
			})
			.map(([_, pieceArr]) => { // For the remaing piece arrays, map each to an object denoting what type of pieces it has and if they are black or not
				return {
					...pieceArr[0].toObject(),
					black: pieceArr[0].player === "BLACK"
				}
			});
		if(this.getPiece(to) !== currentPiece) {
			this.#boardState.placePiece(currentPiece, to);
		}
		return result;
	}

	performPromotion(type) {
		if (this.#swapping !== false) {
			const pieces = this.player === 0 ?
				this.#capturedPieces.white :
				this.#capturedPieces.black;
			const piece = this.getPiece(this.#swapping);
			piece.captured = true;
			const newPiece = pieces[type].pop();
			newPiece.captured = false;
			this.#boardState.placePiece(createPiece(type, null, this.player, false), this.#swapping);
			this.putCapturedPiece(piece);
			this.#swapping = false;
			this.#swapList = [];
		}
	}
}

// import BoardState from "../BoardState";
// import PropTypes from "prop-types";
// import {inCheck, inCheckMate} from "../Check";
//
// export default class GameState {
//
// 	constructor(props) {
// 		this.boardState = this.props.boardState;
// 		this.capturedWhitePieces = {
// 			count: 0,
// 			pieces: {
// 				pawn: [],
// 				rook: [],
// 				knight: [],
// 				bishop: [],
// 				queen: [],
// 				king: [],
// 				generic: []
// 			}
// 		};
// 		this.capturedBlackPieces = {
// 			count: 0,
// 			pieces: {
// 				pawn: [],
// 				rook: [],
// 				knight: [],
// 				bishop: [],
// 				queen: [],
// 				king: [],
// 				generic: []
// 			}
// 		};
// 		this.state = {
// 			board: [...this.boardState.getBoard()],
// 			check: {
// 				white: {
// 					previous: false,
// 					status: false,
// 					mate: false
// 				},
// 				black: {
// 					previous: false,
// 					status: false,
// 					mate: false
// 				}
// 			},
// 			capturedWhitePieces: { ...this.capturedWhitePieces },
// 			capturedBlackPieces: { ...this.capturedBlackPieces },
// 			swapping: false, // If waiting for a piece swap, will be a board position of the piece to swap, otherwise false
// 			swapList: [], // Possible types of pieces to swap
// 			turn: this.props.turn
// 		};
//
// 		this.updateTurn = this.updateTurn.bind(this);
// 		this.currentPlayer = this.currentPlayer.bind(this);
// 		this.performMove = this.performMove.bind(this);
// 		this.performMovePiece = this.performMovePiece.bind(this);
// 		this.rollbackMove = this.rollbackMove.bind(this);
// 		this.getCheckFlags = this.getCheckFlags.bind(this);
// 		this.capturePiece = this.capturePiece.bind(this);
// 		this.findPawn = this.findPawn.bind(this);
// 		this.promotePawn = this.promotePawn.bind(this);
// 		this.updateCapturedLists = this.updateCapturedLists.bind(this);
// 		this.isInCheck = this.isInCheck.bind(this);
// 		this.isInCheckMate = this.isInCheckMate.bind(this);
// 	}
//
// 	static propTypes = {
// 		boardState: PropTypes.instanceOf(BoardState),
// 		turn: PropTypes.number
// 	};
//
// 	updateTurn() {
// 		this.setState({
// 			...this.state,
// 			turn: this.state.turn++
// 		});
// 	}
//
// 	currentPlayer() {
// 		return this.state.turn % 2;
// 	}
//
// 	performMove(from, to) {
// 		const fromPiece = this.boardState.getPiece(from);
// 		const toPiece = this.boardState.getPiece(to);
// 		this.boardState.movePiece(from, to);
// 		if (this.isInCheck(this.currentPlayer())) {
// 			this.rollbackMove(from, fromPiece, to, toPiece);
// 			return false;
// 		}
// 		if (toPiece !== null) {
// 			this.updateCapturedLists(toPiece);
// 		}
// 		const promotion = this.canPromote(to);
// 		if (!promotion) {
// 			const prevCheck = this.currentPlayer() === 0 ?
// 				{ white: { check: false, mate: false } } :
// 				{ black: { check: false, mate: false } };
// 			const newCheck = {
// 				...this.getCheckFlags(this.currentPlayer() === 0 ? 1 : 0)
// 			};
// 			this.setState({
// 				...this.state,
// 				check: {
// 					...newCheck,
// 					...prevCheck
// 				}
// 			});
// 			if(!this.state.check.white.mate && !this.state.check.black.mate) {
// 				this.updateTurn();
// 			}
// 		}
// 		return true;
// 	}
//
// 	performMovePiece(type, to) {
// 		const fromPiece = type;
// 		const toPiece = this.boardState.getPiece(to);
// 		let fromPosition = null;
// 		this.currentPlayer() === 0 ?
// 			this.boardState.whitePieces.map(piece => {
// 				if (piece.type === fromPiece) {
// 					if (piece.canMove(to)) {
// 						fromPosition = piece.position;
// 						this.boardState.movePiece(fromPosition, to);
// 					}
// 					return;
// 				}
// 			}) :
// 			this.boardState.blackPieces.map(piece => {
// 				if (piece.type === fromPiece) {
// 					if (piece.canMove(to)) {
// 						fromPosition = piece.position;
// 						this.boardState.movePiece(fromPosition, to);
// 					}
// 					return;
// 				}
// 			});
// 		if (this.isInCheck(this.currentPlayer())) {
// 			this.rollbackMove(fromPosition, fromPiece, to, toPiece);
// 			return false;
// 		}
// 		if (toPiece !== null) {
// 			this.updateCapturedLists(toPiece);
// 		}
// 		const promotion = this.canPromote(to);
// 		if (!promotion) {
// 			const prevCheck = this.currentPlayer() === 0 ?
// 				{ white: { check: false, mate: false } } :
// 				{ black: { check: false, mate: false } };
// 			const newCheck = {
// 				...this.getCheckFlags(this.currentPlayer() === 0 ? 1 : 0)
// 			};
// 			this.setState({
// 				...this.state,
// 				check: {
// 					...newCheck,
// 					...prevCheck
// 				}
// 			});
// 			if(!this.state.check.white.mate && !this.state.check.black.mate) {
// 				this.updateTurn();
// 			}
// 		}
// 		return true;
// 	}
//
// 	rollbackMove(from, fromPiece, to, toPiece) {
// 		// Remove fromPiece from correct PieceSet in order to more easily add pieces using boardState
// 		if(fromPiece.player === 0) {
// 			this.boardState.whitePieces.remove(fromPiece, from);
// 		} else {
// 			this.boardState.blackPieces.remove(fromPiece, from);
// 		}
//
// 		// Move the fromPiece to from
// 		this.boardState.placePiece(fromPiece, from);
//
// 		// Undo and place any captured piece
// 		if(toPiece !== null) {
// 			toPiece.captured = false;
// 			this.boardState.placePiece(toPiece, to);
// 		} else {
// 			this.boardState.board[to[0]][to[1]] = null;
// 		}
// 	}
//
// 	getCheckFlags(player) {
// 		let { check } = this.state;
// 		const newStatus = this.isInCheck(player);
// 		if(player === 0) {
// 			check = {
// 				...check,
// 				white: {
// 					previous: check.white.status,
// 					status: newStatus,
// 					mate: !newStatus ?
// 						false :
// 						this.isInCheckMate(player)
// 				}
// 			}
// 		} else {
// 			check = {
// 				...check,
// 				black: {
// 					previous: check.black.status,
// 					status: newStatus,
// 					mate: !newStatus ?
// 						false :
// 						this.isInCheckMate(player)
// 				}
// 			}
// 		}
// 		return check;
// 	}
//
// 	capturePiece(from, enemy) {
// 		const fromPiece = this.boardState.getPiece(from);
// 		const toPiece = enemy;
// 		let toPosition = null;
// 		this.currentPlayer() === 0 ?
// 			this.boardState.blackPieces.map(piece => {
// 				if (piece.type === toPiece) {
// 					if (fromPiece.canMove(piece.position)) {
// 						toPosition = piece.position.to;
// 						this.boardState.movePiece(from, toPosition);
// 					}
// 					return;
// 				}
// 			}) :
// 			this.boardState.whitePieces.map(piece => {
// 				if (piece.type === toPiece) {
// 					if (fromPiece.canMove(piece.position)) {
// 						toPosition = piece.position.to;
// 						this.boardState.movePiece(from, toPosition);
// 					}
// 					return;
// 				}
// 			});
// 		if (this.isInCheck(this.currentPlayer())) {
// 			this.rollbackMove(from, fromPiece, toPosition, toPiece);
// 			return false;
// 		}
// 		if (toPiece !== null) {
// 			this.updateCapturedLists(toPiece);
// 		}
// 		const promotion = this.canPromote(toPosition);
// 		if (!promotion) {
// 			const prevCheck = this.currentPlayer() === 0 ?
// 				{ white: { check: false, mate: false } } :
// 				{ black: { check: false, mate: false } };
// 			const newCheck = {
// 				...this.getCheckFlags(this.currentPlayer() === 0 ? 1 : 0)
// 			};
// 			this.setState({
// 				...this.state,
// 				check: {
// 					...newCheck,
// 					...prevCheck
// 				}
// 			});
// 			if(!this.state.check.white.mate && !this.state.check.black.mate) {
// 				this.updateTurn();
// 			}
// 		}
// 		return true;
// 	}
//
// 	updateCapturedLists(piece) {
// 		if (piece.isWhite()) {
// 			this.capturedWhitePieces.count++;
// 			this.capturedWhitePieces.pieces[piece.type] = [
// 				...this.capturedWhitePieces.pieces[piece.type],
// 				piece
// 			]
// 		} else {
// 			this.capturedBlackPieces.count++;
// 			this.capturedBlackPieces.pieces[piece.type] = [
// 				...this.capturedBlackPieces.pieces[piece.type],
// 				piece
// 			]
// 		}
// 	}
//
// 	findPawn(typePieces) {
// 		typePieces.map(piece => {
// 			if (piece.type === type) {
// 				if (piece.canSwapOut && piece.position.row === piece.swapRow) {
// 					const { count, pieces } = typePieces.player === 0 ?
// 						this.capturedWhitePieces :
// 						this.capturedBlackPieces;
// 					if (count > 0) {
// 						const pieceTypes = this.getPossiblePromotionArray(piece.position, pieces);
// 						if (pieceTypes.length > 0) {
// 							this.setState({
// 								...this.state,
// 								swapping: piece.position,
// 								swapList: pieceTypes
// 							});
// 							return true;
// 						}
// 					}
// 				}
// 			}
// 		});
// 		return false;
// 	}
//
// 	promotePawn(piece) {
// 		piece.player === 0 ?
// 			this.findPawn(this.boardState.whitePieces) :
// 			this.findPawn(this.boardState.blackPieces);
// 	}
//
// 	canPromote(to) {
// 		const piece = this.boardState.getPiece(to);
// 		if (piece.canSwapOut && to[0] === piece.swapRow) { // Piece is swappable and at a swappble position
// 			const { count, pieces } = piece.player === 0 ?
// 				this.capturedWhitePieces :
// 				this.capturedBlackPieces;
// 			if (count > 0) { // If the player has pieces that have been captured
// 				const pieceTypes = this.getPossiblePromotionArray(to, pieces); // All possible types of pieces that can be swapped in
// 				if (pieceTypes.length > 0) { // Only move forward in the swap procedure if there are pieces that can be swapped in
// 					this.setState({ // Set state to be in the middle of swapping a piece
// 						...this.state,
// 						swapping: to,
// 						swapList: pieceTypes
// 					});
// 					return true;
// 				}
// 			}
// 		}
// 		return false;
// 	}
//
// 	getPossiblePromotionArray(to, pieces) {
// 		const currentPiece = this.boardState.getPiece(to);
// 		const result = Object.entries(pieces)
// 			// Filter out any piece type with no captured pieces and then any that cannot be swapped in
// 			.filter(([_, pieceArr]) => {
// 				if(pieceArr.length > 0 && pieceArr[0].canSwapIn) {
// 					this.boardState.placePiece(pieceArr[0], to);
// 					const causesCheck = this.isInCheck(this.currentPlayer());
// 					return !causesCheck;
// 				}
// 				return false;
// 			})
// 			.map(([_, pieceArr]) => { // For the remaing piece arrays, map each to an object denoting what type of pieces it has and if they are black or not
// 				return {
// 					...pieceArr[0].toObject(),
// 					black: pieceArr[0].isBlack()
// 				}
// 			});
// 		if(this.boardState.getPiece(to) !== currentPiece) {
// 			this.boardState.placePiece(currentPiece, to);
// 		}
// 		return result;
// 	}
//
// 	isInCheck(player, checkCallback=inCheck) {
// 		const { pieces } = player === 0 ?
// 			this.boardState.whitePieces :
// 			this.boardState.blackPieces;
// 		if(!pieces['king']) {
// 			return false;
// 		}
//
// 		for(let pos of pieces['king']) {
// 			if(checkCallback(pos, this.boardState, player)) {
// 				return true;
// 			}
// 		}
//
// 		return false;
// 	}
//
// 	isInCheckMate(player) {
// 		return this.isInCheck(player, inCheckMate);
// 	}
//
// 	getAllPieces() {
// 		const allPieces = [];
// 		this.boardState.board.map(row => {
// 			row.map(piece => {
// 				if (piece || piece.captured === false) {
// 					allPieces.push ( {
// 						player: piece.player === 0 ?
// 							"WHITE" :
// 							"BLACK",
// 						type: piece.type,
// 						captured: false,
// 						position: {row: piece.position.row, col: piece.position.col}
// 					})
// 				}
// 			})
// 		});
// 		this.capturedWhitePieces.map(type => {
// 			type.map(piece => {
// 				allPieces.push ( {
// 					player: "WHITE",
// 					type: piece.type,
// 					captured: true,
// 					position: null
// 				})
// 			})
// 		});
// 		this.capturedBlackPieces.map(type => {
// 			type.map(piece => {
// 				allPieces.push ( {
// 					player: "BLACK",
// 					type: piece.type,
// 					captured: true,
// 					position: null
// 				})
// 			})
// 		});
// 		return allPieces;
// 	}
//
// 	render() {
// 		return {
// 			turn: this.state.turn,
// 			pieces: this.getAllPieces(),
// 			checkStatusWhite: {
// 				status: this.state.check.white.status,
// 				mate: this.state.check.white.mate
// 			},
// 			checkStatusBlack: {
// 				status: this.state.check.black.status,
// 				mate: this.state.check.white.mate
// 			}
// 		}
// 	}
// }
