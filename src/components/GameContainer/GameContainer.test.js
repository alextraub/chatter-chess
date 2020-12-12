import React from 'react';
import { within, render, screen, cleanup, fireEvent } from '@testing-library/react';

import GameContainer from './';
import BoardState from '../../game/BoardState';
import GameState from '../../game/GameState';
import Piece from '../../game/Piece';

afterEach(cleanup);


const removePiece = ([r,c], bState) => {
	const p = bState.getPiece([r,c]);
	if(p === null) {
		return;
	} else {
		const qP = Piece.asQueryObject(p, [r,c]);
		if(p.player === 0) {
			bState.whitePieces.remove(qP);
		} else {
			bState.blackPieces.remove(qP);
		}
		bState.board[r][c] = null;
	}
}

const changePosition = ([fR,fC], [tR, tC], bState) => {
	const p = bState.getPiece([fR, fC]);
	if(p === null) {
		return;
	} else {
		const oldP = Piece.asQueryObject(p, [fR, fC]);
		const newP = Piece.asQueryObject(p, [tR, tC]);
		if(p.player === 0) {
			bState.whitePieces.update(oldP, newP);
		} else {
			bState.blackPieces.update(oldP, newP);
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

	const gameState = new GameState(1, bState.pieces);
	render(<GameContainer gameState={gameState} />);
	await makeMove(moveString);

	return gameState;
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
	const gameState = new GameState(0, new BoardState().pieces);
	render(<GameContainer gameState={gameState} />);

	await makeMove('f2 f3');
	await makeMove('e7 e5');
	await makeMove('h2 h3');
	await makeMove('d8 h4');
	await makeMove('h1 h2');

	expect(screen.getByTestId('move-feedback')).toHaveTextContent('That move leaves you in check');
});

test('Fool\'s mate', async () => {
	render(<GameContainer gameState={new GameState(0, new BoardState().pieces)} />);
	expect(screen.getByTestId('move-textbox')).toBeEnabled();
	expect(screen.getByTestId('move-submit')).toBeEnabled();

	await makeMove('F2 F3');
	await makeMove('e7 e5');
	await makeMove('G2 g4');
	await makeMove('d8 H4'); //[0,3] -> [5,7]

	expect(screen.getByTestId('move-textbox')).toBeDisabled();
	expect(screen.getByTestId('move-submit')).toBeDisabled();
	expect(screen.getByTestId('winner')).toHaveTextContent('Black wins!');
});

test('Pieces change position in the UI after being moved', async () => {
	const bState = new BoardState([
		{ type: 'PAWN', player: 'WHITE', position: { row: 6, col: 0 }, captured: false }
	]);

	render(<GameContainer gameState={new GameState(0, bState.pieces)} />);


	expect(within(screen.getByTestId('A2'))
		.getAllByLabelText('white pawn')).toHaveLength(2);

	await makeMove('A2 A3');

	expect(within(screen.getByTestId('A2'))
		.getByTestId('piece-container')).toBeEmptyDOMElement();

	expect(within(screen.getByTestId('A3'))
		.getAllByLabelText('white pawn')).toHaveLength(2);
});

test('Pawn is swapped in the UI after selecting a piece to promote', async () => {
	const gameState = new GameState(1, [
		{ type: 'ROOK', player: 'WHITE', captured: false, position: { row: 6, col: 0 } },
		{ type: 'QUEEN', player: 'BLACK', captured: false, position: { row: 5, col: 0 } },
		{ type: 'PAWN', player: 'WHITE', captured: false, position: { row: 1, col: 0 } }
	]);

	render(<GameContainer gameState={gameState} />);


	await makeMove('a3 a2');

	await makeMove('a7 a8');

	fireEvent.click(screen.getByTestId('swap-button'));

	expect(within(screen.getByTestId('A8'))
		.getAllByLabelText('white rook')).toHaveLength(2);
	expect(() => within(screen.getByTestId('A8'))
		.getAllByLabelText('white pawn')).toThrow();

	await makeMove('a8 a7');

	expect(screen.getByTestId('move-feedback')).toHaveTextContent('You may only move a black piece');
});

test('Blocking a piece to get out of check does not display an error message', async () => {
	const bState = new BoardState();

	render(<GameContainer gameState={new GameState(0, bState.pieces)} />);

	await makeMove('e2 e4');
	await makeMove('d7 d5');
	await makeMove('f1 b5');

	await makeMove('d8 d7');

	expect(screen.getByTestId('move-feedback')).toBeEmptyDOMElement();
});


test('Pieces are added to the correct captured list', async () => {

	render(<GameContainer />);
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

test('Moves are rolled back correctly when a move that leaves the player in check is made', async () => {
	const gameState = new GameState(0, require('../../game/BoardState/boards/standardGame').default);
	render(<GameContainer gameState={gameState} />);

	await makeMove('b1 c3');
	await makeMove('b8 c6');
	await makeMove('c3 b5');
	await makeMove('c6 d4');
	await makeMove('e2 e3');
	await makeMove('e7 e6');
	await makeMove('b5 c7');

	await makeMove('d8 f6');
	expect(screen.getByTestId('move-feedback')).toHaveTextContent('That move leaves you in check');

	await makeMove('f6 e5');
	expect(screen.getByTestId('move-feedback')).toHaveTextContent('There isn\'t a piece at f6')
})
