import BoardState, { mockGetPiece } from '../../../__mocks__/boardStateMock';
import Piece from './';

class DPiece extends Piece {
	constructor(boardState, player) {
		super(boardState, player);
	}
}

beforeEach(() => {
	BoardState.mockClear();
	mockGetPiece.mockClear();
})

test('Piece class cannot be directly instatuated', () => {
	expect(() => new Piece(new BoardState())).toThrow('Piece is abstract and cannot be instantiated');
});

test('Classes derived from Piece can be instantiated', () => {
	expect(() => new DPiece(new BoardState(), 0)).not.toThrow('Piece is abstract and cannot be instantiated');
});

test('Piece constructor throws an error if not provided a boardState argument', () => {
	expect(() => new DPiece()).toThrow(TypeError);
	expect(() => new DPiece(1)).toThrow(TypeError);
	expect(() => new DPiece(null)).toThrow(TypeError);
	expect(() => new DPiece(new BoardState())).not.toThrow();
	expect(() => new DPiece(new BoardState(), 0)).not.toThrow();
	expect(() => new DPiece(new BoardState(), 1)).not.toThrow();

});

test('Constructor throws error if not passed a 2nd argument that is not 0 or 1', () => {
	const boardState = new BoardState();
	expect(() => new DPiece(boardState, '1')).toThrow(TypeError);
	expect(() => new DPiece(boardState, [0])).toThrow(TypeError);
	expect(() => new DPiece(boardState, true)).toThrow(TypeError);
	expect(() => new DPiece(boardState, 1)).not.toThrow(TypeError);
});

test('Black pieces are actually identified as black pieces', () => {
	const piece = new DPiece(new BoardState(), 1);
	expect(piece.isBlack()).toBe(true);
	expect(piece.player).toBe(1);
	expect(piece.isWhite()).toBe(false);
});

test('White pieces are actually identified as white pieces', () => {
	const boardState = new BoardState();

	const piece1 = new DPiece(boardState, 0);
	const piece2 = new DPiece(boardState);

	expect(piece1.isWhite()).toBe(true);
	expect(piece1.player).toBe(0);
	expect(piece1.isBlack()).toBe(false);
	expect(piece2.isWhite()).toBe(true);
	expect(piece2.player).toBe(0);
	expect(piece2.isBlack()).toBe(false);
});

test('The canMoveTo method must be passed 2 arguments', () => {
	const piece = new DPiece(new BoardState());

	expect(() => piece.canMoveTo()).toThrow(TypeError);
	expect(() => piece.canMoveTo([])).toThrow(TypeError);
	expect(() => piece.canMoveTo([], [])).not.toThrow(TypeError);
});

test('Piece canMoveTo checks the boardState', () => {
	const boardState = new BoardState();
	const piece = new DPiece(boardState, 1);

	piece.canMoveTo([0, 0], [1, 1]);
	expect(mockGetPiece).toHaveBeenCalledWith([1, 1]);
});
