import PieceSet from './';
import { Pawn, Rook, Knight, Bishop, Queen, King } from '../Piece';
import BoardState from '../BoardState';

const boardState = new BoardState();
const pawn = new Pawn(boardState);
const rook = new Rook(boardState, 1);
const knight = new Knight(boardState);
const bishop = new Bishop(boardState, 1);
const queen = new Queen(boardState);
const king = new King(boardState, 1);

const contains = (a, v) => {
	return a.some(e => JSON.stringify(e) === JSON.stringify(v));
}

test('PieceSet may be instantiated with no arguments', () => {
	expect(() => new PieceSet()).not.toThrow();
	expect(() => new PieceSet(undefined)).not.toThrow();
});

test('PieceSet with no argument constructor is correctly initialized', () => {
	const pieceSet = new PieceSet();
	expect(pieceSet.pieces).toBeTruthy();
	expect(typeof(pieceSet)).toEqual('object');
	Object.values(pieceSet.pieces).forEach(v => {
		expect(Array.isArray(v)).toBe(true);
		expect(v).toHaveLength(0);
	});
});

test('PieceSet with 2 constructor argument throws correct type errors', () => {
	expect(() => new PieceSet(-1, pawn)).toThrow(TypeError);
	expect(() => new PieceSet(3, [bishop])).toThrow(TypeError);
	expect(() => new PieceSet(4, [null])).toThrow(TypeError);
	expect(() => new PieceSet(5, [[1]])).toThrow(TypeError);
	expect(() => new PieceSet(6, [[1], king])).toThrow(TypeError);
	expect(() => new PieceSet(7, [[rook], knight])).toThrow(TypeError);
	expect(() => new PieceSet(8, [[pawn], [1]])).toThrow(TypeError);
	expect(() => new PieceSet(null, [king, [1]])).toThrow(TypeError);
	expect(() => new PieceSet([], [[king], [queen, 2]])).toThrow(TypeError);

	expect(() => new PieceSet(1, [])).not.toThrow();
	expect(() => new PieceSet(0, [[]])).not.toThrow();
	expect(() => new PieceSet(-1, [[pawn, null], [], [rook], [knight, null, null, bishop, king]])).not.toThrow();
});

test('PieceSet with one parameter constructor initalizes correctly', () => {
	const pieceSet = new PieceSet(-1, [
		[king, null, pawn],
		[],
		[rook, pawn]
	]);

	expect(pieceSet.pieces.king).toEqual([[0,0]]);
	expect(pieceSet.pieces.pawn).toEqual([[0,2],[2,1]]);
	expect(pieceSet.pieces.rook).toEqual([[2,0]]);

	const pieceSet2 = new PieceSet(1, [
		[king, null, pawn],
		[],
		[rook, pawn]
	]);

	expect(pieceSet2.pieces.king).toEqual([[0,0]]);
	expect(pieceSet2.pieces.pawn).toEqual([]);
	expect(pieceSet2.pieces.rook).toEqual([[2,0]]);
});

test('add throws type errors correctly', () => {
	const pieceSet = new PieceSet();
	expect(() => pieceSet.add()).toThrow(TypeError);
	expect(() => pieceSet.add(pawn)).toThrow(TypeError);
	expect(() => pieceSet.add(null, [0,0])).toThrow(TypeError);
	expect(() => pieceSet.add('pawn', [0,2])).toThrow(TypeError);
});

test('add returns true when it should add a piece', () => {
	const pieceSet = new PieceSet();

	expect(pieceSet.add(rook, [2,3])).toBe(true);
});

test('add actually adds a piece position correctly', () => {
	const pieceSet = new PieceSet();

	expect(!pieceSet.pieces.queen || pieceSet.pieces.queen.length === 0).toBe(true);
	pieceSet.add(queen, [3,2]);
	expect(contains(pieceSet.pieces['queen'], [3,2])).toBe(true);
	pieceSet.add(queen, [4,2]);
	expect(contains(pieceSet.pieces.queen, [4,2])).toBe(true);
	pieceSet.add(rook, [4,2]);
	expect(contains(pieceSet.pieces.rook, [4,2])).toBe(true);
});

test('add returns false if it already finds a matching piece type and position', () => {
	const pieceSet = new PieceSet(1, [[rook]]);

	expect(pieceSet.add(rook, [0,0])).toBe(false);
});

test('add returns false if player is not -1 and doesn\'t match the piece player', () => {
	const pieceSet = new PieceSet(0);

	expect(pieceSet.add(rook, [0,0])).toBe(false);
});

test('remove throws type errors correctly', () => {
	const pieceSet = new PieceSet();
	expect(() => pieceSet.remove()).toThrow(TypeError);
	expect(() => pieceSet.remove(pawn)).toThrow(TypeError);
	expect(() => pieceSet.remove(null, [0,0])).toThrow(TypeError);
	expect(() => pieceSet.remove('pawn', [0,2])).toThrow(TypeError);
});

