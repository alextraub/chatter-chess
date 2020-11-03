import React from 'react';
import {cleanup, render, screen} from "@testing-library/react";
import CapturedPieces from "./";
import '@testing-library/jest-dom/extend-expect';
import {Bishop, Knight, Rook, Queen} from "../../game/Piece";
import BoardState from "../../game/BoardState";
import SwapPieces from "./";

jest.mock('../../game/BoardState.js');
jest.mock('../ChessPiece/pieceImages.js');
// jest.mock('../GameContainer.js');

afterEach(cleanup);

const boardState = new BoardState();
const whiteRook = new Rook(boardState, 0);
const whiteBishop = new Bishop(boardState, 0);
const whiteKnight = new Knight(boardState, 0);
const whiteQueen = new Queen(boardState, 0);
const blackRook = new Rook(boardState, 1);
const blackBishop = new Bishop(boardState, 1);
const blackKnight = new Knight(boardState, 1);
const blackQueen = new Queen(boardState, 1);

const whitePieces = {
	black: 0,
	type: {
		rook: [whiteRook],
		bishop: [whiteBishop],
		knight: [whiteKnight],
		queen: [whiteQueen]
	}
};
const blackPieces = {
	count: 4,
	pieces: {
		rook: [blackRook],
		bishop: [blackBishop],
		knight: [blackKnight],
		queen: [blackQueen]
	}
};


test('Component renders', () => {
	const { getByTestId, rerender } = render(<SwapPieces swapList={whitePieces} performSwap={jest.fn()} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();

	rerender(<SwapPieces swapList={blackPieces} performSwap={jest.fn()} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();
});

