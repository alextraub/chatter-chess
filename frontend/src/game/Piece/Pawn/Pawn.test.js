import Pawn from './';
import BoardState, { mockGetPiece } from '../../../__mocks__/boardStateMock';
import DPiece from '../../../__mocks__/DPiece';

beforeEach(() => {
    BoardState.mockClear();
    mockGetPiece.mockClear();
});

const boardState = new BoardState();
const whitePawn = new Pawn(boardState, 0);
const blackPawn = new Pawn(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => {
    mockGetPiece.mockReturnValue(null);
}

test('pawn can move up 1 square', () => {
    moveToEmptySquare();
    expect(whitePawn.canMove([0, 2], [1, 2])).toBe(true);
    expect(blackPawn.canMove([3, 4], [4, 4])).toBe(true);
});