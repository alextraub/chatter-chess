import Rook from './';
import DPiece from '../../../__mocks__/DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState');

beforeEach(() => 
{
    BoardState.mockClear();
});

const boardState = new BoardState();
const whiteRook = new Rook(BoardState, 0);
const blackRook = new Rook(BoardState, 1);
const whitePiece = new DPiece(BoardState);
const blackPiece = new DPiece(BoardState, 1);

const moveToEmptySquare = () => 
{
    boardState.getPiece.mockReturnValue(null);
}

test('Rook can move right', () => 
{
    moveToEmptySquare();

    expect(whiteRook.canMove([0, 0], [0, 1])).toBe(true);
    expect(blackRook.canMove([1, 0], [1, 1])).toBe(true);
});

test('Rook can move down', () =>
{
    moveToEmptySquare();

    expect(whiteRook.canMove([0, 0], [1, 0])).toBe(true);
    expect(blackRook.canMove([0, 1], [1, 1])).toBe(true);
});

test('Rook and move left', () =>
{
    moveToEmptySquare();

    expect(whiteRook.canMove([0, 1], [0, 0])).toBe(true);
    expect(blackRook.canMove([1, 1], [1, 0])).toBe(true);
});

test('Rook can move up', () =>
{
    moveToEmptySquare();

    expect(whiteRook.canMove([1, 0], [0, 0])).toBe(true);
    expect(blackRook.canMove([1, 1], [1, 0])).toBe(true);
});

test('Rook can move to a square with a enemy piece', () =>
{
    boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);

    expect(whiteRook.canMove([0, 0], [0, 1])).toBe(true);
    expect(blackRook.canMove([0, 0], [0, 1])).toBe(true);
});

test('Rook can NOT move to a square with an allied piece', () =>
{
    boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);

    expect(whiteRook.canMove([0, 0], [0, 1])).toBe(false);
    expect(blackRook.canMove([0, 0], [0, 1])).toBe(false);
});

test('Rook can NOT move to the same space it is on', () =>
{
    moveToEmptySquare();

    expect(whiteRook.canMove([1, 1], [1, 1])).toBe(false);
});

test('Rook can NOT move OVer pieces', () =>
{
    boardState.getPiece.mockReturnValue(blackPiece);

    expect(whiteRook.canMove([0, 0], [0, 2])).toBe(false);

    boardState.getPiece.mockReturnValue(whitePiece);

    expect(blackRook.canMove([0, 0], [0, 2])).toBe(false);
});