import Rook from './';
import DPiece from '../DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState');

const positionUtils = require('../../utils/boardPosition');
jest.mock('../../utils/boardPosition.js');

beforeEach(() =>
{
	BoardState.mockClear();
});

const boardState = new BoardState();
const whiteRook = new Rook(boardState, 0);
const blackRook = new Rook(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () =>
{
	boardState.getPiece.mockReturnValue(null);
}

test('Rook can move right', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackRook.canMove([1, 0], [1, 1], 1)).toBe(true);
});

test('Rook can move down', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([0, 0], [1, 0], 1)).toBe(true);
	expect(blackRook.canMove([0, 1], [1, 1])).toBe(true);
});

test('Rook and move left', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([0, 1], [0, 0], 0)).toBe(true);
	expect(blackRook.canMove([1, 1], [1, 0])).toBe(true);
});

test('Rook can move up', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([1, 0], [0, 0])).toBe(true);
	expect(blackRook.canMove([1, 1], [1, 0], 0)).toBe(true);
});

test('Rook can move to a square with a enemy piece', () =>
{
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);

	expect(whiteRook.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackRook.canMove([0, 0], [0, 1])).toBe(true);
});

test('Rook can NOT move to a square with an allied piece', () =>
{
	boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);

	expect(whiteRook.canMove([0, 0], [0, 1])).toBe(false);
	expect(blackRook.canMove([0, 0], [0, 1])).toBe(false);
});

test('Rook can NOT move to the same space it is on', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([1, 1], [1, 1])).toBe(false);
});

test('Rook can NOT move Over pieces', () =>
{
	boardState.getPiece.mockReturnValue(blackPiece);
	expect(whiteRook.canMove([0, 0], [0, 2])).toBe(false);

	boardState.getPiece.mockReturnValue(whitePiece);
	expect(blackRook.canMove([0, 0], [0, 2])).toBe(false);

	positionUtils.boardPositionToString.mockReturnValue('A1');
	expect(blackRook.canMove([0, 0], [0, 2], 1)).toBe('There is a piece at A1 blocking your rook\'s path');
});

test('Rookcs can NOT move diagonally up and right', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([0,1], [2,3])).toBe(false);
	expect(blackRook.canMove([0,1], [2,3], 1)).toEqual('A rook can only move vertically or horizontally');
});

test('Rookcs can NOT move diagonally up and left', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([0,1], [2,0], 1)).toEqual('A rook can only move vertically or horizontally');
	expect(blackRook.canMove([0,1], [2,0])).toBe(false);
});

test('Rookcs can NOT move diagonally down and right', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([2,1], [1,2])).toBe(false);
	expect(blackRook.canMove([2,1], [1,2], 1)).toEqual('A rook can only move vertically or horizontally');
});

test('Rookcs can NOT move diagonally down and left', () =>
{
	moveToEmptySquare();

	expect(whiteRook.canMove([2,2], [0,0], 1)).toEqual('A rook can only move vertically or horizontally');
	expect(blackRook.canMove([2,2], [0,0])).toBe(false);
});

test('Rooks have type of "rook"', () => {
	expect(whiteRook.type).toBe('rook');
	expect(blackRook.type).toBe('rook');
});

test('Rooks cannot be swapped out', () => {
	expect(whiteRook.canSwapOut).toBe(false);
	expect(blackRook.canSwapOut).toBe(false);
});

test('Rooks can be swapped in', () => {
	expect(whiteRook.canSwapIn).toBe(true);
	expect(blackRook.canSwapIn).toBe(true);
});

test('Rooks throw an error if checking their swapRow property', () => {
	expect(() => whiteRook.swapRow).toThrow(EvalError);
	expect(() => blackRook.swapRow).toThrow(EvalError);
});
