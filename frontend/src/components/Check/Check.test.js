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
const whiteKing = new King(boardState, 0);
const blackKing = new King(boardState, 1);
const whiteRook = new Rook(boardState, 0);
const blackRook = new Rook(boardState, 1);

test('it can tell when the King isnt in check', () =>
{
    
})