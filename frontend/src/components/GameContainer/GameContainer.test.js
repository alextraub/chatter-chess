import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import GameContainer from './';

import '@testing-library/jest-dom/extend-expect';
jest.mock('../ChessPiece/pieceImages.js');

afterEach(cleanup);

test('GameContainer is rendered', () => {
	render(<GameContainer />);

	expect(screen.getAllByTestId('game-container')).toHaveLength(1);
});
