import Piece from './';
import DPiece from '../DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState')

const positionUtils = require('../../utils/positionUtils');
jest.mock('../../utils/positionUtils');

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
test('Piece constructor throws an error if provided a first argument that is not a boardState or null', () => {
	expect(() => new DPiece()).not.toThrow(TypeError);
	expect(() => new DPiece(1)).toThrow(TypeError);
	expect(() => new DPiece(null)).not.toThrow(TypeError);
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

test('Calling canMove on a piece with no boardState throws an error', () => {
	expect(() => new DPiece().canMove([0,0], [0,1])).toThrow(EvalError);
});

test('Calling canMove on a piece with a boardState does not throw an eval error', () => {
	expect(() => new DPiece(boardState).canMove([0,0], [0,1])).not.toThrow(EvalError);
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
	boardState.getPiece.mockReturnValue(new DPiece(boardState));
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
	positionUtils.boardPositionToString = jest.fn()
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
	boardState.getPiece.mockReturnValue(null);
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

	positionUtils.boardPositionToString = jest.fn(() => 'E4');
	expect(blackPiece.isNextSquareInPathEmpty([4,5], 1)).toEqual('There is a piece at E4 blocking your generic\'s path');
});


test('By default pieces cannot be swapped out', () => {
	expect(whitePiece1.canSwapOut).toBe(false);
	expect(blackPiece.canSwapOut).toBe(false);
});

test('By default pieces can be swapped in', () => {
	expect(whitePiece1.canSwapIn).toBe(true);
	expect(blackPiece.canSwapIn).toBe(true);
});

test('Pieces throw an error if checking their swapRow property, by default', () => {
	expect(() => whitePiece2.swapRow).toThrow(EvalError);
	expect(() => blackPiece.swapRow).toThrow(EvalError);
});

test('getValidMove path simply returns the from and to positions when given a move that is not horizontal, vertical, or diagonal', () => {
	expect(whitePiece1.getValidMovePath([0,2], [3,4])).toEqual([[0,2], [3,4]]);
	expect(whitePiece2.getValidMovePath([1,2], [7,4])).toEqual([[1,2], [7,4]]);
	expect(blackPiece.getValidMovePath([0,2], [4,0])).toEqual([[0,2], [4,0]]);
});

test('getValidMovePath returns all position from from to to for a horizontal move', () => {
	const path1 = [
		[0,3],
		[0,4],
		[0,5],
		[0,6]
	];
	expect(whitePiece1.getValidMovePath([0,3],[0,6])).toEqual(path1);
	const path2 = path1.reverse()
	expect(whitePiece2.getValidMovePath([0,6],[0,3])).toEqual(path2);
	expect(blackPiece.getValidMovePath([2,4], [2,3])).toEqual([[2,4],[2,3]]);
});


test('getValidMovePath returns all position from from to to for a vertical move', () => {
	const path1 = [
		[2,3],
		[3,3],
		[4,3],
		[5,3],
		[6,3]
	];
	expect(whitePiece1.getValidMovePath([2,3],[6,3])).toEqual(path1);
	const path2 = path1.reverse()
	expect(whitePiece2.getValidMovePath([6,3],[2,3])).toEqual(path2);
	expect(blackPiece.getValidMovePath([2,4], [1,4])).toEqual([[2,4],[1,4]]);
});

test('getValidMovePath returns all position from from to to for a diagonal move', () => {
	const path1 = [
		[2,3],
		[3,4],
		[4,5],
		[5,6],
		[6,7]
	];
	const path2 = [
		[2,3],
		[3,2],
		[4,1],
		[5,0]
	];

	expect(blackPiece.getValidMovePath([2,3],[6,7])).toEqual(path1);
	expect(whitePiece2.getValidMovePath([2,3],[5,0])).toEqual(path2);

	const path3 = path1.reverse();
	const path4 = path2.reverse();
	expect(blackPiece.getValidMovePath([6,7],[2,3])).toEqual(path3);
	expect(whitePiece1.getValidMovePath([5,0],[2,3])).toEqual(path4);
});

test('toObject has correct type property', () => {
	expect(whitePiece1.toObject().type).toEqual('generic');
	expect(blackPiece.toObject().type).toEqual('generic');
});

test('toObject has correct player property', () => {
	expect(whitePiece2.toObject().player).toBe(0);
	expect(blackPiece.toObject().player).toBe(1);
});

test('toObject has correct captured property for uncaptured pieces', () => {
	expect(whitePiece2.toObject().captured).toBe(false);
	expect(blackPiece.toObject().captured).toBe(false);
});

test('toObject has correct captured property for captured pieces', () => {
	whitePiece1.captured = true;
	expect(whitePiece1.toObject().captured).toBe(true);
	whitePiece1.captured = false;

	blackPiece.captured = true;
	expect(blackPiece.toObject().captured).toBe(true);
	blackPiece.captured = false;
});

jest.unmock('../../utils/positionUtils');
test('Piece.asQueryObject returns an object with properties: type, player, captured, position', () => {
	const p = Piece.asQueryObject(whitePiece1, [0, 0]);

	expect(p.type).not.toBeUndefined();
	expect(p.player).not.toBeUndefined();
	expect(p.captured).not.toBeUndefined();
	expect(p.position).not.toBeUndefined();
});

test('Piece.asQueryObject has type of all upper case of the piece type field', () => {
	expect(Piece.asQueryObject(whitePiece1, [0,0]).type).toEqual('GENERIC');
	expect(Piece.asQueryObject(whitePiece2, [0,0]).type).toEqual('GENERIC');
	expect(Piece.asQueryObject(blackPiece, [0,0]).type).toEqual('GENERIC');
});

test('Piece.asQueryObject has player WHITE for white pieces', () => {
	expect(Piece.asQueryObject(whitePiece1, [0,0]).player).toEqual('WHITE');
	expect(Piece.asQueryObject(whitePiece2, [0,0]).player).toEqual('WHITE');
	expect(Piece.asQueryObject(blackPiece, [0,0]).player).not.toEqual('GENERIC');
});

test('Piece.asQueryObject has player BLACK for black pieces', () => {
	expect(Piece.asQueryObject(whitePiece1, [0,0]).player).not.toEqual('BLACK');
	expect(Piece.asQueryObject(whitePiece2, [0,0]).player).not.toEqual('BLACK');
	expect(Piece.asQueryObject(blackPiece, [0,0]).player).toEqual('BLACK');
});

test('Piece.asQueryObject captured property reflects the piece\'s captured property', () => {
	const p1 = new DPiece();
	expect(Piece.asQueryObject(p1, [0,0]).captured).toBe(false);
	p1.captured = true;
	expect(Piece.asQueryObject(p1, [0,0]).captured).toBe(true);
});

test('Piece.asQueryObject throws an error if passed an uncaptured piece without a position', () => {
	expect(() => Piece.asQueryObject(whitePiece1)).toThrow();
});

test('Piece.asQueryObject throws an error if passed an uncaptured piece with an invalid position', () => {
	expect(() => Piece.asQueryObject(whitePiece1, null)).toThrow();
	expect(() => Piece.asQueryObject(whitePiece2, [])).toThrow();
	expect(() => Piece.asQueryObject(blackPiece, "C 1")).toThrow();
	expect(() => Piece.asQueryObject(whitePiece1, [-3, 4])).toThrow();
	expect(() => Piece.asQueryObject(whitePiece2, [1,2,3])).toThrow();
	expect(() => Piece.asQueryObject(blackPiece, 'a9')).toThrow();
	expect(() => Piece.asQueryObject(whitePiece1, '9a')).toThrow();
	expect(() => Piece.asQueryObject(whitePiece2, 's2')).toThrow();
	expect(() => Piece.asQueryObject(blackPiece, [2,3])).not.toThrow();
	expect(() => Piece.asQueryObject(whitePiece1, 'a3')).not.toThrow();
	expect(() => Piece.asQueryObject(whitePiece1, 'B2')).not.toThrow();
});

test('Piece.asQueryObject has correct position when passed in as a tuple', () => {
	expect(Piece.asQueryObject(whitePiece1, [3,2]).position).toEqual({
		row: 3,
		col: 2
	});
});

test('Piece.asQueryObject has correct position when passed in as a string', () => {
	expect(Piece.asQueryObject(whitePiece1, 'D3').position).toEqual({
		row: 5,
		col: 3
	});
});
