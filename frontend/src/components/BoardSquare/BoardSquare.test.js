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
	const { getByTestId } = render(<BoardSquare />);

	expect(getByTestId('board-square')).toHaveClass('white', 'square');
});

test('Empty black square has white class', () => {
	const { getByTestId } = render(<BoardSquare black />);

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
