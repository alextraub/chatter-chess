import Queen from './';

test('Queen can move up more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 7, col: 3})).toBe(true);
});

test('Queen can move down more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 0, col: 3})).toBe(true);
});

test('Queen can move up one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 5, col: 3})).toBe(true);
});

test('Queen can move down one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 3, col: 3})).toBe(true);
});

test('Queen can move right more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 4, col: 6})).toBe(true);
});

test('Queen can move left more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 4, col: 0})).toBe(true);
});

test('Queen can move right one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 4, col: 4})).toBe(true);
});

test('Queen can move left one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 4, col: 2})).toBe(true);
});

test('Queen can move diagonal up right more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 7, col: 6})).toBe(true);
});

test('Queen can move diagonal up left more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 7, col: 0})).toBe(true);
});

test('Queen can move diagonal up right one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 5, col: 4})).toBe(true);
});

test('Queen can move diagonal up left one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 5, col: 2})).toBe(true);
});

test('Queen can move diagonal down right more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 1, col: 6})).toBe(true);
});

test('Queen can move diagonal down left more than one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 1, col: 0})).toBe(true);
});

test('Queen can move diagonal down right one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 3, col: 4})).toBe(true);
});

test('Queen can move diagonal down left one space', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 3, col: 2})).toBe(true);
});

test('Queen illegal move', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 5, col: 7})).toBe("The Queen cannot move into that position");
});

test('Queen illegal move #2', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 5, col: 0})).toBe("The Queen cannot move into that position");
});

test('Queen illegal move #3', () => {
	const queen = new Queen({row: 4, col: 3});
	expect(queen.canMoveTo({row: 2, col: 4})).toBe("The Queen cannot move into that position");
});
