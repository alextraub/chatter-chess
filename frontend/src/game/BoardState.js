import { Pawn, Rook, Knight, Bishop, Queen, King } from './Piece'

/* This file stores the positions of all current peices on the board
and can return what piece is on a position on the board, all current
board square values, and can change vaules if peices move of change type.*/
export default class ReturnBoardState{
    constructor()                                         //create board
    {
		this.board = makeChessBoard(this);

		this.getPiece = this.getPiece.bind(this);
		this.movePiece = this.movePiece.bind(this);
		this.returnBoardState = this.returnBoardState.bind(this);
    }

    getPiece([row, col])                              //Returns what peice is stored on each tile
    {
        return this.board[row][col];                                //return the array value from the position, CAN BE NULL
    }

    movePiece([from1, from2], [to1, to2])             //moves peices on the board, returns what was "taken"
    {
        if (this.board[to1][to2] != null)
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
        return this.board;
    }

}

function makeChessBoard(boardState)                //This is the function to be called at the start of each game to create a borad set to its deafult
{
	let squares = new Array(8);
	for(let r=0; r<8; r++) {
		squares[r] = new Array(8);
		for(let c=0; c<8; c++) {
			squares[r][c] = null;
		}
	}

    for(let i = 0; i < 8; i++){
        squares[1][i] = new Pawn(boardState, 1);
        squares[6][i] = new Pawn(boardState, 0);
    }
    squares[0][0] = new Rook(boardState, 1);
    squares[0][7] = new Rook(boardState, 1);
    squares[7][0] = new Rook(boardState, 0);
    squares[7][7] = new Rook(boardState, 0);

    squares[0][1] = new Knight(boardState, 1);
    squares[0][6] = new Knight(boardState, 1);
    squares[7][1] = new Knight(boardState, 0);
    squares[7][6] = new Knight(boardState, 0);

    squares[0][2] = new Bishop(boardState, 1);
    squares[0][5] = new Bishop(boardState, 1);
    squares[7][2] = new Bishop(boardState, 0);
    squares[7][5] = new Bishop(boardState, 0);

    squares[0][3] = new Queen(boardState, 1);
    squares[7][4] = new Queen(boardState, 0);

    squares[0][4] = new King(boardState, 1);
    squares[7][3] = new King(boardState, 0);

    return squares;
}
