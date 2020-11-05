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
	for(let r = 0; r < 8; ++r)
	{
		for(let c = 0; c < 8; ++c)
		{
			boardstate.board[r][c] = null;
		}
	}
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

test('it can tell when the king is not in check mate', () =>
{
	emptyBoard(boardState);
	boardState.placePiece(whiteKing, [7, 4]);
	boardState.placePiece(blackRook, [0, 4]);

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
	stdBoardState.movePiece([6, 5], [5,5]);
	stdBoardState.movePiece([1,4], [3,4]);
	stdBoardState.movePiece([6,6],[4,6]);
	stdBoardState.movePiece([0,3], [4,7]);
	const wKing = [7,4];
	expect(inCheck(wKing, stdBoardState, 0)).toBe(true);
	expect(inCheckMate(wKing, stdBoardState, 0)).toBe(true);
});
