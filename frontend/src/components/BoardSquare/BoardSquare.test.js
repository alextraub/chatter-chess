import React from 'react';
import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import BoardSquare from './';
import DPiece from '../../__mocks__/DPiece';
import BoardState from '../../game/BoardState';
jest.mock('../../game/BoardState.js');

beforeEach(() => {
	BoardState.mockClear();
});

afterEach(cleanup);


test('Empty white square has white class', () => {
	const { getByTestId } = render(<BoardSquare position="B6" />);

	expect(getByTestId('board-square')).toHaveClass('white', 'square');
});

test('Empty black square has white class', () => {
	const { getByTestId } = render(<BoardSquare position="F5" black />);

	expect(getByTestId('board-square')).toHaveClass('black', 'square');
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
	const { getByTestId } = render(<BoardSquare piece={new DPiece(new BoardState())}/>);
	const boardSquare = getByTestId('board-square');
	const boardPiece = getByTestId('board-piece');
	expect(boardSquare).toContainElement(boardPiece);
});

test('Row and col labels are displayed on empty white squares', () => {
	const { getByTestId } = render(<BoardSquare position="E2"/>);
	expect(getByTestId('position-label')).toHaveTextContent('E2');
});

test('Row and col labels are displayed on empty black squares', () => {
	const { getByTestId } = render(<BoardSquare position="G7" black />);
	expect(getByTestId('position-label')).toHaveTextContent('G7');
});

test('Row and col labels are displayed on white occupied white squares', () => {
	const { getByTestId } = render(<BoardSquare position="C5" piece={new DPiece(new BoardState())}/>);
	expect(getByTestId('position-label')).toHaveTextContent('C5');
});
test('Row and col labels are displayed on black occupied white squares', () => {
	const { getByTestId } = render(<BoardSquare position="A1" piece={new DPiece(new BoardState(), 1)}/>);
	expect(getByTestId('position-label')).toHaveTextContent('A1');
});
test('Row and col labels are displayed on white occupied black squares', () => {
	const { getByTestId } = render(<BoardSquare position="D7" piece={new DPiece(new BoardState())} black />);
	expect(getByTestId('position-label')).toHaveTextContent('D7');
});
test('Row and col labels are displayed on black occupied black squares', () => {
	const { getByTestId } = render(<BoardSquare position="B8" piece={new DPiece(new BoardState(), 1)} black />);
	expect(getByTestId('position-label')).toHaveTextContent('B8');
});
