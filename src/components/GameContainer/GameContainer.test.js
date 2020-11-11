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
	const bState = await renderCheckScenario1('D7 F8')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('knight');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.2)', async () => {
	const bState = await renderCheckScenario1('F3 F8')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('queen');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.3)', async () => {
	const bState = await renderCheckScenario1('e8 F8')
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('king');
});

test('Check error is displayed', async () => {
	const bState = new BoardState();
	render(<GameContainer boardState={bState} />);

	await makeMove('f2 f3');
	await makeMove('e7 e5');
	await makeMove('h2 h3');
	await makeMove('d8 h4');
	await makeMove('h1 h2');

	expect(screen.getByTestId('error')).toHaveTextContent('That move puts you in check');
});

test('Fool\'s mate', async () => {
	render(<GameContainer />);
	expect(screen.getByTestId('move')).toBeEnabled();
	expect(screen.getByTestId('button')).toBeEnabled();

	await makeMove('F2 F3');
	await makeMove('e7 e5');
	await makeMove('G2 g4');
	await makeMove('d8 H4');

	expect(screen.getByTestId('move')).toBeDisabled();
	expect(screen.getByTestId('button')).toBeDisabled();
	expect(screen.getByTestId('winner')).toHaveTextContent('White wins');
});

test('Total captured count updates', async () => {
	const bState = new BoardState();

	render(<GameContainer boardState={bState} />);

	await makeMove('A2 A4');
	// await makeMove('G1 E1');

	// await makeMove('B2 D2');
	await makeMove('B7 B5');


	expect(screen.getByTestId('black-captured-total')).toHaveTextContent('Captured (0)');

	// await makeMove('E1 D2');
	await makeMove('A4 B5');

	expect(screen.getByTestId('black-captured-total')).toHaveTextContent('Captured (1)');
});

test('Pieces change position in the UI after being moved', async () => {
	const bState = new BoardState([
		{ type: 'pawn', player: 0, position: [6,0] }
	]);

	render(<GameContainer boardState={bState} />);


	expect(within(screen.getByTestId('A2'))
		.getAllByAltText('white pawn')).toHaveLength(1);

	await makeMove('A2 A3');

	expect(screen.getByTestId('A2')).toBeEmptyDOMElement();

	expect(within(screen.getByTestId('A3'))
		.getAllByAltText('white pawn')).toHaveLength(1);
});

test('Pawn is swapped in the UI after selecting a piece to promote', async () => {
	const bState = new BoardState([
		{ type: 'rook', player: 0, position: [6,0] },
		{ type: 'queen', player: 1, position: [5,0] },
		{ type: 'pawn', player: 0, position: [1,0] }
	]);

	render(<GameContainer turn={1} boardState={bState} />);


	await makeMove('a3 a2');

	await makeMove('a7 a8');

	fireEvent.click(screen.getByTestId('swap-graphic'));

	expect(within(screen.getByTestId('A8'))
		.getAllByAltText('white rook')).toHaveLength(1);
	expect(() => within(screen.getByTestId('A8'))
		.getAllByAltText('white pawn')).toThrow();

});
