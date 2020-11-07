import React from 'react';
jest.mock('./pieceImages.js');
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


import ChessPiece from './';


afterEach(cleanup);

test('Generic piece has x as text content', () => {
	const { rerender } = render(<ChessPiece type="generic" />);

	expect(screen.getByTestId('chess-piece')).toHaveTextContent('x');
	rerender(<ChessPiece type="generic" black />);
	expect(screen.getByTestId('chess-piece')).toHaveTextContent('x');
});

test('Pawn has correct alt text', () => {
	const  { rerender } = render(<ChessPiece type="pawn" />)
	expect(screen.getAllByAltText('white pawn')).toHaveLength(1);
	expect(() => screen.getAllByAltText('black pawn')).toThrow();


	rerender(<ChessPiece type="pawn" black />);

	expect(screen.getAllByAltText('black pawn')).toHaveLength(1);
	expect(() => screen.getAllByAltText('white pawn')).toThrow();
});

test('Rook has correct alt text', () => {
	const  { rerender } = render(<ChessPiece type="rook" />)
	expect(screen.getAllByAltText('white rook')).toHaveLength(1);
	expect(() => screen.getAllByAltText('black rook')).toThrow();


	rerender(<ChessPiece type="rook" black />);

	expect(screen.getAllByAltText('black rook')).toHaveLength(1);
	expect(() => screen.getAllByAltText('white rook')).toThrow();
});

test('Knight has correct alt text', () => {
	const  { rerender } = render(<ChessPiece type="knight" />)
	expect(screen.getAllByAltText('white knight')).toHaveLength(1);
	expect(() => screen.getAllByAltText('black knight')).toThrow();


	rerender(<ChessPiece type="knight" black />);

	expect(screen.getAllByAltText('black knight')).toHaveLength(1);
	expect(() => screen.getAllByAltText('white knight')).toThrow();
});

test('Bishop has correct alt text', () => {
	const  { rerender } = render(<ChessPiece type="bishop" />)
	expect(screen.getAllByAltText('white bishop')).toHaveLength(1);
	expect(() => screen.getAllByAltText('black bishop')).toThrow();


	rerender(<ChessPiece type="bishop" black />);

	expect(screen.getAllByAltText('black bishop')).toHaveLength(1);
	expect(() => screen.getAllByAltText('white bishop')).toThrow();
});

test('Pawn has correct alt text', () => {
	const  { rerender } = render(<ChessPiece type="king" />)
	expect(screen.getAllByAltText('white king')).toHaveLength(1);
	expect(() => screen.getAllByAltText('black king')).toThrow();


	rerender(<ChessPiece type="king" black />);

	expect(screen.getAllByAltText('black king')).toHaveLength(1);
	expect(() => screen.getAllByAltText('white king')).toThrow();
});

test('Queen has correct alt text', () => {
	const  { rerender } = render(<ChessPiece type="queen" />)
	expect(screen.getAllByAltText('white queen')).toHaveLength(1);
	expect(() => screen.getAllByAltText('black queen')).toThrow();


	rerender(<ChessPiece type="queen" black />);

	expect(screen.getAllByAltText('black queen')).toHaveLength(1);
	expect(() => screen.getAllByAltText('white queen')).toThrow();
});
