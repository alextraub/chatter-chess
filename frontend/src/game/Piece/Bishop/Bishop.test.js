import Bishop from './';
import DPiece from '../../../__mocks__/DPiece';
import BoardState from '../../BoardState';
jest.mock('../../BoardState');

beforeEach(() => {
	BoardState.mockClear();
});

const boardState = new BoardState();
const whiteBishop = new Bishop(boardState, 0);
const blackBishop = new Bishop(boardState, 1);
const whitePiece = new DPiece(boardState);
const blackPiece = new DPiece(boardState, 1);

const moveToEmptySquare = () => 
{
    boardState.getPiece.mockReturnValue(null);
}

test('Bishop can move diagonal down right', () =>
{
    moveToEmptySquare();

    expect(whiteBishop.canMove([3, 3], [4, 4])).toBe(true);
    expect(blackBishop.canMove([5, 5], [6, 6])).toBe(true);
});

test('Bishop can move diagonal up right', () =>
{
    moveToEmptySquare();

    expect(whiteBishop.canMove([3, 3], [2, 4])).toBe(true);
    expect(blackBishop.canMove([1, 1], [0, 2])).toBe(true);
});

test('Bishop can move diagonal down left', () =>
{
    moveToEmptySquare();

    expect(whiteBishop.canMove([2, 2], [3, 1])).toBe(true);
    expect(blackBishop.canMove([3, 3], [4, 2])).toBe(true);
});

test('Bishop can move diagonal up left', () =>
{
    moveToEmptySquare();

    expect(whiteBishop.canMove([2, 2], [1, 1])).toBe(true);
    expect(blackBishop.canMove([3, 3], [2, 2])).toBe(true);
});

test('Bishop can move to a square with an enemy piece', () =>
{
    boardState.getPiece.mockReturnValueOnce(blackPiece).mockReturnValue(whitePiece);

    expect(whiteBishop.canMove([0, 0], [1, 1])).toBe(true);
    expect(blackBishop.canMove([0, 0], [1, 1])).toBe(true);
});

test('Bishop can NOT move to a square with an allied piece', () =>
{
    boardState.getPiece.mockReturnValueOnce(whitePiece).mockReturnValue(blackPiece);

    expect(whiteBishop.canMove([0, 0], [1, 1])).toBe(false);
    expect(blackBishop.canMove([0, 0], [1, 1])).toBe(false);
});

test('Bishop can NOT move to the same space it is on', () =>
{
    moveToEmptySquare();

    expect(whiteBishop.canMove([1, 1], [1, 1])).toBe(false);
});

test('Bishop can NOT move OVER pieces', () =>
{
    boardState.getPiece.mockReturnValue(blackPiece);

    expect(whiteBishop.canMove([0, 0], [2, 2])).toBe(false);

    boardState.getPiece.mockReturnValue(whitePiece);

    expect(blackBishop.canMove([0, 0], [2, 2])).toBe(false);
});