import React from 'react';
import Bishop from './'
import King from './'
import Knight from './'
import Pawn from './'
import Queen from './'
import Rook from './'

/* This file stores the positions of all current peices on the board
and can return what piece is on a position on the board, all current
board square values, and can change vaules if peices move of change type.*/
//class returnBoardState{

    constructor(Board)                                      //create board
    {
        Board = makeChessBoard();
    }

    function getPiece([row, col])                    //Returns what peice is stored on each tile
    {
        return Board[row][col];                                    //return the array value from the position, CAN BE NULL
    }

    function movePiece([from1, from2], [to1, to2])             //moves peices on the board, returns what was "taken"
    {
        if (Board[to1][to2] != Null)
            Board[to1][to2].captured = true;                    //tell the to peice its been captured
        Board[to1][to2] = Board[from1][from2];                  //move the peice to its new tile in the memory array
        Board[from1][from2] = null;                             //null the tile left

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

    function returnBoardState()                 //return the array containing a copy of the Board State
    {
        CBoard = Board.map(x => x);
        return CBoard;
    }

//}

function makeChessBoard()                //This is the function to be called at the start of each game to create a borad set to its deafult
{
    const squares = Array(8).fill(Array(8).fill(null));

    for(let i = 0; i < 8; i++){
        squares[1][i] = new Pawn(1);
        squares[6][i] = new Pawn(0);
    }
    squares[0][0] = new Rook(1);
    squares[0][7] = new Rook(1);
    squares[7][0] = new Rook(0);
    squares[7][7] = new Rook(0);

    squares[0][1] = new Knight(1);
    squares[0][6] = new Knight(1);
    squares[7][1] = new Knight(0);
    squares[7][6] = new Knight(0);

    squares[0][2] = new Bishop(1);
    squares[0][5] = new Bishop(1);
    squares[7][2] = new Bishop(0);
    squares[7][5] = new Bishop(0);

    squares[0][3] = new Queen(1);
    squares[7][4] = new Queen(0);

    squares[0][4] = new King(1);
    squares[7][3] = new King(0);

    return squares;
}
