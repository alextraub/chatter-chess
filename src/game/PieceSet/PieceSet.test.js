import PieceSet from './';
import { Pawn } from '../Piece';

const pawn = { type: 'PAWN', player: 'WHITE', captured: false, position: { row: 0, col: 0} };
const rook = { type: 'ROOK', player: 'BLACK', captured: false, position: { row: 0, col: 0} };
const knight = { type: 'KNIGHT', player: 'WHITE', captured: false, position: { row: 0, col: 0} };
const bishop = { type: 'BISHOP', player: 'BLACK', captured: false, position: { row: 0, col: 0} };
const queen = { type: 'QUEEN', player: 'WHITE', captured: false, position: { row: 0, col: 0} };
const king = { type: 'KING', player: 'BLACK', captured: false, position: { row: 0, col: 0} };

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

	expect(() => new PieceSet('BLACK', [])).not.toThrow();
	expect(() => new PieceSet('WHITE', [[]])).toThrow();
	expect(() => new PieceSet(-1, [[pawn, null], [], [rook], [knight, null, null, bishop, king]])).toThrow();
});

test('PieceSet with one parameter constructor initalizes correctly', () => {
	const pieces = [
		king, {...pawn, position: { row: 0, col: 2 }}, {...pawn, position: { row: 2, col: 1 }},
		{...rook, position: { row: 2, col: 0 }}
	];
	const pieceSet = new PieceSet(-1, pieces);

	expect(pieceSet.pieces.KING[0].position).toEqual({ row: 0, col: 0 });
	expect(pieceSet.pieces.PAWN.map(({ position }) => [position.row, position.col])).toEqual([[0,2],[2,1]]);
	expect(pieceSet.pieces.ROOK.map(({ position }) => [position.row, position.col])).toEqual([[2,0]]);

	const pieceSet2 = new PieceSet('BLACK', pieces);

	expect(pieceSet2.pieces.KING.map(({ position }) => [position.row, position.col])).toEqual([[0,0]]);
	expect(pieceSet2.pieces.PAWN).toEqual([]);
	expect(pieceSet2.pieces.ROOK.map(({ position }) => [position.row, position.col])).toEqual([[2,0]]);

});

test('add throws type errors correctly', () => {
	const pieceSet = new PieceSet();
	expect(() => pieceSet.add()).toThrow(TypeError);
	expect(() => pieceSet.add(new Pawn(null))).toThrow(TypeError);
	expect(() => pieceSet.add(null, [0,0])).toThrow(TypeError);
	expect(() => pieceSet.add('pawn', [0,2])).toThrow(TypeError);
});

test('add returns true when it should add a piece', () => {
	const pieceSet = new PieceSet();

	expect(pieceSet.add(rook)).toBe(true);
});

test('add actually adds a piece position correctly', () => {
	const pieceSet = new PieceSet();

	expect(pieceSet.pieces.QUEEN.length).toBe(0);
	pieceSet.add(queen);
	expect(contains(pieceSet.pieces.QUEEN, queen)).toBe(true);
	const queen2 = { ...queen, position: { row: 4, col: 2 } };
	pieceSet.add(queen2);
	expect(contains(pieceSet.pieces.QUEEN, queen2)).toBe(true);
	const rook2 = { ...rook, position: { row: 4, col:2 } };
	pieceSet.add(rook2);
	expect(contains(pieceSet.pieces.ROOK, rook2)).toBe(true);
});

test('add returns false if it already finds a matching piece type and position', () => {
	const pieceSet = new PieceSet('BLACK', [rook]);

	expect(pieceSet.add({ ...rook })).toBe(false);
});

test('add returns false if player is not -1 and doesn\'t match the piece player', () => {
	const pieceSet = new PieceSet('WHITE');

	expect(pieceSet.add(rook)).toBe(false);
});

test('remove throws type errors correctly', () => {
	const pieceSet = new PieceSet();
	expect(() => pieceSet.remove()).toThrow(TypeError);
	expect(() => pieceSet.remove(new Pawn(null))).toThrow(TypeError);
	expect(() => pieceSet.remove(null)).toThrow(TypeError);
	expect(() => pieceSet.remove('pawn')).toThrow(TypeError);
});

