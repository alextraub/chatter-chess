import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ChessPiece from './';


afterEach(cleanup);

test('Black pieces have correct css class', () => {
	const { getByTestId } = render(<ChessPiece black type="generic"/>);
	expect(getByTestId('chess-piece')).toHaveClass('black');
});

test('White pieces have correct css class', () => {
	const { getByTestId } = render(<ChessPiece type="generic"/>);
	expect(getByTestId('chess-piece')).toHaveClass('white');
});
