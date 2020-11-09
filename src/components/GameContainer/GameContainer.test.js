import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import GameContainer from './';
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

const makeMove = moveString => {
	fireEvent.change(screen.getByTestId('move'), {
		target: {
			value: moveString
		}
	});
	fireEvent.click(screen.getByTestId('button'));
}

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
	makeMove(moveString);

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

test('Fool\'s mate', () => {
	render(<GameContainer />);
	makeMove('G6 F6');
	makeMove('b5 d5');
	makeMove('G7 e7');
	makeMove('a4 E8');

	expect(screen.getByTestId('move')).toBeDisabled();
	expect(screen.getByTestId('button')).toBeDisabled();
	expect(screen.getByTestId('winner')).toHaveTextContent('White wins');
});

test('Total captured count updates', () => {
	render(<GameContainer />);

	makeMove('G1 E1');
	makeMove('B2 D2');

	expect(screen.getByTestId('black-captured-total')).toHaveTextContent('Captured (0)');

	makeMove('E1 D2');

	expect(screen.getByTestId('black-captured-total')).toHaveTextContent('Captured (1)');
});