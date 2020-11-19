import React from 'react';
import { render, screen } from '@testing-library/react';
import ChessPiece from './';

jest.mock('../../../node_modules/@fortawesome/react-fontawesome');

test('Generic piece has correct aria label', () => {
	const { rerender } = render(<ChessPiece type="generic" />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white generic');
	rerender(<ChessPiece type="generic" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black generic');
});

test('Pawn has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="pawn" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white pawn');

	rerender(<ChessPiece type="pawn" black />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black pawn');
});

test('Rook has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="rook" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white rook');

	rerender(<ChessPiece type="rook" black />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black rook');
});

test('Knight has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="knight" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white knight');

	rerender(<ChessPiece type="knight" black />);

	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black knight');
});

test('Bishop has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="bishop" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white bishop');
	rerender(<ChessPiece type="bishop" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black bishop');
});

test('King has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="king" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white king');
	rerender(<ChessPiece type="king" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black king');
});

test('Queen has correct aria label', () => {
	const  { rerender } = render(<ChessPiece type="queen" />)
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'white queen');
	rerender(<ChessPiece type="queen" black />);
	expect(screen.getByTestId('chess-piece')).toHaveAttribute('aria-label', 'black queen');
});
