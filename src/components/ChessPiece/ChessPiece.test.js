import React from 'react';
import { render, screen } from '@testing-library/react';
import ChessPiece from './';

jest.mock('../../../node_modules/@fortawesome/react-fontawesome');

test('Generic piece has correct aria label', () => {
	const { rerender } = render(<ChessPiece type="GENERIC" />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white generic');
	rerender(<ChessPiece type="GENERIC" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black generic');
});

test('Pawn has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="PAWN" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white pawn');

	rerender(<ChessPiece type="PAWN" black />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black pawn');
});

test('Rook has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="ROOK" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white rook');

	rerender(<ChessPiece type="ROOK" black />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black rook');
});

test('Knight has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="KNIGHT" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white knight');

	rerender(<ChessPiece type="KNIGHT" black />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black knight');
});

test('Bishop has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="BISHOP" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white bishop');
	rerender(<ChessPiece type="BISHOP" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black bishop');
});

test('King has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="KING" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white king');
	rerender(<ChessPiece type="KING" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black king');
});

test('Queen has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="QUEEN" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white queen');
	rerender(<ChessPiece type="QUEEN" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black queen');
});
