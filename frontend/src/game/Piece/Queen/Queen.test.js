import Queen from './';
import BoardState from '../../BoardState';
import DPiece from '../../../__mocks__/DPiece';

jest.mock('../../BoardState.js');

beforeEach(() => {
	BoardState.mockClear();
	BoardState.mockClear();
});

const boardState = new BoardState();
const whiteQueen = new Queen(boardState, 0);
const blackQueen = new Queen(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => {
	boardState.getPiece.mockReturnValue(null);
};

test('Queen can move up more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [3, 4])).toBe(true);
	expect(blackQueen.canMove([7, 3], [4, 3])).toBe(true);
});

test('Queen can move down more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([3, 4], [0, 4])).toBe(true);
	expect(blackQueen.canMove([4, 3], [7, 3])).toBe(true);
});

test('Queen can move up one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [1, 4])).toBe(true);
	expect(blackQueen.canMove([7, 3], [6, 3])).toBe(true);
});

test('Queen can move down one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([3, 4], [2, 4])).toBe(true);
	expect(blackQueen.canMove([4, 3], [5, 3])).toBe(true);
});

test('Queen can move right more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [0, 7])).toBe(true);
	expect(blackQueen.canMove([7, 3], [7, 0])).toBe(true);
});

test('Queen can move left more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [0, 0])).toBe(true);
	expect(blackQueen.canMove([7, 3], [7, 7])).toBe(true);
});

test('Queen can move right one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [0, 5])).toBe(true);
	expect(blackQueen.canMove([7, 3], [7, 2])).toBe(true);
});

test('Queen can move left one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [0, 3])).toBe(true);
	expect(blackQueen.canMove([7, 3], [7, 4])).toBe(true);
});

test('Queen can move diagonal up right more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [3, 7])).toBe(true);
	expect(blackQueen.canMove([7, 3], [4, 0])).toBe(true);
});

test('Queen can move diagonal up left more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [3, 1])).toBe(true);
	expect(blackQueen.canMove([7, 3], [4, 6])).toBe(true);
});

test('Queen can move diagonal up right one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [1, 5])).toBe(true);
	expect(blackQueen.canMove([7, 3], [6, 2])).toBe(true);
});

test('Queen can move diagonal up left one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [1, 3])).toBe(true);
	expect(blackQueen.canMove([7, 3], [6, 4])).toBe(true);
});

test('Queen can move diagonal down right more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([3, 4], [0, 7])).toBe(true);
	expect(blackQueen.canMove([4, 3], [7, 0])).toBe(true);
});

test('Queen can move diagonal down left more than one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([3, 4], [0, 1])).toBe(true);
	expect(blackQueen.canMove([4, 3], [7, 6])).toBe(true);
});

test('Queen can move diagonal down right one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([3, 4], [2, 5])).toBe(true);
	expect(blackQueen.canMove([4, 3], [5, 2])).toBe(true);
});

test('Queen can move diagonal down left one space', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([3, 4], [2, 3])).toBe(true);
	expect(blackQueen.canMove([4, 3], [5, 4])).toBe(true);
});

test('Queen cannot move like a Knight', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [2, 5])).toBe(false);
	expect(blackQueen.canMove([7, 3], [5, 2])).toBe(false);
});

test('Queen cannot move like a Knight #2', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [1, 6])).toBe(false);
	expect(blackQueen.canMove([7, 3], [6, 1])).toBe(false);
});

test('Queen cannot move like a Knight #3', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [1, 2])).toBe(false);
	expect(blackQueen.canMove([7, 3], [6, 5])).toBe(false);
});

test('Queen can move to a square with an enemy piece', () => {
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);
	expect(whiteQueen.canMove([0, 4], [1, 4])).toBe(true);
	expect(blackQueen.canMove([0, 4], [1, 4])).toBe(true);
});

test('Queens cannot move to a square with a piece belonging to the same player', () => {
	boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);
	expect(whiteQueen.canMove([0, 4], [3, 4])).toBe(false);
	expect(blackQueen.canMove([0, 4], [3, 4])).toBe(false);
});

test('Queens cannot move to the same position', () => {
	moveToEmptySquare();
	expect(whiteQueen.canMove([0, 4], [0, 4])).toBe(false);
});

test('Queens have type of "queen"', () => {
	expect(whiteQueen.type).toBe('queen');
	expect(blackQueen.type).toBe('queen');
});
