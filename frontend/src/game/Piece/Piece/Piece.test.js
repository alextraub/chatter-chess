import BoardState, { mockGetPiece } from '../../../__mocks__/boardStateMock';
import Piece from './';

/*
This class provides a way to call methods and the constructor from Piece without getting an error, and using the Piece class' implementation
*/
class DPiece extends Piece {
	constructor(boardState, player) {
		super(boardState, player);
	}

	canMove([fromRow, fromCol], [toRow, toCol]) {
		return super.canMove([fromRow, fromCol], [toRow, toCol]);
	}
}

beforeEach(() => {
	BoardState.mockClear();
	mockGetPiece.mockClear();
})

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

test('The canMoveTo method must be passed 2 arguments', () => {
	expect(() => whitePiece1.canMove()).toThrow(TypeError);
	expect(() => blackPiece.canMove([])).toThrow(TypeError);
	expect(() => whitePiece2.canMove([], [])).not.toThrow(TypeError);
});

test('Piece canMove checks the boardState', () => {
	blackPiece.canMove([0, 0], [1, 1]);
	expect(mockGetPiece).toHaveBeenCalled();
});

test('Pieces are allowed to be moved onto an enemy piece', () => {
	mockGetPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece1);

	expect(whitePiece1.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackPiece.canMove([0, 1], [0, 0])).toBe(true);
});

test('Pieces cannot move to a position where another of that player\'s pieces already is', () => {
	mockGetPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece2);

	expect(blackPiece.canMove([0, 0], [0, 1])).toBe(false);
	expect(whitePiece1.canMove([0, 1], [0, 0])).toBe(false);
});

test('Pieces can move to empty squares on the board', () => {
	mockGetPiece.mockReturnValue(null);

	expect(whitePiece2.canMove([0, 0], [0, 1])).toBe(true);
	expect(blackPiece.canMove([0, 0], [6, 1])).toBe(true);
});
