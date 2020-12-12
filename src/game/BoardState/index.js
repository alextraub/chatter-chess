import Piece from '../Piece';
import { createPiece } from '../utils/pieceUtils';
import PieceSet from '../PieceSet';
import StandardBoard from './boards/standardGame';

/* This file stores the positions of all current peices on the board
and can return what piece is on a position on the board, all current
board square values, and can change vaules if peices move of change type.*/
export default class BoardState {
	board
	whitePieces
	blackPieces

	constructor(pieces=StandardBoard)                                         //create board
	{
		this.board = [
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null]
		];

		for(let piece of pieces) {
			if(piece.position === null) {
				continue;
			}
			const p = createPiece(piece);
			p.boardState = this;
			this.board[piece.position['row']][piece.position['col']] = p;
		}

		this.whitePieces = new PieceSet('WHITE', pieces);
		this.blackPieces = new PieceSet('BLACK', pieces);

		this.getPiece = this.getPiece.bind(this);
		this.movePiece = this.movePiece.bind(this);
		this.returnBoardState = this.returnBoardState.bind(this);
		this.placePiece = this.placePiece.bind(this);
		this.getBoard = this.getBoard.bind(this);
	}

	getPiece([row, col])                              //Returns what peice is stored on each tile
	{
		const piece = this.board[row][col];
		return piece;
	}

	movePiece([from1, from2], [to1, to2])             //moves peices on the board, returns what was "taken"
	{
		if (this.board[to1][to2] !== null) {
			const qPiece = Piece.asQueryObject(this.board[to1][to2], [to1, to2]);
			if(this.board[to1][to2].isWhite()) {
				this.whitePieces.remove(qPiece);
			} else {
				this.blackPieces.remove(qPiece);
			}
			this.board[to1][to2].captured = true;                   //tell the to peice its been captured
		}

		const qPiece1 = Piece.asQueryObject(this.board[from1][from2], [from1, from2]);
		const qPiece2 = Piece.asQueryObject(this.board[from1][from2], [to1, to2]);
		if(this.board[from1][from2].isWhite()) {
			this.whitePieces.update(qPiece1, qPiece2);
		} else {
			this.blackPieces.update(qPiece1, qPiece2);
		}
		this.board[to1][to2] = this.board[from1][from2];                //move the peice to its new tile in the memory array
		this.board[from1][from2] = null;                             //null the tile left

		return true;
	}

	placePiece(piece, [row, col])						//put a piece in a spicific position
	{
		if(this.board[row][col] !== null) {
			const qPiece = Piece.asQueryObject(this.board[row][col], [row, col]);
			if(this.board[row][col].isWhite()) {
				this.whitePieces.remove(qPiece);
			} else {
				this.blackPieces.remove(qPiece);
			}
		}

		this.board[row][col] = piece;
		const qPiece = Piece.asQueryObject(piece, [row, col]);
		if(piece.player === 0) {
			this.whitePieces.add(qPiece);
		} else {
			this.blackPieces.add(qPiece);
		}
		piece.boardState = this;
		return 0;
	}

	returnBoardState()                 //return the array containing a copy of the Board State
	{
		return this.board;
	}

	getBoard() {
		return this.board.map((row, r) => {
			return row.map((piece, c) => {
				if(piece === null) {
					return null;
				} else {
					return Piece.asQueryObject(piece, [r,c]);
				}
			})
		});
	}

	get pieces() {
		const result = [];
		for(let r=0; r<8; r++) {
			for(let c=0; c<8; c++) {
				if(this.board[r][c] !== null) {
					result.push(Piece.asQueryObject(this.board[r][c], [r,c]))
				}
			}
		}

		return result;
	}
}
