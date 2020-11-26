import React from 'react';
import { within, render, screen, cleanup, fireEvent } from '@testing-library/react';

import GameContainer from './';
import BoardState from '../../game/BoardState';

afterEach(cleanup);

const user = {
	loading: false,
	data: 'user'
}

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
	render(<GameContainer user={user} />);

	expect(screen.getAllByTestId('game-container')).toHaveLength(1);
});

const makeMove = async moveString => {
	fireEvent.change(screen.getByTestId('move-textbox'), {
		target: {
			value: moveString
		}
	});
	fireEvent.click(screen.getByTestId('move-submit'));

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

	render(<GameContainer user={user} turn={1} boardState={bState} />);
	await makeMove(moveString);

	return bState;
}

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.1)', async () => {
	const bState = await renderCheckScenario1('D7 F8')
	expect(screen.getByTestId('move-feedback')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('knight');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.2)', async () => {
	const bState = await renderCheckScenario1('F3 F8')
	expect(screen.getByTestId('move-feedback')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('queen');
});

test('Capturing a piece to get out of check does not cause an error message to be displayed (scenario 1.3)', async () => {
	const bState = await renderCheckScenario1('e8 F8')
	expect(screen.getByTestId('move-feedback')).toBeEmptyDOMElement();
	expect(bState.getPiece([0,5]).type).toEqual('king');
});

test('Check error is displayed', async () => {
	const bState = new BoardState();
	render(<GameContainer user={user} boardState={bState} />);

	await makeMove('f2 f3');
	await makeMove('e7 e5');
	await makeMove('h2 h3');
	await makeMove('d8 h4');
	await makeMove('h1 h2');

	expect(screen.getByTestId('move-feedback')).toHaveTextContent('That move leaves you in check');
});

test('Fool\'s mate', async () => {
	render(<GameContainer user={user} />);
	expect(screen.getByTestId('move-textbox')).toBeEnabled();
	expect(screen.getByTestId('move-submit')).toBeEnabled();

	await makeMove('F2 F3');
	await makeMove('e7 e5');
	await makeMove('G2 g4');
	await makeMove('d8 H4');

	expect(screen.getByTestId('move-textbox')).toBeDisabled();
	expect(screen.getByTestId('move-submit')).toBeDisabled();
	expect(screen.getByTestId('winner')).toHaveTextContent('Black wins!');
});

test('Pieces change position in the UI after being moved', async () => {
	const bState = new BoardState([
		{ type: 'pawn', player: 0, position: [6,0] }
	]);

	render(<GameContainer user={user} boardState={bState} />);


	expect(within(screen.getByTestId('A2'))
		.getAllByLabelText('white pawn')).toHaveLength(2);

	await makeMove('A2 A3');

	expect(within(screen.getByTestId('A2'))
		.getByTestId('piece-container')).toBeEmptyDOMElement();

	expect(within(screen.getByTestId('A3'))
		.getAllByLabelText('white pawn')).toHaveLength(2);
});

test('Pawn is swapped in the UI after selecting a piece to promote', async () => {
	const bState = new BoardState([
		{ type: 'rook', player: 0, position: [6,0] },
		{ type: 'queen', player: 1, position: [5,0] },
		{ type: 'pawn', player: 0, position: [1,0] }
	]);

	render(<GameContainer user={user} turn={1} boardState={bState} />);


	await makeMove('a3 a2');

	await makeMove('a7 a8');

	fireEvent.click(screen.getByTestId('swap-button'));

	expect(within(screen.getByTestId('A8'))
		.getAllByLabelText('white rook')).toHaveLength(2);
	expect(() => within(screen.getByTestId('A8'))
		.getAllByLabelText('white pawn')).toThrow();

});

test('Blocking a piece to get out of check does not display an error message', async () => {
	const bState = new BoardState();

	render(<GameContainer user={user} boardState={bState} />);

	await makeMove('e2 e4');
	await makeMove('d7 d5');
	await makeMove('f1 b5');

	await makeMove('d8 d7');

	expect(screen.getByTestId('move-feedback')).toBeEmptyDOMElement();
});


test('Pieces are added to the correct captured list', async () => {
	const bState = new BoardState();

	render(<GameContainer user={user} boardState={bState} />);
	await makeMove('a2 a4');
	await makeMove('b7 b5');
	await makeMove('a4 b5');

	expect(within(screen.getAllByTestId('capturedContainer')[0])
		.getAllByLabelText('black pawn')).toHaveLength(1);
	expect(() => within(screen.getAllByTestId('capturedContainer')[1])
		.getAllByLabelText('black pawn')).toThrow();

	await makeMove('c8 b7');
	await makeMove('a1 a6');
	await makeMove('b7 a6');

	expect(within(screen.getAllByTestId('capturedContainer')[1])
		.getAllByTestId('captured-graphic')).toHaveLength(1);
	expect(within(screen.getAllByTestId('capturedContainer')[1])
		.getAllByTestId('captured-graphic')).toHaveLength(1);

	expect(() => within(screen.getAllByTestId('capturedContainer')[0])
		.getAllByLabelText('black pawn')).toThrow();
	expect(within(screen.getAllByTestId('capturedContainer')[1])
		.getAllByLabelText('black pawn')).toHaveLength(1);

	expect(() => within(screen.getAllByTestId('capturedContainer')[1])
		.getAllByLabelText('white rook')).toThrow();
	expect(within(screen.getAllByTestId('capturedContainer')[0])
		.getAllByLabelText('white rook')).toHaveLength(1);
});
