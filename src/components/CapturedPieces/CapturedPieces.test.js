import React from 'react';
import {cleanup, render, screen} from "@testing-library/react";
import CapturedPieces from "./";
import {Bishop, Pawn, Rook} from "../../game/Piece";
import BoardState from "../../game/BoardState";

jest.mock('../../game/BoardState');

afterEach(cleanup);

const boardState = new BoardState();
const whitePawn = new Pawn(boardState, 0);
const whiteRook = new Rook(boardState, 0);
const whiteBishop = new Bishop(boardState, 0);
const blackPawn = new Pawn(boardState, 1);
const blackRook = new Rook(boardState, 1);
const blackBishop = new Bishop(boardState, 1);
const whitePieces = {
	pawn: [whitePawn],
	rook: [whiteRook],
	knight: [],
	bishop: [whiteBishop],
	queen: [],
	king: [],
	generic: []
};
const blackPieces = {
	pawn: [blackPawn, blackPawn],
	rook: [blackRook],
	knight: [],
	bishop: [blackBishop],
	queen: [],
	king: [],
	generic: []
};


test('Component renders', () => {
	const { getByTestId, rerender } = render(<CapturedPieces pieces={whitePieces} />);
	expect(getByTestId('capturedContainer')).toBeInTheDocument();

	rerender(<CapturedPieces black pieces={blackPieces} />);
	expect(getByTestId('capturedContainer')).toBeInTheDocument();

	rerender(<CapturedPieces pieces={blackPieces} />)
	expect(getByTestId('capturedContainer')).toBeInTheDocument();

	rerender(<CapturedPieces black pieces={whitePieces} />)
	expect(getByTestId('capturedContainer')).toBeInTheDocument();
});


test('Component displays captured white pieces', () => {
	const { getAllByTestId } = render(<CapturedPieces pieces={whitePieces} />);
	expect(getAllByTestId('captured-graphic')).toHaveLength(3);
});

test('Component displays captured black pieces', () => {
	render(<CapturedPieces black pieces={blackPieces} />);
	expect(screen.getAllByTestId('captured-graphic')).toHaveLength(3);
});
