import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import MoveInput from "./";
import BoardState from '../../game/BoardState';
import DPiece from '../../game/Piece/DPiece';
jest.mock('../../game/BoardState');

const positionUtils = require('../../game/utils/positionUtils');
jest.mock('../../game/utils/positionUtils');

beforeEach(() => {
	BoardState.mockClear();
});

afterEach(cleanup);

const boardState = new BoardState();
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const mockValidMove = fromPiece => {
	boardState.getPiece.mockReturnValueOnce(fromPiece).mockReturnValue(null);
	positionUtils.isValidBoardPositionString.mockReturnValue(true);
	positionUtils.boardPositionToTuple.mockReturnValueOnce([0, 0]).mockReturnValue([0, 1]);
};

const renderMoveInput = (currentPlayer=0, disabled=false) => {
	render(<MoveInput
		currentPlayer={currentPlayer}
		getPiece={boardState.getPiece}
		performMove={jest.fn(() => ({
			then: () => true
		}))}
		disabled={disabled}
	/>);
};

const updateInputValue = async value => {
	fireEvent.change(screen.getByTestId('move'), {
		target: {
			value: value
		}
	});
}

/* Render check */
test('Component renders', () => {
	renderMoveInput();
	expect(screen.getByTestId('move-input')).toBeInTheDocument();
});

/* Text field interactions */
test('User can enter a move', async () => {
	renderMoveInput();
	await updateInputValue("A1 B2")
	expect(screen.getByTestId("move").value).toBe('A1 B2');
});

test('Error message is removed after typing a character in the text field', async () => {
	renderMoveInput();

	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();

	await updateInputValue('a');
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
});

test('Error message is removed after deleting a character in the text field', async () => {
	renderMoveInput();
	await updateInputValue('a');
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();

	await updateInputValue('\b');
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
});

test('Move changes based on what is typed', async () => {
	renderMoveInput();
	await updateInputValue("A1 B2");
	expect(screen.getByTestId("move")).toHaveValue('A1 B2');
	await updateInputValue("A2 B");
	expect(screen.getByTestId("move")).toHaveValue('A2 B');
	updateInputValue("A3 B3");
	expect(screen.getByTestId("move")).toHaveValue('A3 B3');
});

/* Valid input */
test('No error message is displayed when a valid move is entered with all lower case letters', async () => {
	await renderMoveInput();
	await updateInputValue("c1 a3")
	mockValidMove(whitePiece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
});

test('No error message is displayed when a valid move is entered with all capital letters', () => {
	renderMoveInput(1);
	updateInputValue("F3 A7")
	mockValidMove(blackPiece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
});

test('No error message is displayed when a valid move is entered with with a mix of upper and lower case letters', async () => {
	await renderMoveInput();
	await updateInputValue("g6 B7");
	mockValidMove(whitePiece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();

	cleanup();
	renderMoveInput(1);
	await updateInputValue("H1 e3");
	mockValidMove(blackPiece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toBeEmptyDOMElement();
});

/* Invalid input */
test('Display an error message when no move is submitted', () => {
	renderMoveInput();
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('Please provide a move');
});

test('Display correct error message when only 1 position is provided', () => {
	renderMoveInput();
	updateInputValue("C5")
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('Please provide a position to move to');
});

test('Display correct error message if too many positions are provided', () => {
	renderMoveInput();
	updateInputValue("A1 b2 C3");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('You may only move a piece to one position at a time');
});

test('Display correct error message when the first of 2 positions is invalid', () => {
	renderMoveInput();

	positionUtils.isValidBoardPositionString.mockReturnValueOnce(false).mockReturnValue(true);
	updateInputValue("2g g2");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('2g is not a valid position');

	cleanup();
	renderMoveInput(1);
	positionUtils.isValidBoardPositionString.mockReturnValueOnce(false).mockReturnValue(true);
	updateInputValue("B23 E5");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('B23 is not a valid position');
});

test('Display correct error message when the second of 2 positions is invalid', () => {
	renderMoveInput(1);

	positionUtils.isValidBoardPositionString.mockReturnValueOnce(true).mockReturnValue(false);
	updateInputValue("E8 z7");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('z7 is not a valid position');

	cleanup();
	renderMoveInput();
	positionUtils.isValidBoardPositionString.mockReturnValueOnce(true).mockReturnValue(false);
	updateInputValue("c2 H");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('H is not a valid position');
});

test('Display correct error message when both provided positions are not valid', () => {
	renderMoveInput();
	positionUtils.isValidBoardPositionString.mockReturnValue(false);
	updateInputValue("1A 2B");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('1A and 2B are not valid positions');
	updateInputValue("J9 z7");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('J9 and z7 are not valid positions');
	updateInputValue("a12 B23");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('a12 and B23 are not valid positions');
	updateInputValue("C H");
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('C and H are not valid positions');
});

/* Piece selection error messages */
test('Display an error when trying to move a piece that is not at the provided position', () => {
	renderMoveInput();
	updateInputValue("D2 E2");
	mockValidMove(null);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('There isn\'t a piece at D2');
});

test('Display correct error message when attempting to move a black piece during white\'s turn', () => {
	renderMoveInput();
	updateInputValue("E5 G2");
	mockValidMove(blackPiece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('You may only move a white piece');
});

test('Display correct error message when attempting to move a white piece during black\'s turn', () => {
	renderMoveInput(1);
	updateInputValue("a4 d8");
	mockValidMove(whitePiece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('You may only move a black piece');
});

/* Error messages returned from a Piece class instance */
test('Displays piece specific error messages', () => {
	renderMoveInput();
	updateInputValue('g8 c1');
	const piece = new DPiece(boardState);
	mockValidMove(piece);
	piece.canMove = jest.fn(() => 'Error');
	boardState.getPiece.mockReturnValue(piece);
	fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('Error');
});

test('Move input is disabled if it has disabled prop', () => {
	renderMoveInput(0, true);
	expect(screen.getByTestId('move')).toBeDisabled();
});

test('Move input is enabled if it has disabled=false prop', () => {
	renderMoveInput(1);
	expect(screen.getByTestId('move')).not.toBeDisabled();
});

test('Move submit button is disabled if it has disabled prop', () => {
	renderMoveInput(1, true);
	expect(screen.getByTestId('button')).toBeDisabled();
});

test('Move submit button is enabled if it has disabled=false prop', () => {
	renderMoveInput();
	expect(screen.getByTestId('button')).not.toBeDisabled();
});

test('Check errors are displayed for moving into check', async () => {
	await render(<MoveInput
		currentPlayer={0}
		getPiece={boardState.getPiece}
		performMove={jest.fn(() => false)}
		check={{previous: false, status: true}}
	/>);
	mockValidMove(new DPiece(boardState));
	await updateInputValue('A4 E4');
	await fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('That move puts you in check');
});

test('Check errors are displayed for remaining in check', async () => {
	await render(<MoveInput
		currentPlayer={0}
		getPiece={boardState.getPiece}
		performMove={jest.fn(() => false)}
		check={{previous: true, status: true}}
	/>);
	mockValidMove(new DPiece(boardState));
	await updateInputValue('A4 E4');
	await fireEvent.click(screen.getByTestId('button'));
	expect(screen.getByTestId('error')).toHaveTextContent('That move leaves you in check');
})
