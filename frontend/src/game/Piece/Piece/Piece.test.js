import Piece from './';
import DPiece from '../../../__mocks__/DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState.js')

const positionUtils = require('../../utils/boardPosition');
jest.mock('../../utils/boardPosition');

beforeEach(() => {
	BoardState.mockClear();
});

const boardState = new BoardState();

/* Abstract class tests */
test('Piece class cannot be directly instatuated', () => {
	expect(() => new Piece(boardState)).toThrow('Piece is abstract and cannot be instantiated');
});
test('Classes derived from Piece can be instantiated', () => {
	expect(() => new DPiece(boardState, 0)).not.toThrow('Piece is abstract and cannot be instantiated');
});

/* Constructor arguments */
test('Piece constructor throws an error if not provided a boardState argument', () => {
	expect(() => new DPiece()).toThrow(TypeError);
	expect(() => new DPiece(1)).toThrow(TypeError);
	expect(() => new DPiece(null)).toThrow(TypeError);
	expect(() => new DPiece(boardState)).not.toThrow();
	expect(() => new DPiece(boardState, 0)).not.toThrow();
	expect(() => new DPiece(boardState, 1)).not.toThrow();
});
test('Constructor throws error if passed a 2nd argument that is not 0 or 1', () => {
	expect(() => new DPiece(boardState, '1')).toThrow(TypeError);
	expect(() => new DPiece(boardState, [0])).toThrow(TypeError);
	expect(() => new DPiece(boardState, true)).toThrow(TypeError);
	expect(() => new DPiece(boardState, 1)).not.toThrow(TypeError);
});

const whitePiece1 = new DPiece(boardState);
const whitePiece2 = new DPiece(boardState, 0);
const blackPiece = new DPiece(boardState, 1);


/* Determine which player a piece belongs to */
test('Black pieces are actually identified as black pieces', () => {
	expect(blackPiece.isBlack()).toBe(true);
	expect(blackPiece.player).toBe(1);
	expect(whitePiece1.isBlack()).toBe(false);
	expect(whitePiece2.isBlack()).toBe(false);
});
test('White pieces are actually identified as white pieces', () => {
	expect(whitePiece1.isWhite()).toBe(true);
	expect(whitePiece1.player).toBe(0);
	expect(whitePiece1.isBlack()).toBe(false);
	expect(whitePiece2.isWhite()).toBe(true);
	expect(whitePiece2.player).toBe(0);
	expect(whitePiece2.isBlack()).toBe(false);
});

/* capture field tests */
test('Pieces start as captured', () => {
	const piece = new DPiece(boardState);

	expect(piece.captured).toBe(false);
});
test('Piece.captured must be a boolean', () => {
	expect(() => whitePiece1.captured = 'true').toThrow(TypeError);
	expect(() => whitePiece2.captured = 0).toThrow(TypeError);
	expect(() => blackPiece.captured = [true]).toThrow(TypeError);
	expect(() => whitePiece1.captured = true).not.toThrow(TypeError);
});
test('Piece.captured can be changed', () => {
	const piece = new DPiece(boardState);

	piece.captured = true;
	expect(piece.captured).toBe(true);

	piece.captured = false;
	expect(piece.captured).toBe(false);
});

/* Piece.canMove method unit tests */
test('The canMove method must be passed 2 arguments', () => {
	const piece = new DPiece(boardState);
	boardState.getPiece.mockReturnValue(piece);

	expect(() => whitePiece1.canMove()).toThrow(TypeError);
	expect(() => blackPiece.canMove([])).toThrow(TypeError);
	expect(() => whitePiece2.canMove([], [])).not.toThrow(TypeError);
});
test('Piece canMove checks the boardState', () => {
	blackPiece.canMove([0, 0], [1, 1]);
	expect(boardState.getPiece).toHaveBeenCalled();
});
test('Pieces can move to a square occupied by an enemy Piece', () => {
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece1);

	expect(whitePiece1.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackPiece.canMove([0, 1], [0, 0], 0)).toBe(true);
	expect(blackPiece.canMove([0, 1], [3, 2], 1)).toBe(true);
});
test('Pieces cannot move to a square occupied by another Piece belonging to the same player', () => {
	boardState.getPiece.mockReturnValue(blackPiece);
	positionUtils.boardPositionToString.mockReturnValueOnce('A2').mockReturnValue('A1');
	expect(blackPiece.canMove([0, 0], [0, 1], 0)).toBe(false);
	expect(blackPiece.canMove([0, 0], [0, 1], 1)).toBe('You already have a piece at A2');

	boardState.getPiece.mockReturnValue(new DPiece(boardState));
	expect(whitePiece2.canMove([0, 1], [0, 0])).toBe(false);
	expect(whitePiece1.canMove([0, 1], [0, 0], 1)).toEqual('You already have a piece at A1');
});
test('Pieces can move to empty squares on the board', () => {
	boardState.getPiece.mockReturnValue(null);

	expect(whitePiece2.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackPiece.canMove([0, 0], [6, 1], 0)).toBe(true);
	expect(whitePiece1.canMove([0, 0], [6, 1], 1)).toBe(true);
});
test('Pieces can\'t move to the same position it\'s already on', () => {
	expect(whitePiece1.canMove([0, 0], [0, 0], 0)).toBe(false);
	expect(blackPiece.canMove([3, 2], [3, 2])).toBe(false);
	expect(whitePiece2.canMove([4, 7], [4, 7], 1)).toEqual('You must move a piece to a new position');
});

/* misc */
test('Pieces have type of "generic"', () => {
	expect(whitePiece1.type).toBe('generic');
	expect(blackPiece.type).toBe('generic');
});

test('mode parameter to canMove is properly type checked', () => {
	expect(() => whitePiece1.canMove([0,1], [2,3], 0)).not.toThrow();
	expect(() => blackPiece.canMove([0,1], [2,3], 0)).not.toThrow();
	expect(() => whitePiece2.canMove([0,1], [2,3])).not.toThrow();

	expect(() => whitePiece1.canMove([0,1], [2,3], 2)).toThrow(TypeError);
	expect(() => blackPiece.canMove([0,1], [2,3], '1')).toThrow(TypeError);
	expect(() => whitePiece2.canMove([0,1], [2,3], true)).toThrow(TypeError);
});

test('isNextSquareInPathEmpty returns correct values when provided position is empty', () => {
	boardState.getPiece.mockReturnValue(null);

	expect(whitePiece1.isNextSquareInPathEmpty([0,2])).toBe(true);
	expect(whitePiece2.isNextSquareInPathEmpty([0,2], 0)).toBe(true);
	expect(blackPiece.isNextSquareInPathEmpty([0,2], 1)).toBe(true);
});

test('isNextSquareInPathEmpty returns correct values when provided position is not empty', () => {
	boardState.getPiece.mockReturnValue(new DPiece(boardState));

	expect(whitePiece1.isNextSquareInPathEmpty([0,2])).toBe(false);
	expect(whitePiece2.isNextSquareInPathEmpty([3,2], 0)).toBe(false);

	positionUtils.boardPositionToString.mockReturnValue('E4');
	expect(blackPiece.isNextSquareInPathEmpty([4,5], 1)).toEqual('There is a piece at E4 blocking your generic\'s path');
});
