import Piece from '../Piece';
import { boardPositionToString } from '../../utils/boardPosition';

export default class Pawn extends Piece {
	get type() {
		return 'pawn';
	}

	canMove([fromRow, fromCol], [toRow, toCol], mode=0) {
		const validFinalPosition = super.canMove([fromRow, fromCol], [toRow, toCol], mode);
		if (!validFinalPosition || typeof(validFinalPosition) === 'string') {
			return validFinalPosition;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;

		// Horizontal check
		if(numCols !== 0 && numRows === 0) {
			return mode === 0 ?
				false : `A ${this.type} cannot move horizontally`;
		}

		// Backwards check
		if((this.isWhite() && numRows > 0) || (this.isBlack() && numRows < 0)) {
			return mode === 0 ?
				false : `A ${this.type} cannot move backwards`;
		}

		// Forward checks
		if(numCols === 0) {
			// Over 2 forward check
			if(Math.abs(numRows) > 2) {
				return mode === 0 ?
					false : `A ${this.type} cannot move ${Math.abs(numRows)} squares forward`;
			} else if(Math.abs(numRows) == 2) {
				// Hasn't moved checks
				if((this.isWhite() && fromRow !== 6) || (this.isBlack() && fromRow !== 1)) {
					return mode === 0 ?
						false : `A ${this.type} can only move forward 2 squares if it hasn't moved yet`;
				} else {
					// Path not blocked checks
					const rowDiff = this.isWhite() ? -1 : 1;
					const squareCheck = this.isNextSquareInPathEmpty([fromRow + rowDiff, fromCol], mode);
					if(squareCheck !== true) {
						return squareCheck;
					}
				}
			}

			// Final forward location checks
			const piece = this.boardState.getPiece([toRow, toCol]);
			if(piece === null) {
				return true; // Empty square
			} else if(mode === 0) {
				return false;
			} else if(piece.player === this.player) {
				return `You already have a piece at ${boardPositionToString([toRow, toCol])}`;
			} else {
				return `A ${this.type} can only capture a piece 1 square diagonally in front of it`;
			}
		}

		// Forward diagonal checks (backwards diagonal checks were
		// already handled in the earlier backwards check)
		if(Math.abs(numCols) === Math.abs(numRows)) {
			// Detailed erros on why diagonal move is invalid
			if(Math.abs(numRows) > 1) {
				const piece = this.boardState.getPiece([toRow, toCol]);
				if(piece !== null && piece.player !== this.player) {
					return mode === 0 ?
						false : `A ${this.type} can only capture a piece 1 square diagonally in front of it`;
				} else {
					return mode === 0 ?
						false : `A ${this.type} cannot move diagonally`;
				}
			} else {
				// Valid capture move
				const piece = this.boardState.getPiece([toRow, toCol]);
				if(piece === null) {
					return mode === 0 ?
						false : `There is no piece to capture at ${boardPositionToString([toRow, toCol])}`;
				} else if(piece.player !== this.player) {
					return true;
				}
			}
		}

		// Catch all other invalid possible moves
		return mode === 0 ?
			false : `A ${this.type} can only move:\n`
			+ '1. Capture pieces 1 square diagonally in front of it\n'
			+ '2. 2 squares forward if it hasn\'t moved yet\n'
			+ '3. 1 square forward'
	}
}