test('remove returns false if it cannot finds a matching piece type and position', () => {
	const pieceSet = new PieceSet([[rook]]);

	expect(pieceSet.remove(pawn, [0,0])).toBe(false);
});

test('remove returns false if player is not -1 and doesn\'t match the piece player', () => {
	const pieceSet = new PieceSet(1, [[new Pawn(boardState, 1)]]);

	expect(pieceSet.add(pawn, [0,0])).toBe(false);
});

test('remove actually removes elements', () => {
	const pieceSet = new PieceSet(-1, [[pawn]]);
	expect(contains(pieceSet.pieces['pawn'], [0,0])).toBe(true);
	pieceSet.remove(pawn, [0,0]);
	expect(contains(pieceSet.pieces['pawn'], [0,0])).toBe(false);
});

test('update throws type errors correctly', () => {
	const pieceSet = new PieceSet();
	expect(() => pieceSet.update()).toThrow(TypeError);
	expect(() => pieceSet.update(pawn)).toThrow(TypeError);
	expect(() => pieceSet.update(knight, [0,0])).toThrow(TypeError);
	expect(() => pieceSet.update(null, [0,0], [0,3])).toThrow(TypeError);
	expect(() => pieceSet.update('pawn', [0,2], [2,4])).toThrow(TypeError);
});

test('update returns false if it does not finds a matching piece type and position', () => {
	const pieceSet = new PieceSet([[], [pawn]]);

	expect(pieceSet.update(pawn, [0,0], [0,2])).toBe(false);
});

test('update returns false if player is not -1 and doesn\'t match the piece player', () => {
	const pieceSet = new PieceSet(1, [[new Knight(boardState)]]);

	expect(pieceSet.add(knight, [0,0], [1,2])).toBe(false);
});


test('update actually changes an element', () => {
	const pieceSet = new PieceSet(-1, [[pawn]]);
	expect(contains(pieceSet.pieces['pawn'], [0,0])).toBe(true);
	pieceSet.update(pawn, [0,0], [1, 6]);
	expect(contains(pieceSet.pieces['pawn'], [0,0])).toBe(false);
	expect(contains(pieceSet.pieces['pawn'], [1,6])).toBe(true);
});

test('size starts at 0 for no argument constructor', () => {
	const pieceSet = new PieceSet();

	expect(pieceSet.size).toBe(0);
});

test('size goes up for each added piece', () => {
	const pieceSet = new PieceSet();
	pieceSet.add(pawn, [0,0]);
	expect(pieceSet.size).toBe(1);
	pieceSet.add(pawn, [1,2]);
	pieceSet.add(rook, [0,2]);
	expect(pieceSet.size).toBe(3);
});

test('size does not change if add is passed an element that is not able to be added', () => {
	const pieceSet = new PieceSet(1);
	pieceSet.add(knight, [1,3]);
	expect(pieceSet.size).toBe(0);
});

test('size does not change if add is passed an element that is already in the set', () => {
	const pieceSet = new PieceSet();
	pieceSet.add(bishop, [0, 5]);
	pieceSet.add(bishop, [0, 5]);
	pieceSet.add(bishop, [0, 5]);
	pieceSet.add(bishop, [0, 5]);
	expect(pieceSet.size).toBe(1);
});

test('update does not impact size', () => {
	const pieceSet = new PieceSet(-1, [[king]]);
	pieceSet.update(king, [0,0], [0,3]);
	expect(pieceSet.size).toBe(1);
});

test('remove decreases size by 1 if provided an element in the set', () => {
	const pieceSet = new PieceSet(-1, [[queen]]);
	pieceSet.remove(queen, [0,0]);
	expect(pieceSet.size).toBe(0);
});

test('remove dos not change size if provided an element not in the set', () => {
	const pieceSet = new PieceSet(-1, [[queen]]);
	pieceSet.remove(queen, [0,1]);
	expect(pieceSet.size).toBe(1);
	pieceSet.remove(pawn, [0,0]);
	expect(pieceSet.size).toBe(1);
});

test('getPieces with no argument returns an array with the positions of all pieces in the set', () => {
	const bState = new BoardState();
	const pieceSet = new PieceSet(-1, bState.board);
	const pieces = pieceSet.getPieces();

	expect(pieces).toHaveLength(32);

	const piecePositions = [
		[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
		[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],
		[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],
		[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]
	];

	piecePositions.forEach(([r,c]) => {
		expect(pieces.some(([x,y]) => x==r && y==c)).toBe(true);
	});
});

test('getPieces with a predicate argument filters elements', () => {
	const bState = new BoardState();
	const pieceSet = new PieceSet(-1, bState.board);

	expect(pieceSet.getPieces(piece => bState.getPiece(piece).type === 'king')).toHaveLength(2);
})
