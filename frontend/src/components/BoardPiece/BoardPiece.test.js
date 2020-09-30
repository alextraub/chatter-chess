import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BoardPiece from './';

afterEach(cleanup);

/*
	Helper function to test that both black and white pieces of the same type have the correct piece class
 */
function pieceClassTest(piece) {
	const { getAllByTestId } = render(
		<>
			<BoardPiece type={piece} />
			<BoardPiece type={piece} black />
		</>
	)

	getAllByTestId('board-piece').forEach(p => {
		expect(p).toHaveClass(piece);
	})
}

test('Pawn has correct css class', () => {
	pieceClassTest('pawn');
});

test('Rook has correct css class', () => {
	pieceClassTest('rook');
});

test('Bishop has correct css class', () => {
	pieceClassTest('bishop');
});

test('Knight has correct css class', () => {
	pieceClassTest('knight');
});

test('King has correct css class', () => {
	pieceClassTest('king');
});

test('Queen has correct css class', () => {
	pieceClassTest('queen');
});

test('Black pawn has correct color class', () => {
	const { getByTestId } = render(<BoardPiece type="pawn" black />);

	expect(getByTestId('board-piece')).toHaveClass('black');
});

test('White bishop has correct color class', () => {
	const { getByTestId } = render(<BoardPiece type="bishop" />);

	expect(getByTestId('board-piece')).toHaveClass('white');
});
