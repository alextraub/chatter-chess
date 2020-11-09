import BoardState from '../BoardState'
import {inCheck, inCheckMate} from './'
import King from '../Piece/King'
import Rook from '../Piece/Rook'
//jest.mock('../../Game/BoardState')


const boardState = new BoardState();
const whiteKing = new King(boardState, 0);
const blackKing = new King(boardState, 1);
const whiteRook = new Rook(boardState, 0);
const blackRook = new Rook(boardState, 1);
function emptyBoard(boardstate)
{
	boardstate.whitePieces.getPieces().forEach(([r,c]) => {
		const piece = boardstate.getPiece([r,c]);
		boardstate.whitePieces.remove(piece, [r,c]);
		boardstate.board[r][c] = null;
	});

	boardstate.blackPieces.getPieces().forEach(([r,c]) => {
		const piece = boardstate.getPiece([r,c]);
		boardstate.blackPieces.remove(piece, [r,c]);
		boardstate.board[r][c] = null;
	});
	// for(let r = 0; r < 8; ++r)
	// {
	// 	for(let c = 0; c < 8; ++c)
	// 	{
	// 		const piece = boardstate.board[r][c];

	// 		boardstate.board[r][c] = null;
	// 	}
	// }
}

test('it can tell when the King isnt in check', () =>
{
	emptyBoard(boardState);
	boardState.placePiece(blackKing, [7, 4]);
	boardState.placePiece(whiteKing, [0, 3]);

	expect(inCheck([7, 4], blackKing.boardState, blackKing.player)).toBe(false);
	expect(inCheck([0, 3], whiteKing.boardState, whiteKing.player)).toBe(false);
})

test('it can tell when the King is in check', () =>
{
	emptyBoard(boardState);
	boardState.placePiece(blackKing, [7, 4]);
	boardState.placePiece(whiteRook, [0, 4]);

	expect(inCheck([7, 4], blackKing.boardState, blackKing.player)).toBe(true);
})

test('it can tell when the king is in check but not in check mate', () =>
{
	emptyBoard(boardState);
	boardState.placePiece(whiteKing, [7, 4]);
	boardState.placePiece(blackRook, [0, 4]);

	expect(inCheck([7, 4], whiteKing.boardState, whiteKing.player)).toBe(true);
	expect(inCheckMate([7, 4], whiteKing.boardState, whiteKing.player)).toBe(false);
})

test('it can tell when the king is in check mate', () =>
{
	emptyBoard(boardState);
	boardState.placePiece(blackKing, [7, 4]);

	boardState.placePiece(whiteRook, [0, 3]);
	boardState.placePiece(whiteRook, [0, 4]);
	boardState.placePiece(whiteRook, [0, 5]);

	expect(inCheckMate([7, 4], blackKing.boardState, blackKing.player)).toBe(true);
})

test('Fool\'s mate', () => {
	const stdBoardState = new BoardState();
	stdBoardState.movePiece([6, 5], [5, 5]);
	stdBoardState.movePiece([1, 4], [3, 4]);
	stdBoardState.movePiece([6, 6], [4, 6]);
	stdBoardState.movePiece([0, 3], [4, 7]);
	const wKing = [7,4];
	expect(inCheck(wKing, stdBoardState, 0)).toBe(true);
	expect(inCheckMate(wKing, stdBoardState, 0)).toBe(true);
});


test('Capture piece to get out of check', () => {
	const stdBoardState = new BoardState();
	stdBoardState.movePiece([6, 7], [4, 7]);
	stdBoardState.movePiece([1, 4], [3, 4]);
	stdBoardState.movePiece([6, 5], [5, 5]);
	stdBoardState.movePiece([0, 3], [4, 7]);
	const wKing = [7,4];
	// expect(inCheck(wKing, stdBoardState, 0)).toBe(true);
	expect(inCheckMate(wKing, stdBoardState, 0)).toBe(false);
});

test('Block piece to get out of check', () => {
	const stdBoardState = new BoardState();
	stdBoardState.movePiece([1, 5], [2, 5]);
	stdBoardState.movePiece([6, 5], [4, 5]);
	stdBoardState.movePiece([7, 3], [3, 7]);
	const bKing = [0,4];
	expect(inCheck(bKing, stdBoardState, 1)).toBe(true);
	expect(inCheckMate(bKing, stdBoardState, 1)).toBe(false);
});

const removePiece = ([r,c], bState) => {
	const p = bState.getPiece([r,c]);
	if(p === null) {
		return;
	} else {
		if(p.player === 0) {
			bState.whitePieces.remove(p, [r,c]);
		} else {
			bState.blackPieces.remove(p, [r,c]);
		}
		bState.board[r][c] = null;
	}
}

const changePosition = ([fR,fC], [tR, tC], bState) => {
	const p = bState.getPiece([fR, fC]);
	if(p === null) {
		return;
	} else {
		if(p.player === 0) {
			bState.whitePieces.update(p, [fR,fC], [tR,tC]);
		} else {
			bState.blackPieces.update(p, [fR,fC], [tR,tC]);
		}

		bState.board[fR][fC] = null;
		bState.board[tR][tC] = p;
	}
}

test('Correctly identifies move that gets king out of check', () => {
	const bState = new BoardState();
	removePiece([7,5], bState);
	removePiece([0,5], bState);
	removePiece([6,5], bState);
	removePiece([6,6], bState);
	removePiece([6,7], bState);
	removePiece([1,5], bState);
	removePiece([1,6], bState);
	removePiece([1,7], bState);


	changePosition([1,0], [3,0], bState);
	changePosition([0,0], [2,0], bState);
	changePosition([1,3], [3,2], bState);
	changePosition([1,4], [3,1], bState);
	changePosition([1,1], [2,1], bState);
	changePosition([7,7], [0,5], bState);
	changePosition([0,1], [1,3], bState);
	changePosition([0,3], [5,5], bState);
	changePosition([7,6], [0,3], bState);

	expect(inCheck([0,4], bState, 1)).toBe(true);
	expect(inCheckMate([0,4], bState, 1)).toBe(false);


	removePiece([0,5], bState);
	changePosition([5,5], [0,5], bState);
	expect(inCheck([0,4], bState, 1)).toBe(false);
});