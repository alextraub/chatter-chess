import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MoveInput from "./";
import BoardState from '../../game/BoardState';
import DPiece from '../../__mocks__/DPiece';
jest.mock('../../game/BoardState.js');

const positionUtils = require('../../game/utils/boardPosition');
jest.mock('../../game/utils/boardPosition.js');

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

const mockInvalidMove = fromPiece => {
	boardState.getPiece.mockReturnValueOnce(fromPiece).mockReturnValue(null);
	positionUtils.isValidBoardPositionString.mockReturnValue(false);
};

const renderMoveInput = (getPiece=jest.fn(), currentPlayer=0) => (
	render(<MoveInput currentPlayer={currentPlayer} getPiece={getPiece} onMoveSuccess={jest.fn()}/>)
);

test('Component renders', () => {
	render(<MoveInput getPiece={jest.fn()}/>);
});

test('User can enter a move', () => {
	const { getByTestId } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	expect(getByTestId("move").value).toBe('A1 B2');
});

test('Move changes based on what is typed', () => {
	const { getByTestId } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	expect(getByTestId("move").value).toBe('A1 B2');
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A2 B3"
		}
	});
	expect(getByTestId("move").value).toBe('A2 B3');
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A3 B4"
		}
	});
	expect(getByTestId("move").value).toBe('A3 B4');
});


test('Validates that move is in correct form', () => {
	const { getByTestId, getByText } = renderMoveInput(boardState.getPiece);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	mockValidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).toThrow();
});

test('Validates that black piece cannot move during white turn', () => {
	const { getByTestId, getByText } = renderMoveInput(boardState.getPiece);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	mockInvalidMove(blackPiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that white piece cannot move during black turn', () => {
	const { getByTestId, getByText } = renderMoveInput(boardState.getPiece, 1);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates you can enter a correct move in lowercase as well', () => {
	const { getByTestId, getByText } = renderMoveInput(boardState.getPiece, 1);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "a1 b2"
		}
	});
	mockValidMove(blackPiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).toThrow();
});

test('Validates you cant move empty square', () => {
	const { getByTestId, getByText } = renderMoveInput(boardState.getPiece);
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "D2 E2"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that move is in incorrect form', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "1A 2B"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that move is out of range', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "J9 Z7"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that move cannot have 3 positions', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1 B2 C3"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that move cannot have 1 position', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A1"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that moves dont have more than 2 characters', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A12 B23"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that moves dont have less than 2 characters', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: "A B"
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});

test('Validates that move has been entered', () => {
	const { getByTestId, getByText } = renderMoveInput();
	fireEvent.change(getByTestId("move"), {
		target: {
			value: ""
		}
	});
	mockInvalidMove(whitePiece);
	fireEvent.click(getByTestId('button'));
	expect(() => getByText('Invalid Move')).not.toThrow();
});




