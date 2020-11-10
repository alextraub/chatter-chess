import { createPiece } from '../Piece'
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

		for(let { type, player, position } of pieces) {
			this.board[position[0]][position[1]] = createPiece(type, this, player);
		}

		this.whitePieces = new PieceSet(0, this.board);
		this.blackPieces = new PieceSet(1, this.board);

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
		if (this.board[to1][to2] != null) {
			this.board[to1][to2].captured = true;                    //tell the to peice its been captured
			this.whitePieces.remove(this.board[to1][to2], [to1, to2]);
			this.blackPieces.remove(this.board[to1][to2], [to1, to2]);
		}
		this.board[to1][to2] = this.board[from1][from2];                  //move the peice to its new tile in the memory array
		this.whitePieces.update(this.board[to1][to2], [from1, from2], [to1, to2]);
		this.blackPieces.update(this.board[to1][to2], [from1, from2], [to1, to2]);
		this.board[from1][from2] = null;                             //null the tile left

		return true;
	}

	placePiece(piece, [row, col])						//put a piece in a spicific position
	{
		if(this.board[row][col] !== null) {
			if(this.board[row][col].isWhite()) {
				this.whitePieces.remove(this.board[row][col], [row, col]);
			} else {
				this.blackPieces.remove(this.board[row][col], [row, col]);
			}
		}

		this.board[row][col] = piece;
		if(piece.player === 0) {
			this.whitePieces.add(piece, [row, col]);
		} else {
			this.blackPieces.add(piece, [row, col]);
		}
		return 0;
	}

	returnBoardState()                 //return the array containing a copy of the Board State
	{
		return this.board;
	}

	getBoard() {
		return this.board.map(row => {
			return row.map(piece => {
				if(piece === null) {
					return null;
				} else {
					return piece.toObject();
				}
			})
		});
	}
}
