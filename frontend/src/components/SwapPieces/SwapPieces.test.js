import React from 'react';
import {cleanup, render} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SwapPieces from "./";

jest.mock('../ChessPiece/pieceImages.js');

afterEach(cleanup);

const wRook = {type: 'rook', black: false};
const bRook = {type: 'rook', black: true};
const wKnight = {type: 'knight', black: false};
const bKnight = {type: 'knight', black: true};
const wBishop = {type: 'bishop', black: false};
const bBishop = {type: 'bishop', black: true};
const wQueen = {type: 'queen', black: false};
const bQueen = {type: 'queen', black: true};

test('Component renders', () => {
	const swap = jest.fn();
	const { getByTestId, rerender } = render(<SwapPieces swapList={[]} performSwap={swap} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();

	rerender(<SwapPieces swapList={[]} performSwap={swap} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();
});

test('performSwap is called with one white piece', () => {
	const swap = jest.fn();
	const { getByTestId } = render(<SwapPieces swapList={[wRook]} performSwap={swap} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();
	expect(swap).toHaveBeenCalled();
});

test('performSwap is called with multiple white pieces', () => {
	const swap = jest.fn();
	const { getByTestId } = render(<SwapPieces swapList={[wRook, wKnight, wBishop, wQueen]} performSwap={swap} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();
	expect(swap).toHaveBeenCalled();
});

test('performSwap is called with one black piece', () => {
	const swap = jest.fn();
	const { getByTestId } = render(<SwapPieces swapList={[bRook]} performSwap={swap} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();
	expect(swap).toHaveBeenCalled();
});

test('performSwap is called with multiple black pieces', () => {
	const swap = jest.fn();
	const { getByTestId } = render(<SwapPieces swapList={[bRook, bKnight, bBishop, bQueen]} performSwap={swap} />);
	expect(getByTestId('swapPieces')).toBeInTheDocument();
	expect(swap).toHaveBeenCalled();
});




