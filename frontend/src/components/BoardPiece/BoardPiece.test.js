import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BoardPiece from './';
import DPiece from '../../__mocks__/DPiece';
import BoardState from '../../game/BoardState';
jest.mock('../../game/BoardState.js');

beforeEach(() => {
	BoardState.mockClear();
});

afterEach(cleanup);

const boardState = new BoardState();

test('Black pieces have correct css class', () => {
	const piece = new DPiece(boardState, 1);
	const { getByTestId } = render(<BoardPiece piece={piece}/>);
	expect(getByTestId('board-piece')).toHaveClass('black');
});

test('White pieces have correct css class', () => {
	const piece = new DPiece(boardState, 0);
	const { getByTestId } = render(<BoardPiece piece={piece}/>);
	expect(getByTestId('board-piece')).toHaveClass('white');
});
