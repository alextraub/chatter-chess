import Pawn from './';
import DPiece from '../DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState');

const positionUtils = require('../../utils/boardPosition');
jest.mock('../../utils/boardPosition.js');

beforeEach(() => {
	BoardState.mockClear();
});

const boardState = new BoardState();
const whitePawn = new Pawn(boardState, 0);
const blackPawn = new Pawn(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => {
	boardState.getPiece.mockReturnValue(null);
}

test('pawn can move up 1 square if it is empty', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([4, 4], [3, 4], 1)).toBe(true);
	expect(blackPawn.canMove([5, 3], [6, 3])).toBe(true);
});

test('pawn cannot move up 2 square if they have already moved', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([3, 0], [1, 0], 0)).toBe(false);
	expect(blackPawn.canMove([4, 3], [6, 3], 1)).toEqual('A pawn can only move forward 2 squares if it hasn\'t moved yet');
});

test('pawn cannot move up more than 2 squares', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([6,2], [0,2], 1)).toEqual('A pawn cannot move 6 squares forward');
	expect(blackPawn.canMove([3,4], [6,4], 0)).toBe(false);
});

test('pawn can move to a square with an enemy piece diagonally 1 square forward', () => {
	boardState.getPiece.mockReturnValue(blackPiece);
	expect(whitePawn.canMove([1, 1], [0, 0])).toBe(true);
	boardState.getPiece.mockReturnValue(whitePiece);
	expect(blackPawn.canMove([4, 1], [5, 2])).toBe(true);
});

test('Pawn cannot move to a square with a piece belonging to the same player', () => {
	boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);
	expect(whitePawn.canMove([3, 1], [2, 1])).toBe(false);
	positionUtils.boardPositionToString.mockReturnValue('D2');
	expect(blackPawn.canMove([1,1], [3,1], 1)).toEqual('You already have a piece at D2');
});

test('pawn cannot move horizontally', () => {
	moveToEmptySquare();
	expect(blackPawn.canMove([0, 0], [0, 1], 1)).toBe('A pawn cannot move horizontally');
	expect(whitePawn.canMove([0, 5], [0, 1])).toBe(false);
});

test('Pawn cannot move to the same position', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([0, 0], [0, 0])).toBe(false);
});

test('Pawn cannot move backwards vertically', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([2, 1], [3, 1])).toBe(false);
	expect(blackPawn.canMove([5, 2], [4, 2], 1)).toEqual('A pawn cannot move backwards');
});

test('Pawn cannot move backwards diagonally', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([2, 0], [3, 1], 1)).toEqual('A pawn cannot move backwards');
	expect(blackPawn.canMove([4, 2], [3, 1])).toBe(false);
});

test('Pawns have type of "pawn"', () => {
	expect(whitePawn.type).toBe('pawn');
	expect(blackPawn.type).toBe('pawn');
});

test('Pawns can move forward 2 squares if they have not moved', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([6,2], [4,2])).toBe(true);
	expect(blackPawn.canMove([1,3], [3,3], 1)).toBe(true);
})

test('Pawns cannot move 2 spaces forward if a piece is in front of them', () => {
	positionUtils.boardPositionToString
		.mockReturnValueOnce('F8')
		.mockReturnValue('C3');

	boardState.getPiece.mockReturnValueOnce(null).mockReturnValue(whitePiece);
	expect(whitePawn.canMove([6,0], [4,0])).toBe(false);
	boardState.getPiece.mockReturnValueOnce(null).mockReturnValue(blackPiece);
	expect(whitePawn.canMove([6,7], [4,7], 1)).toEqual('There is a piece at F8 blocking your pawn\'s path');
	boardState.getPiece.mockReturnValueOnce(null).mockReturnValue(whitePiece);
	expect(blackPawn.canMove([1,2], [3,2], 1)).toEqual('There is a piece at C3 blocking your pawn\'s path');
	boardState.getPiece.mockReturnValueOnce(null).mockReturnValue(blackPiece);
	expect(blackPawn.canMove([1,4], [3,4])).toBe(false);
});

test('Pawns cannot capture pieces 1 square diagonally in front of them', () => {
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);
	expect(whitePawn.canMove([3,3], [2,3], 0)).toBe(false);
	expect(blackPawn.canMove([3,2], [4,2], 1)).toEqual('A pawn can only capture a piece 1 square diagonally in front of it');
});

test('Pawsn cannot capture pieces 2 squares in front of them', () => {
	boardState.getPiece
		.mockReturnValueOnce(blackPiece)
		.mockReturnValueOnce(null)
		.mockReturnValueOnce(blackPiece)
		.mockReturnValue(null);
	expect(whitePawn.canMove([6,3], [4,3], 1)).toEqual('A pawn can only capture a piece 1 square diagonally in front of it');
	boardState.getPiece.mockReturnValue(whitePiece);
	expect(blackPawn.canMove([1,2], [3,2])).toBe(false);

});

test('Pawns cannot capture pieces more than 1 square diagonally in front of them', () => {
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(null);
	expect(whitePawn.canMove([4,2], [2,4])).toBe(false);

	boardState.getPiece.mockReturnValue(whitePiece);
	expect(blackPawn.canMove([1,2], [3,0], 1)).toEqual('A pawn can only capture a piece 1 square diagonally in front of it');
});

test('Pawns cannot move diagonally', () => {
	moveToEmptySquare();
	expect(whitePawn.canMove([4,2], [2,4], 1)).toEqual('A pawn cannot move diagonally');

	positionUtils.boardPositionToString.mockReturnValue('C2');
	expect(blackPawn.canMove([1,2], [2,1], 1)).toEqual('There is no piece to capture at C2');
});

test('Pawns cannot move like a knight', () => {
	moveToEmptySquare();

	expect(whitePawn.canMove([6, 4], [4, 3])).toBe(false);
	expect(blackPawn.canMove([3,4], [5,5], 1)).toEqual(`A pawn can only move:\n`
	+ '1. Capture pieces 1 square diagonally in front of it\n'
	+ '2. 2 squares forward if it hasn\'t moved yet\n'
	+ '3. 1 square forward');
});


test('Pawns can be swapped out', () => {
	expect(whitePawn.canSwapOut).toBe(true);
	expect(blackPawn.canSwapOut).toBe(true);
});

test('Pawns cannot be swapped in', () => {
	expect(whitePawn.canSwapIn).toBe(false);
	expect(blackPawn.canSwapIn).toBe(false);
});

test('White pawns have a swapRow of 0', () => {
	expect(() => whitePawn.swapRow).not.toThrow();
	expect(whitePawn.swapRow).toBe(0);
});

test('Black pawns have a swapRow of 7', () => {
	expect(() => blackPawn.swapRow).not.toThrow();
	expect(blackPawn.swapRow).toBe(7);
});
