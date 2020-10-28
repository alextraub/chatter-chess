import Pawn from './';
import DPiece from '../../../__mocks__/DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState');

beforeEach(() => {
    BoardState.mockClear();
});

const boardState = new BoardState();
const whitePawn = new Pawn(boardState, 0);
const blackPawn = new Pawn(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => {
    boardState.getPiece.mockReturnValue(null);
}

test('pawn can move up 1 square', () => {
    moveToEmptySquare();
    expect(whitePawn.canMove([0, 2], [1, 2])).toBe(true);
    expect(blackPawn.canMove([3, 4], [4, 4])).toBe(true);
});

test('pawn can move up 2 square', () => {
    moveToEmptySquare();
    expect(whitePawn.canMove([0, 2], [2, 2])).toBe(true);
    expect(blackPawn.canMove([3, 4], [5, 4])).toBe(true);
});

test('pawn can move to a square with an enemy piece diagonal', () => {
    boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);
    expect(whitePawn.canMove([0, 0], [1, 1])).toBe(true);
    expect(blackPawn.canMove([0, 0], [1, 1])).toBe(true);
});

test('Pawn cannot move to a square with a piece belonging to the same player', () => {
    boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);

    expect(whitePawn.canMove([2, 1], [3, 1])).toBe(false);
    expect(blackPawn.canMove([2, 1], [3, 1])).toBe(false);
});

test('pawn cannot move horizontally', () => {
    moveToEmptySquare();
    expect(blackPawn.canMove([0, 0], [0, 2])).toBe(false);
    expect(whitePawn.canMove([0, 5], [0, 1])).toBe(false);
});

test('Pawn cannot move to the same position', () => {
    moveToEmptySquare();
    expect(whitePawn.canMove([0, 0], [0, 0])).toBe(false);
});