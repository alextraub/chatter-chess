import React from 'react';
import { within, render, screen, cleanup, fireEvent } from '@testing-library/react';

import GameContainer from './';
import BoardState from '../../game/BoardState';

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

const makeMove = async moveString => {
	fireEvent.change(screen.getByTestId('move'), {
		target: {
			value: moveString
		}
	});
	fireEvent.click(screen.getByTestId('button'));

	return true;
}

const renderCheckScenario1 = async moveString => {
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
	await makeMove(moveString);

	return bState;
}

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.1)', async () => {
	const bState = await renderCheckScenario1('B4 A6')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('knight');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.2)', async () => {
	const bState = await renderCheckScenario1('F6 A6')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('queen');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.3)', async () => {
	const bState = await renderCheckScenario1('a5 A6')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('king');
});

test('Check error is displayed', async () => {
	const bState = new BoardState();

	render(<GameContainer boardState={bState} />);

	await makeMove('G6 F6');
	await makeMove('b5 d5');
	await makeMove('G8 f8');
	await makeMove('a4 E8');
	await makeMove('h8 g8');


	expect(screen.getByTestId('error')).toHaveTextContent('That move puts you in check');
});

test('Fool\'s mate', async () => {
	render(<GameContainer />);
	expect(screen.getByTestId('move')).toBeEnabled();
	expect(screen.getByTestId('button')).toBeEnabled();

	await makeMove('G6 F6');
	await makeMove('b5 d5');
	await makeMove('G7 e7');
	await makeMove('a4 E8');

	expect(screen.getByTestId('move')).toBeDisabled();
	expect(screen.getByTestId('button')).toBeDisabled();
	expect(screen.getByTestId('winner')).toHaveTextContent('White wins');
});

test('Total captured count updates', async () => {
	const bState = new BoardState();

	render(<GameContainer boardState={bState} />);

	await makeMove('G1 E1');
	await makeMove('B2 D2');

	expect(screen.getByTestId('black-captured-total')).toHaveTextContent('Captured (0)');

	await makeMove('E1 D2');

	expect(screen.getByTestId('black-captured-total')).toHaveTextContent('Captured (1)');
});

test('Pieces change position in the UI after being moved', async () => {
	const bState = new BoardState([
		{ type: 'pawn', player: 0, position: [6,0] }
	]);

	render(<GameContainer boardState={bState} />);


	expect(within(screen.getByTestId('G1'))
		.getAllByAltText('white pawn')).toHaveLength(1);

	await makeMove('G1 F1');
	expect(screen.getByTestId('G1')).toBeEmptyDOMElement();

	expect(within(screen.getByTestId('F1'))
		.getAllByAltText('white pawn')).toHaveLength(1);
});

test('Pawn is swapped in the UI after selecting a piece to promote', async () => {
	const bState = new BoardState([
		{ type: 'rook', player: 0, position: [6,0] },
		{ type: 'queen', player: 1, position: [5,0] },
		{ type: 'pawn', player: 0, position: [1,0] }
	]);

	render(<GameContainer turn={1} boardState={bState} />);


	await makeMove('f1 g1');
	await makeMove('b1 a1');
	fireEvent.click(screen.getByTestId('swap-graphic'));

	expect(within(screen.getByTestId('A1'))
		.getAllByAltText('white rook')).toHaveLength(1);
	expect(() => within(screen.getByTestId('A1'))
		.getAllByAltText('white pawn')).toThrow();

});
