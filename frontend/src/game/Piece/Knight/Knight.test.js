import Knight from './';
import BoardState, { mockGetPiece } from '../../../__mocks__/boardStateMock';
import DPiece from '../../../__mocks__/DPiece';

beforeEach(() => {
	BoardState.mockClear();
	mockGetPiece.mockClear();
});

const boardState = new BoardState();
const whiteKnight = new Knight(boardState, 0);
const blackKnight = new Knight(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => {
	mockGetPiece.mockReturnValue(null);
}

test('Knight can move up 2 squares and right 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([0, 2], [2, 3])).toBe(true);
	expect(blackKnight.canMove([3, 4], [5, 5])).toBe(true);
});

test('Knight can move up 2 squares and left 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([1, 2], [3, 1])).toBe(true);
	expect(blackKnight.canMove([5, 3], [7, 2])).toBe(true);
});

test('Knight can move down 2 squares and right 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([6, 6], [4, 7])).toBe(true);
	expect(blackKnight.canMove([2, 4], [0, 5])).toBe(true);
});

test('Knight can move down 2 squares and left 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([4, 2], [2, 1])).toBe(true);
	expect(blackKnight.canMove([5, 1], [3, 0])).toBe(true);
});

test('Knight can move right 2 squares and up 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([0, 0], [1, 2])).toBe(true);
	expect(blackKnight.canMove([3, 4], [4, 6])).toBe(true);
});

test('Knight can move right 2 squares and down 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([3, 2], [2, 4])).toBe(true);
	expect(blackKnight.canMove([5, 5], [4, 7])).toBe(true);
});

test('Knight can move left 2 squares and up 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([2, 2], [3, 0])).toBe(true);
	expect(blackKnight.canMove([5, 3], [6, 1])).toBe(true);
});

test('Knight can move right 2 squares and down 1 square', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([4, 4], [3, 2])).toBe(true);
	expect(blackKnight.canMove([1, 5], [0, 3])).toBe(true);
});

test('Knights can move to a square with an enemy piece', () => {
	mockGetPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);

	expect(whiteKnight.canMove([0,0], [2,1])).toBe(true);
	expect(blackKnight.canMove([0,0], [2,1])).toBe(true);
});

test('Knights cannot move to a square with a piece belonging to the same player', () => {
	mockGetPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);

	expect(whiteKnight.canMove([2,3], [0,1])).toBe(false);
	expect(blackKnight.canMove([2,3], [0,1])).toBe(false);
});

test('Knights cannot move to the same position', () => {
	moveToEmptySquare();

	expect(whiteKnight.canMove([0,0], [0,0])).toBe(false);
});

test('Knights cannot move horizontally', () => {
	moveToEmptySquare();

	expect(blackKnight.canMove([0,0], [0, 2])).toBe(false);
	expect(whiteKnight.canMove([0,5], [0,1])).toBe(false);
});

test('Knights cannot move vertically', () => {
	moveToEmptySquare();

	expect(blackKnight.canMove([0,0], [1,0])).toBe(false);
	expect(blackKnight.canMove([6, 4], [1, 4])).toBe(false);
});

test('Knights cannot move diagonally', () => {
	moveToEmptySquare();

	expect(blackKnight.canMove([0,0], [7,7])).toBe(false);
	expect(whiteKnight.canMove([7,7], [0,0])).toBe(false);
});