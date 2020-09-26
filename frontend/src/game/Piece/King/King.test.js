import King from './';

test('King can move right one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 1, col: 5})).toBe(true);
});

test('King can move left one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 1, col: 3})).toBe(true);
});

test('King cannot move right more than one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 1, col: 6})).toBe("The King cannot move into that position");
});

test('King cannot move left more than one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 1, col: 2})).toBe("The King cannot move into that position");
});

test('King can move up one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 2, col: 4})).toBe(true);
});

test('King can move down one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 0, col: 4})).toBe(true);
});

test('King cannot move up more than one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 3, col: 4})).toBe("The King cannot move into that position");
});

test('King cannot move down more than one space', () => {
	const king = new King({row: 2, col: 4});
	expect(king.canMoveTo({row: 0, col: 4})).toBe("The King cannot move into that position");
});

test('King can move diagonal right up one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 2, col: 5})).toBe(true);
});

test('King can move diagonal left up one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 2, col: 3})).toBe(true);
});

test('King can move diagonal right down one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 0, col: 5})).toBe(true);
});

test('King can move diagonal left down one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 0, col: 3})).toBe(true);
});

test('King cannot move diagonal right up more than one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 3, col: 6})).toBe("The King cannot move into that position");
});

test('King cannot move diagonal left up more than one space', () => {
	const king = new King({row: 1, col: 4});
	expect(king.canMoveTo({row: 3, col: 2})).toBe("The King cannot move into that position");
});

test('King cannot move diagonal right down more than one space', () => {
	const king = new King({row: 2, col: 4});
	expect(king.canMoveTo({row: 0, col: 6})).toBe("The King cannot move into that position");
});

test('King cannot move diagonal left down more than one space', () => {
	const king = new King({row: 2, col: 4});
	expect(king.canMoveTo({row: 0, col: 2})).toBe("The King cannot move into that position");
});
