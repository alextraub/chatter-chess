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
function PosToNum();                                    //initilize for use in the file

constructor(Board)                                      //create board
{
    Board = makeChessBoard();
}

export default function peiceOnPlace(place)             //Returns what peice is stored on each tile
{
    p = PosToNum(place);                                //place is a Letter-Number combo, ie A1, B2, D8
    return Board[p];                                    //return the array value from the position, CAN BE NULL
}

export default function movePeice(from, to)             //moves peices on the board, returns what was "taken"
{
    from = PosToNum(from);                              //get the array pos of from
    to = PosToNum(to);                                  //get the array pos of to

    store = Board[to];
    Board[to] = Board[from];                            //move the peice to its new tile in the memory array
    Board[from] = null;                                 //null the tile left

    return store;                                       //return the "taken" peice
}

export default function swapPeice(position, peice)      //reutrns the peice in the given position after the trasformation to make shure it worked
{
    pos = PosToNum(position);                           //get the array pos of position
    if(Board[pos].type = Pawn)                          //If the board position contains a pawn
    {
        Board[pos] = peice;                             //replace the pawn with the chosen peice
    }
    return Board[pos];                                  //return array positon's new value
}

export default function returnBoardState()              //return the array containing the Board State
{
    return Board;
}

function PosToNum(position)                             //This is a helper function that turns Letter-Number pairs into their array positions
{
    pos1, pos2 = position.split("");
    fromPos = parseInt(pos2);
    if(pos1 == "B")
    {
        fromPos = fromPos + 8;
    } else if(pos1 == "C")
    {
        fromPos = fromPos + 16;
    } else if(pos1 == "D")
    {
        fromPos = fromPos + 24;
    } else if(pos1 == "E")
    {
        fromPos = fromPos + 32;
    } else if(pos1 == "F")
    {
        fromPos = fromPos + 40;
    } else if(pos1 == "G")
    {
        fromPos = fromPos + 48;
    } else if(pos1 == "H")
    {
        fromPos = fromPos + 56;
    }
    return fromPos-1;
}

export default function makeChessBoard()                //This is the function to be called at the start of each game to create a borad set to its deafult
{
    const squares = Array(64).fill(null);

    for(let i = 8; i < 16; i++){
        squares[i] = new Pawn(b);
        squares[i+40] = new Pawn(w);
    }
    squares[0] = new Rook(b);
    squares[7] = new Rook(b);
    squares[56] = new Rook(w);
    squares[63] = new Rook(w);

    squares[1] = new Knight(b);
    squares[6] = new Knight(b);
    squares[57] = new Knight(w);
    squares[62] = new Knight(w);

    squares[2] = new Bishop(b);
    squares[5] = new Bishop(b);
    squares[58] = new Bishop(w);
    squares[61] = new Bishop(w);

    squares[3] = new Queen(b);
    squares[59] = new Queen(w);

    squares[4] = new King(b);
    squares[60] = new King(w);

    return squares;
}