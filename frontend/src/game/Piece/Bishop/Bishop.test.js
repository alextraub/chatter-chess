import Bishop from './';
import DPiece from '../../../__mocks__/DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState');

const positionUtils = require('../../utils/boardPosition');
jest.mock('../../utils/boardPosition.js');

beforeEach(() =>
{
	BoardState.mockClear();
});

const boardState = new BoardState();
const whiteBishop = new Bishop(boardState, 0);
const blackBishop = new Bishop(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () =>
{
	boardState.getPiece.mockReturnValue(null);
}

test('Bishop can move diagonal down right', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([3, 3], [4, 4], 0)).toBe(true);
	expect(blackBishop.canMove([5, 5], [6, 6], 1)).toBe(true);
});

test('Bishop can move diagonal up right', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([3, 3], [2, 4], 0)).toBe(true);
	expect(blackBishop.canMove([1, 1], [0, 2])).toBe(true);
});

test('Bishop can move diagonal down left', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([2, 2], [3, 1])).toBe(true);
	expect(blackBishop.canMove([3, 3], [4, 2], 0)).toBe(true);
});

test('Bishop can move diagonal up left', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([2, 2], [1, 1], 1)).toBe(true);
	expect(blackBishop.canMove([3, 3], [2, 2])).toBe(true);
});

test('Bishop can move to a square with an enemy piece', () =>
{
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);

	expect(whiteBishop.canMove([0, 0], [1, 1], 0)).toBe(true);
	expect(blackBishop.canMove([0, 0], [1, 1], 1)).toBe(true);
});

test('Bishop can NOT move to a square with an allied piece', () =>
{
	boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);

	expect(whiteBishop.canMove([0, 0], [1, 1])).toBe(false);
	expect(blackBishop.canMove([0, 0], [1, 1], 0)).toBe(false);
});

test('Bishop can NOT move to the same space it is on', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([1, 1], [1, 1], 0)).toBe(false);
});

test('Bishop can NOT move OVER pieces', () =>
{
	boardState.getPiece.mockReturnValue(blackPiece);
	expect(whiteBishop.canMove([0, 0], [2, 2])).toBe(false);

	boardState.getPiece.mockReturnValue(whitePiece);
	expect(blackBishop.canMove([0, 0], [2, 2], 0)).toBe(false);
	positionUtils.boardPositionToString.mockReturnValue('B2')
	expect(blackBishop.canMove([0, 0], [2, 2], 1)).toEqual('There is a piece at B2 blocking your bishop\'s path');
});

test('Bishop can NOT move vertically', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([0,0], [2,0], 1)).toEqual('A bishop can only move diagonally');
	expect(blackBishop.canMove([0,0], [2,0])).toBe(false);
});

test('Bishop can NOT move horizontally', () =>
{
	moveToEmptySquare();

	expect(whiteBishop.canMove([0,0], [0,3], 0)).toBe(false);
	expect(blackBishop.canMove([0,0], [0,3], 1)).toEqual('A bishop can only move diagonally');
});

test('Bishops have type of "bishop"', () => {
	expect(whiteBishop.type).toBe('bishop');
	expect(blackBishop.type).toBe('bishop');
});

test('Bishops cannot be swapped out', () => {
	expect(whiteBishop.canSwapOut).toBe(false);
	expect(blackBishop.canSwapOut).toBe(false);
});

test('Bishops can be swapped in', () => {
	expect(whiteBishop.canSwapIn).toBe(true);
	expect(blackBishop.canSwapIn).toBe(true);
});
