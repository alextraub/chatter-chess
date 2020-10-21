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

    expect(whiteRook.canMove([0, 0], []))
})