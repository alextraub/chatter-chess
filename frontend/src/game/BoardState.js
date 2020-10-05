import Bishop from './'
import King from './'
import Knight from './'
import Pawn from './'
import Queen from './'
import Rook from './'

/* This file stores the positions of all current peices on the board 
and can return what piece is on a position on the board, all current 
board square values, and can change vaules if peices move of change type.*/
class ReturnBoardState{

    constructor(Board)                                         //create board
    {
        this.board = makeChessBoard();
    }

    getPiece([row, col])                              //Returns what peice is stored on each tile
    {
        return this.board[row][col];                                //return the array value from the position, CAN BE NULL
    }

    movePiece([from1, from2], [to1, to2])             //moves peices on the board, returns what was "taken"
    {
        if (this.board[to1][to2] != Null)
            this.board[to1][to2].captured = true;                    //tell the to peice its been captured
        this.board[to1][to2] = this.board[from1][from2];                  //move the peice to its new tile in the memory array
        this.board[from1][from2] = null;                             //null the tile left

        return true;
    }

    /*function swapPeice(position, peice)      //returns the peice in the given position after the trasformation to make shure it worked
    {
        pos = PosToNum(position);                           //get the array pos of position
        if(Board[pos].type = Pawn)                          //If the board position contains a pawn
        {
            Board[pos] = peice;                             //replace the pawn with the chosen peice
        }
        return Board[pos];                                  //return array positon's new value
    }*/

    returnBoardState()                 //return the array containing a copy of the Board State
    {
        CBoard = this.board.map((x) => x);
        return CBoard;
    }

}

function makeChessBoard()                //This is the function to be called at the start of each game to create a borad set to its deafult
{
    const squares = new Array(8).fill(new Array(8).fill(null));

    for(let i = 0; i < 8; i++){
        squares[1][i] = new Pawn(this.board, 1);
        squares[6][i] = new Pawn(this.board, 0);
    }
    squares[0][0] = new Rook(this.board, 1);
    squares[0][1] = new Knight(this.board, 1);
    squares[0][2] = new Bishop(this.board, 1);
    squares[0][3] = new Queen(this.board, 1);
    squares[0][4] = new King(this.board, 1);                            //black team
    squares[0][5] = new Bishop(this.board, 1);
    squares[0][6] = new Knight(this.board, 1);
    squares[0][7] = new Rook(this.board, 1);

    squares[7][0] = new Rook(this.board, 0);
    squares[7][1] = new Knight(this.board, 0);
    squares[7][2] = new Bishop(this.board, 0);
    squares[7][3] = new King(this.board, 0);
    squares[7][4] = new Queen(this.board, 0);                           //white team
    squares[7][5] = new Bishop(this.board, 0);
    squares[7][6] = new Knight(this.board, 0);
    squares[7][7] = new Rook(this.board, 0);

    return squares;                                         //return
}