test('remove returns false if it cannot finds a matching piece type and position', () => {
	const pieceSet = new PieceSet(-1, [rook]);

	expect(pieceSet.remove(pawn)).toBe(false);
});

test('remove returns false if player is not -1 and doesn\'t match the piece player', () => {
	const pieceSet = new PieceSet('BLACK', [{ ...pawn, player: 'BLACK' }]);

	expect(pieceSet.add(pawn, [0,0])).toBe(false);
});

test('remove actually removes elements', () => {
	const pieceSet = new PieceSet(-1, [pawn]);
	expect(contains(pieceSet.pieces.PAWN, { ...pawn })).toBe(true);
	pieceSet.remove({...pawn});
	expect(contains(pieceSet.pieces.PAWN, pawn)).toBe(false);
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
	const pawn2 = { ...pawn, position: { row: 1, col: 0 } };
	const pieceSet = new PieceSet(-1, [pawn2]);

	expect(pieceSet.update(pawn, pawn2)).toBe(false);
});

test('update returns false if player is not -1 and doesn\'t match the piece player', () => {
	const knight2 = { ...knight, player: 'WHITE' };
	const pieceSet = new PieceSet('BLACK', [knight2]);

	expect(pieceSet.update(knight2, knight)).toBe(false);
});


test('update actually changes an element', () => {
	const pieceSet = new PieceSet(-1, [pawn]);
	const pawn2 = {...pawn, position: { row: 1, col: 6 }};
	expect(contains(pieceSet.pieces['PAWN'], {...pawn})).toBe(true);
	pieceSet.update(pawn, pawn2);
	expect(contains(pieceSet.pieces['PAWN'], {...pawn})).toBe(false);
	expect(contains(pieceSet.pieces['PAWN'], {...pawn2})).toBe(true);
});

test('size starts at 0 for no argument constructor', () => {
	const pieceSet = new PieceSet();

	expect(pieceSet.size).toBe(0);
});

test('size goes up for each added piece', () => {
	const pieceSet = new PieceSet();
	pieceSet.add(pawn);
	expect(pieceSet.size).toBe(1);
	pieceSet.add({ ...pawn, position: { row: 1, col: 2 } });
	pieceSet.add({ ...rook, position: { row: 0, col: 2 } });
	expect(pieceSet.size).toBe(3);
});

test('size does not change if add is passed an element that is not able to be added', () => {
	const pieceSet = new PieceSet('BLACK');
	pieceSet.add(knight);
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
	const pieceSet = new PieceSet(-1, [king]);
	pieceSet.update(king, {...king, position: null, captured: true});
	expect(pieceSet.size).toBe(1);
});

test('remove decreases size by 1 if provided an element in the set', () => {
	const pieceSet = new PieceSet(-1, [queen]);
	pieceSet.remove(queen, [0,0]);
	expect(pieceSet.size).toBe(0);
});

test('remove dos not change size if provided an element not in the set', () => {
	const pieceSet = new PieceSet(-1, [queen]);
	pieceSet.remove({ ...queen, position: null });
	expect(pieceSet.size).toBe(1);
});

test('getPieces with no argument returns an array with the positions of all pieces in the set', () => {
	const pieceSet = new PieceSet(-1, [queen, rook, pawn]);
	const pieces = pieceSet.getPieces();

	expect(pieces.filter(p => JSON.stringify(p) === JSON.stringify(pawn))).toHaveLength(1);
	expect(pieces.filter(p => JSON.stringify(p) === JSON.stringify(rook))).toHaveLength(1);
	expect(pieces.filter(p => JSON.stringify(p) === JSON.stringify(queen))).toHaveLength(1);
});

test('updating a piece will change the array element in the private pieces field', () => {
	const pawn2 = { ...pawn, position: { row: 1, col: 0 } };
	const pieceSet = new PieceSet(-1, [pawn]);
	expect(pieceSet.pieces.PAWN[0].position).toEqual({ row: 0, col: 0 });
	pieceSet.update(pawn, pawn2);
	expect(pieceSet.pieces.PAWN).toHaveLength(1);
	expect(pieceSet.pieces.PAWN[0].position).toEqual({ row: 1, col: 0 });
});
