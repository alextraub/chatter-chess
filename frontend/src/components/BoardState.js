import React from 'react';
import Bishop from './'
import King from './'
import Knight from './'
import Pawn from './'
import Queen from './'
import Rook from './'

/* This file stores the positions of all current peices on the board 
and can return a what piece is on a position on the board, all current 
board square values, and can change vaules if peices move of change type.*/

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

    squares[1] = new Knight(b)
    squares[6] = new Knight(b)
    squares[57] = new Knight(w)
    squares[62] = new Knight(w)

    squares[2] = new Bishop(b)
    squares[5] = new Bishop(b)
    squares[58] = new Bishop(w)
    squares[61] = new Bishop(w)

    squares[3] = new Queen(b)
    squares[59] = new Queen(w)

    squares[4] = new King(b)
    squares[60] = new King(w)

    return squares;
}