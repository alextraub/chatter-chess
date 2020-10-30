import React from 'react';
import {cleanup, render} from "@testing-library/react";
import CapturedPieces from "../CapturedPieces";
import '@testing-library/jest-dom/extend-expect';
import DPiece from '../../__mocks__/DPiece';
import {Bishop, Pawn, Rook} from "../../game/Piece";
import BoardState from "../../game/BoardState";

afterEach(cleanup);

const boardState = new BoardState();
const whitePawn = new DPiece(boardState, 0) instanceof Pawn;
const whiteRook = new DPiece(boardState, 0) instanceof Rook;
const whiteBishop = new DPiece(boardState, 0) instanceof Bishop;
const blackPawn = new DPiece(boardState, 1) instanceof Pawn;
const blackRook = new DPiece(boardState, 1) instanceof Rook;
const blackBishop = new DPiece(boardState, 1) instanceof Bishop;

const renderCapturedPieces = (whitePieces=[whitePawn, whiteRook, whiteBishop], blackPieces=[blackPawn, blackRook, blackBishop]) => (
	render(<CapturedPieces whitePieces={whitePieces} blackPieces={blackPieces}/>)
);

test('Component renders', () => {
	renderCapturedPieces(<CapturedPieces />);
});

test('Component displays correct amount of captured white pieces', () => {
	const { getByText } = renderCapturedPieces(<CapturedPieces />);
	expect(getByText('Captured White Pieces: 3')).toBeTruthy();
});

test('Component displays correct amount of captured black pieces', () => {
	const { getByText } = renderCapturedPieces(<CapturedPieces />);
	expect(getByText('Captured Black Pieces: 3')).toBeTruthy();
});

test('Component displays captured white pieces', () => {
	const { getByAltText } = renderCapturedPieces(<CapturedPieces />);
	expect(getByAltText('wpawn')).toBeTruthy();
});





