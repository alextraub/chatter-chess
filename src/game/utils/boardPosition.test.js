import {
	isValidBoardPosition,
	isValidBoardPositionTuple,
	isValidBoardPositionString,
	boardPositionToString,
	boardPositionToTuple
} from './boardPosition';

test('All valid tuple representations are determined to be valid', () => {
	for(let r=0; r<8; r++) {
		for(let c=0; c<8; c++) {
			expect(isValidBoardPositionTuple([r, c])).toBe(true);
		}
	}
});
test('Board position tuples outside of valid range are invalid', () => {
	// Has a value that is too high
	expect(isValidBoardPositionTuple([-1, -1])).toBe(false);
	expect(isValidBoardPositionTuple([-3, 1])).toBe(false);
	expect(isValidBoardPositionTuple([7, -485])).toBe(false);
	expect(isValidBoardPositionTuple([-48, -6])).toBe(false);

	// Has a value that is too high
	expect(isValidBoardPositionTuple([8, 203])).toBe(false);
	expect(isValidBoardPositionTuple([129, 1])).toBe(false);
	expect(isValidBoardPositionTuple([7, 9])).toBe(false);
	expect(isValidBoardPositionTuple([314159, 19])).toBe(false);

	// Both out of range (one too low, one too high)
	expect(isValidBoardPositionTuple([-1, 70])).toBe(false);
	expect(isValidBoardPositionTuple([300, -33])).toBe(false);
});
test('Board position tuples that are not an array of 2 integers are invalid', () => {
	expect(isValidBoardPositionTuple()).toBe(false);
	expect(isValidBoardPositionTuple(null)).toBe(false);
	expect(isValidBoardPositionTuple(['1', 3])).toBe(false);
	expect(isValidBoardPositionTuple([2, 4.3])).toBe(false);
	expect(isValidBoardPositionTuple({ row: 0, col: 1 })).toBe(false);
	expect(isValidBoardPositionTuple(false)).toBe(false);
	expect(isValidBoardPositionTuple([])).toBe(false);
	expect(isValidBoardPositionTuple([1])).toBe(false);
});

test('Valid board position strings with lower case letters are valid', () => {
	const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	for(let r of rows) {
		for(let c=1; c<9; c++) {
			expect(isValidBoardPositionString(`${r}${c}`)).toBe(true);
		}
	}
});
test('Valid board position strings with upper case letters are valid', () => {
	const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	for(let r of rows) {
		for(let c=1; c<9; c++) {
			expect(isValidBoardPositionString(`${r}${c}`)).toBe(true);
		}
	}
});
test('Invalid board position strings are invalid', () => {
	expect(isValidBoardPositionString('')).toBe(false);
	expect(isValidBoardPositionString('a')).toBe(false);
	expect(isValidBoardPositionString('2')).toBe(false);
	expect(isValidBoardPositionString('2A')).toBe(false);
	expect(isValidBoardPositionString('A-1')).toBe(false);
	expect(isValidBoardPositionString('Ab')).toBe(false);
	expect(isValidBoardPositionString('34')).toBe(false);
	expect(isValidBoardPositionString('i3')).toBe(false);
	expect(isValidBoardPositionString('h0')).toBe(false);
	expect(isValidBoardPositionString('C2 ')).toBe(false);
});
test('Any board position string that isn\'t actually a string is invalid', () => {
	expect(isValidBoardPositionString()).toBe(false);
	expect(isValidBoardPositionString(3)).toBe(false);
	expect(isValidBoardPositionString(['a2'])).toBe(false);
});

test('isValidBoardPosition can validate valid board position strings and tuples', () => {
	expect(isValidBoardPosition([])).toBe(false);
	expect(isValidBoardPosition([3, 4])).toBe(true);
	expect(isValidBoardPosition('')).toBe(false);
	expect(isValidBoardPosition('H6')).toBe(true);
});
test('isValidBoardPosition only throws errors for a non array or strin parameter', () => {
	expect(() => isValidBoardPosition()).toThrow();
	expect(() => isValidBoardPosition({})).toThrow();
	expect(() => isValidBoardPosition(false)).toThrow();

	expect(() => isValidBoardPosition([])).not.toThrow();
	expect(() => isValidBoardPosition('')).not.toThrow();
	expect(() => isValidBoardPosition([4, 7])).not.toThrow();
	expect(() => isValidBoardPosition('g1')).not.toThrow();
});

test('boardPositionToString only converts valid board position tuples', () => {
	expect(() => boardPositionToString()).toThrow(TypeError);
	expect(() => boardPositionToString(null)).toThrow(TypeError);
	expect(() => boardPositionToString(1.7)).toThrow(TypeError);
	expect(() => boardPositionToString('a2')).toThrow(TypeError);
	expect(() => boardPositionToString([0, 8])).toThrow(TypeError);

	expect(() => boardPositionToString([0, 2])).not.toThrow();
	expect(() => boardPositionToString([2, 7])).not.toThrow();
	expect(() => boardPositionToString([1, 4])).not.toThrow();
	expect(() => boardPositionToString([4, 2])).not.toThrow();
});
test('Tuple to string board position conversions are correct', () => {
	expect(boardPositionToString([0, 0])).toEqual('A1');
	expect(boardPositionToString([3, 7])).toEqual('D8');
	expect(boardPositionToString([1, 6])).not.toEqual('b7');
	expect(boardPositionToString([5, 3])).not.toEqual('f4');
});

test('boardPositionToTuple only converts valid board position strings', () => {
	expect(() => boardPositionToTuple()).toThrow(TypeError);
	expect(() => boardPositionToTuple([1, 3])).toThrow(TypeError);
	expect(() => boardPositionToTuple('c0')).toThrow(TypeError);

	expect(() => boardPositionToTuple('c8')).not.toThrow();
	expect(() => boardPositionToTuple('B3')).not.toThrow();
	expect(() => boardPositionToTuple('g6')).not.toThrow();
});
test('String to tuple board position conversions are correct', () => {
	expect(boardPositionToTuple('a4')).toEqual([0, 3]);
	expect(boardPositionToTuple('B8')).toEqual([1, 7]);
	expect(boardPositionToTuple('c3')).toEqual([2, 2]);
	expect(boardPositionToTuple('E1')).toEqual([4, 0]);

});
