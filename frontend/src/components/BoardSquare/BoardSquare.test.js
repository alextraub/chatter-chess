import React from 'react';
import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import BoardSquare from './';

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
	expect(getByTestId('board-square')).toBeEmptyDOMElement();
});

test('Empty black square does not have a piece', () => {
	const { getByTestId } = render(<BoardSquare black />);
	expect(getByTestId('board-square')).toBeEmptyDOMElement();
});

test('White square with rook has child DOM element(s)', () => {
	const BoardPiece = jest.mock.fn;
	const { getByTestId } = render(<BoardSquare piece={{type: 'rook'}}/>);
	expect(getByTestId('board-square')).not.toBeEmptyDOMElement();
});
