import React from 'react';
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import SwapPieces from "./";

afterEach(cleanup);

const wRook = {type: 'rook', black: false};
const bRook = {type: 'rook', black: true};
const wKnight = {type: 'knight', black: false};
const bKnight = {type: 'knight', black: true};
const wBishop = {type: 'bishop', black: false};
const bBishop = {type: 'bishop', black: true};
const wQueen = {type: 'queen', black: false};
const bQueen = {type: 'queen', black: true};

test('Component renders', async () => {
	const promote = jest.fn();
	const { getByTestId, rerender } = await render(<SwapPieces open swapList={[]} performPromotion={promote} />);
	expect(screen.getByTestId('swap-pieces')).toBeInTheDocument();

	rerender(<SwapPieces swapList={[]} performPromotion={promote} />);
	expect(getByTestId('swap-pieces')).toBeInTheDocument();
});

test('performSwap is called with one white piece', async () => {
	const promote = jest.fn();
	const { getAllByTestId } = render(<SwapPieces open swapList={[wRook]} performPromotion={() => {promote()}} />);
	fireEvent.click(getAllByTestId('swap-button')[0]);
	expect(promote).toHaveBeenCalled();
});

test('performSwap is called with multiple white pieces', () => {
	cleanup();
	const promote = jest.fn();
	const { getAllByTestId } = render(<SwapPieces open swapList={[wRook, wKnight, wBishop, wQueen]} performPromotion={promote} />);
	fireEvent.click(getAllByTestId('swap-button')[1]);
	expect(promote).toHaveBeenCalled();
});

test('performSwap is called with one black piece', () => {
	const promote = jest.fn();
	const { getAllByTestId } = render(<SwapPieces open swapList={[bRook]} performPromotion={promote} />);
	fireEvent.click(getAllByTestId('swap-button')[0]);
	expect(promote).toHaveBeenCalled();
});

test('performSwap is called with multiple black pieces', () => {
	const promote = jest.fn();
	const { getAllByTestId } = render(<SwapPieces open swapList={[bRook, bKnight, bBishop, bQueen]} performPromotion={promote} />);
	fireEvent.click(getAllByTestId('swap-button')[1]);
	expect(promote).toHaveBeenCalled();
});
