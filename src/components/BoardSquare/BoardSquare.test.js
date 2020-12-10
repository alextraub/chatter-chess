import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import BoardSquare from './';
import { createPiece } from '../../game/utils/pieceUtils';
import BoardState from '../../game/BoardState';
jest.mock('../../game/BoardState');
jest.mock('../../mediaQuery');

beforeEach(() => {
	BoardState.mockClear();
});


afterEach(cleanup);

test('Empty white square has white class', () => {
	const { getByTestId } = render(<BoardSquare position="B6" />);

	expect(getByTestId('B6')).toHaveClass('white', 'square');
});

test('Empty black square has white class', () => {
	const { getByTestId } = render(<BoardSquare position="F5" black />);

	expect(getByTestId('F5')).toHaveClass('black', 'square');
});

test('Empty white square does not have a piece', () => {
	const { getByTestId } = render(<BoardSquare />);
	expect(getByTestId('piece-container')).toBeEmptyDOMElement();
});

test('Empty black square does not have a piece', () => {
	const { getByTestId } = render(<BoardSquare black />);
	expect(getByTestId('piece-container')).toBeEmptyDOMElement();
});

test('White square with piece has child DOM element(s)', () => {
	const { getByTestId } = render(<BoardSquare piece={createPiece('pawn', null)} />);
	const boardSquare = getByTestId('board-square');
	const boardPiece = screen.getAllByTestId('chess-piece')[0];
	expect(boardSquare).toContainElement(boardPiece);
});

test('Row and col labels are displayed on empty white squares', () => {
	const { getByTestId } = render(<BoardSquare position="E2" />);
	expect(getByTestId('position-container')).toHaveTextContent('E2');
});

test('Row and col labels are displayed on empty black squares', () => {
	const { getByTestId } = render(<BoardSquare position="G7" black />);
	expect(getByTestId('position-container')).toHaveTextContent('G7');
});

test('Row and col labels are displayed on white occupied white squares', () => {
	const { getByTestId } = render(<BoardSquare position="C5" piece={createPiece('generic', null)} />);
	expect(getByTestId('position-container')).toHaveTextContent('C5');
});
test('Row and col labels are displayed on black occupied white squares', () => {
	const { getByTestId } = render(<BoardSquare position="A1" piece={createPiece('generic', null)} />);
	expect(getByTestId('position-container')).toHaveTextContent('A1');
});
test('Row and col labels are displayed on white occupied black squares', () => {
	const { getByTestId } = render(<BoardSquare position="D7" piece={createPiece('generic', null)} black />);
	expect(getByTestId('position-container')).toHaveTextContent('D7');
});
test('Row and col labels are displayed on black occupied black squares', () => {
	const { getByTestId } = render(<BoardSquare position="B8" piece={createPiece('generic', null, 1)} black />);
	expect(getByTestId('position-container')).toHaveTextContent('B8');
});
