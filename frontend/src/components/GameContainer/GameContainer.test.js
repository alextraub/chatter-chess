import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import GameContainer from './';
import '@testing-library/jest-dom/extend-expect';
import BoardState from '../../game/BoardState';
jest.mock('../ChessPiece/pieceImages.js');

afterEach(cleanup);

const removePiece = ([r,c], bState) => {
	const p = bState.getPiece([r,c]);
	if(p === null) {
		return;
	} else {
		if(p.player === 0) {
			bState.whitePieces.remove(p, [r,c]);
		} else {
			bState.blackPieces.remove(p, [r,c]);
		}
		bState.board[r][c] = null;
	}
}

const changePosition = ([fR,fC], [tR, tC], bState) => {
	const p = bState.getPiece([fR, fC]);
	if(p === null) {
		return;
	} else {
		if(p.player === 0) {
			bState.whitePieces.update(p, [fR,fC], [tR,tC]);
		} else {
			bState.blackPieces.update(p, [fR,fC], [tR,tC]);
		}

		bState.board[fR][fC] = null;
		bState.board[tR][tC] = p;
	}
}

test('GameContainer is rendered', () => {
	render(<GameContainer />);

	expect(screen.getAllByTestId('game-container')).toHaveLength(1);
});

const renderCheckScenario1 = moveString => {
	const bState = new BoardState();

	removePiece([7,5], bState);
	removePiece([0,5], bState);
	removePiece([6,5], bState);
	removePiece([6,6], bState);
	removePiece([6,7], bState);
	removePiece([1,5], bState);
	removePiece([1,6], bState);
	removePiece([1,7], bState);


	changePosition([1,0], [3,0], bState);
	changePosition([0,0], [2,0], bState);
	changePosition([1,3], [3,2], bState);
	changePosition([1,4], [3,1], bState);
	changePosition([1,1], [2,1], bState);
	changePosition([7,7], [0,5], bState);
	changePosition([0,1], [1,3], bState);
	changePosition([0,3], [5,5], bState);
	changePosition([7,6], [0,3], bState);

	render(<GameContainer turn={1} boardState={bState} />);
	fireEvent.change(screen.getByTestId('move'), {
		target: {
			value: moveString
		}
	});
	fireEvent.click(screen.getByTestId('button'));

	return bState;
}

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.1)', () => {
	const bState = renderCheckScenario1('B4 A6')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('knight');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.2)', () => {
	const bState = renderCheckScenario1('F6 A6')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('queen');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.3)', () => {
	const bState = renderCheckScenario1('a5 A6')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('king');
});
