import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import GameContainer from './';

afterEach(cleanup);

test('The GameContainer can render', () => {
	const { getByTestId } = render(<GameContainer />);

	expect(() => getByTestId('game-container')).not.toThrow();
});
