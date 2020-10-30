import Piece from './';
import DPiece from '../../../__mocks__/DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState.js')

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
	expect(blackPiece.canMove([0, 1], [0, 0])).toBe(true);
});
test('Pieces cannot move to a square occupied by another Piece belonging to the same player', () => {
	boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece2);

	expect(blackPiece.canMove([0, 0], [0, 1])).toBe(false);
	expect(whitePiece1.canMove([0, 1], [0, 0])).toBe(false);
});
test('Pieces can move to empty squares on the board', () => {
	boardState.getPiece.mockReturnValue(null);

	expect(whitePiece2.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackPiece.canMove([0, 0], [6, 1])).toBe(true);
});
test('Pieces can\'t move to the same position it\'s already on', () => {
	expect(whitePiece1.canMove([0, 0], [0, 0])).toBe(false);
	expect(blackPiece.canMove([3, 2], [3, 2])).toBe(false);
});

test('Pieces have type of "generic piece"', () => {
	expect(whitePiece1.type).toBe('generic piece');
	expect(blackPiece.type).toBe('generic piece');
});
