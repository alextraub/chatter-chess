import King from './';
import BoardState from '../../BoardState';
import DPiece from '../../../__mocks__/DPiece';

jest.mock('../../BoardState.js');

beforeEach(() => {
	BoardState.mockClear();
});

const boardState = new BoardState();
const whiteKing = new King(boardState, 0);
const blackKing = new King(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => {
	boardState.getPiece.mockReturnValue(null);
};

test('King can move right one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [0, 4])).toBe(true);
	expect(blackKing.canMove([7, 4], [7, 5])).toBe(true);
});

test('King can move left one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [0, 2])).toBe(true);
	expect(blackKing.canMove([7, 4], [7, 3])).toBe(true);
});

test('King cannot move right more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [0, 5])).toBe(false);
	expect(blackKing.canMove([7, 4], [7, 6])).toBe(false);
});

test('King cannot move left more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [0, 1])).toBe(false);
	expect(blackKing.canMove([7, 4], [7, 2])).toBe(false);
});

test('King can move up one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [1, 3])).toBe(true);
	expect(blackKing.canMove([7, 4], [6, 4])).toBe(true);
});

test('King can move down one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([1, 3], [0, 3])).toBe(true);
	expect(blackKing.canMove([6, 4], [7, 4])).toBe(true);
});

test('King cannot move up more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [2, 3])).toBe(false);
	expect(blackKing.canMove([7, 4], [5, 4])).toBe(false);
});

test('King cannot move down more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([2, 3], [0, 3])).toBe(false);
	expect(blackKing.canMove([5, 4], [7, 4])).toBe(false);
});

test('King can move diagonal right up one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [1, 4])).toBe(true);
	expect(blackKing.canMove([7, 4], [6, 3])).toBe(true);
});

test('King can move diagonal left up one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [1, 2])).toBe(true);
	expect(blackKing.canMove([7, 4], [6, 5])).toBe(true);
});

test('King can move diagonal right down one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([1, 3], [0, 4])).toBe(true);
	expect(blackKing.canMove([6, 4], [7, 3])).toBe(true);
});

test('King can move diagonal left down one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([1, 3], [0, 2])).toBe(true);
	expect(blackKing.canMove([6, 4], [7, 5])).toBe(true);
});

test('King cannot move diagonal right up more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [2, 5])).toBe(false);
	expect(blackKing.canMove([7, 4], [5, 2])).toBe(false);
});

test('King cannot move diagonal left up more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [2, 1])).toBe(false);
	expect(blackKing.canMove([7, 4], [5, 6])).toBe(false);
});

test('King cannot move diagonal right down more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([2, 3], [0, 5])).toBe(false);
	expect(blackKing.canMove([5, 4], [7, 2])).toBe(false);
});

test('King cannot move diagonal left down more than one space', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([2, 3], [0, 1])).toBe(false);
	expect(blackKing.canMove([5, 4], [7, 6])).toBe(false);
});

test('King can move to a square with an enemy piece', () => {
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);
	expect(whiteKing.canMove([0, 3], [1, 3])).toBe(true);
	expect(blackKing.canMove([0, 3], [1, 3])).toBe(true);
});

test('Kings cannot move to a square with a piece belonging to the same player', () => {
	boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);
	expect(whiteKing.canMove([0, 3], [1, 3])).toBe(false);
	expect(blackKing.canMove([0, 3], [1, 3])).toBe(false);
});

test('Kings cannot move to the same position', () => {
	moveToEmptySquare();
	expect(whiteKing.canMove([0, 3], [0, 3])).toBe(false);
});
