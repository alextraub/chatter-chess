import BoardState from '../../game/BoardState'
import Check from './'
import King from '../../Game/Piece/King'
import Rook from '../../game/Piece/Rook'
jest.mock('../../Game/BoardState')

beforeEach(() =>
{
    BoardState.mockClear();
});

const boardState = new BoardState();
const check = new Check;
const whiteKing = new King(boardState, 0);
const blackKing = new King(boardState, 1);
const whiteRook = new Rook(boardState, 0);
const blackRook = new Rook(boardState, 1);

test('it can tell when the King isnt in check', () =>
{
    boardState.placePiece(blackKing, [7, 4]);
    boardState.placePiece(whiteKing, [0, 3]);

    expect(check.inCheck([7, 4], blackKing.boardState, blackKing.player)).toBe(false);
    expect(check.inCheck([0, 3], whiteKing.boardState, whiteKing.player)).toBe(false);
})

test('it can tell when the King is in check', () =>
{
    boardState.placePiece(blackKing, [7, 4]);
    boardState.placePiece(blackRook, [0, 4]);

    expect(Check.inCheck([7, 4], blackKing.boardState, blackKing.player)).toBe(false);
})