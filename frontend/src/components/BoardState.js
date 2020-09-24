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


constructor(Board)
{
    Board = makeChessBoard();
}

export default function peiceOnPlace()
{
    
}

export default function movePeice(from, to)
{
    from = PosToNum(from);
    to = PosToNum(to);

    Board[to] = Board[from];
    Board[from] = null;

    return 0;
}

function PosToNum(position)
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

export default function makeChessBoard()
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