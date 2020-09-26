import Piece from './';

const derivedClass = class DPiece extends Piece { constructor(pos, player) {super(pos, player);} }

test('Piece class cannot be directly instatuated', () => {
	expect(() => new Piece({row:0,col:0})).toThrow(TypeError);
});

test('Classes derived from Piece can be instantiated', () => {
	expect(() => new derivedClass({row: 0, col: 0}, 0)).not.toThrow(TypeError);
});

test('Constructor throws error if not passed a 2nd argument that is not 0 or 1', () => {
	expect(() => new derivedClass({ row: 0, col: 0 }, '1')).toThrow(TypeError);
	expect(() => new derivedClass({ row: 0, col: 0 }, [0])).toThrow(TypeError);
	expect(() => new derivedClass({ row: 0, col: 0 }, true)).toThrow(TypeError);
	expect(() => new derivedClass({ row: 0, col: 0 }, 1)).not.toThrow(TypeError);
});

test('Black pieces are actually identified as black pieces', () => {
	const piece = new derivedClass({ row: 1, col: 0 }, 1);
	expect(piece.isBlack()).toBe(true);
	expect(piece.isWhite()).toBe(false);
});

test('White pieces are actually identified as white pieces', () => {
	const piece1 = new derivedClass({ row: 2, col: 5 }, 0);
	const piece2 = new derivedClass({ row: 3, col: 4 });

	expect(piece1.isWhite()).toBe(true);
	expect(piece1.isBlack()).toBe(false);
	expect(piece2.isWhite()).toBe(true);
	expect(piece2.isBlack()).toBe(false);
});

test('Position of a piece is correctly stored', () => {
	let pos = { row: 1, col: 4 };
	const piece = new derivedClass(pos);

	expect(piece.position).toEqual(pos);

	pos.row = 3;
	expect(piece.position).toEqual({ row: 1, col: 4 });
});

test('Pieces cannot have a position without row or col properties', () => {
	expect(() => new derivedClass({})).toThrow(TypeError);
	expect(() => new derivedClass({ row: 1 })).toThrow(TypeError);
	expect(() => new derivedClass({ col: 5 })).toThrow(TypeError);
});

test('Pieces cannot have a position with non-numeric values', () => {
	expect(() => new derivedClass({ row: undefined, col: null })).toThrow(TypeError);
	expect(() => new derivedClass({ row: 1, col: 'a' })).toThrow(TypeError);
	expect(() => new derivedClass({ row: false, col: 5 })).toThrow(TypeError);
});

test('Piece positions must have row and col properties with values between 0 and 7 (inclusive)', () => {
	expect(() => new derivedClass({ row: 0 })).not.toThrow(RangeError);
	expect(() => new derivedClass({ row: -1, col: 4 })).toThrow(RangeError);
	expect(() => new derivedClass({ row: 25, col: 4 })).toThrow(RangeError);
	expect(() => new derivedClass({ row: 3, col: -45 })).toThrow(RangeError);
	expect(() => new derivedClass({ row: 7, col: 60 })).toThrow(RangeError);
});

test('Movement validation must be implemented in derived Piece classes', () => {
	const piece = new derivedClass({ row: 7, col: 4 });
	expect(() => piece.canMoveTo({ row: 0, col: 0 })).toThrow();
});

test('Pieces are moved to valid positions', () => {
	const piece = new derivedClass({ row: 4, col: 2 });
	piece.canMoveTo = () => true;

	expect(piece.move({ row: 3, col: 7 })).toBe(true);
	expect(piece.position).toEqual({ row: 3, col: 7 });
});

test('Pieces are not moved to invalid positions', () => {
	const piece = new derivedClass({ row: 5, col: 1 }, 1);
	piece.canMoveTo = () => 'Can\'t move piece';

	expect(piece.move({ row: 1, col: 5 })).toEqual('Can\'t move piece');

	piece.canMoveTo = () => true;

	expect(piece.move({ row: -3, col: false })).not.toBe(true);

	expect(piece.position).toEqual({ row: 5, col: 1 });
});

test('Pieces start as being uncaptured', () => {
	const pieces = [
		new derivedClass({ row: 0, col: 4 }),
		new derivedClass({ row: 6, col: 4 }, 1),
		new derivedClass({ row: 4, col: 1 }, 0)
	]

	pieces.forEach(piece => {
		expect(piece.captured).toBe(false);
	});
});

test('Pieces can only be set to a boolean value captured state', () => {
	const piece = new derivedClass({ row: 7, col: 6 }, 0);

	expect(() => piece.setCaptured(false)).not.toThrow(TypeError);
	expect(() => piece.setCaptured(true)).not.toThrow(TypeError);
	expect(() => piece.setCaptured()).toThrow(TypeError);
	expect(() => piece.setCaptured(0)).toThrow(TypeError);
	expect(() => piece.setCaptured('1')).toThrow(TypeError);
	expect(() => piece.setCaptured([true])).toThrow(TypeError);
});

test('Pieces can not be set to the same captured state as they are in', () => {
	const piece = new derivedClass({ row: 2, col: 2 });

	expect(() => piece.setCaptured(false)).toThrow(EvalError);
	piece.setCaptured(true);
	expect(() => piece.setCaptured(true)).toThrow(EvalError);
});

test('Pieces are properly set as captured', () => {
	const positions = [
		{ row: 1, col: 2 },
		{ row: 1, col: 2 },
		{ row: 4, col: 0 }
	];

	const pieces = positions.map(pos => new derivedClass(pos));

	pieces.forEach((piece, index) => {
		expect(piece.captured).toBe(false);
		piece.setCaptured(true);
		expect(piece.captured).toBe(true);
		expect(piece.position).toEqual(positions[index]);
	});
});
