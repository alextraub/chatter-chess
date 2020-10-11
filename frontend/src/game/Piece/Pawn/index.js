import Piece from './';

export default class Pawn extends Piece {
    canMove([fromRow, fromCol], [toRow, toCol]) {
        if (!validFinalPosition) {
            return false;
        }
        const numRows = toRow - fromRow;
        const numCols = toCol - fromCol;



        //    ****** for the pawn moving up 1 *******     \\
        if (this.Piece.isWhite() || this.Piece.isBlack()) {
            if (numRows === 1) {
                if (numCols === 0) {
                    //if that position is not empty and if the piece is white piece or black piece
                    if (this.board.getPiece(numRows, numCols) != null && (this.isWhite() || this.isBlack())) {
                        return false;
                    }
                    return (numRows === 1 && numCols === 0);
                }
            }
        }
        //******************************************** */

        /*
       
            *******************************************************************
                   *********** for the pawn moving up by 2 ********
                   
        */
        if ((fromRow == 0 && toRow == 0) && (fromCol === 0 && toCol === 0))
            let currentR = fromRow + 2;
        let currentCol = fromCol;
        let thisRow = fromRow + 1;
        let thisCol = fromCol;
        if (this.board.getPiece(thisRow, thisCol) != null) { //if that 1 up position is not empty
            return false;
        }
        if (this.board.getPiece(currentR, currentCol) != null) { // if that 2nd up position isn't empty 
            return false;
        }
        return (currentR && currentCol); // 
    }
}


//   ******  pawn diagonal up left ************* \\
if (this.isBlack()) {
    if (numRows === 1) {
        if (numCols === -1) {

            if (this.board.getPiece(numRows, numCols) != null) {
                if (this.isWhite()) {
                    return (numRows === 1 && numCols === -1);
                }
                return false;
            }
        }
    }
}

else if (this.isWhite()) {
    if (numRows === 1) {
        if (numCols === -1) {
            if (this.board.getPiece(numRows, numCols) != null) {
                if (this.isWhite()) {
                    return false;
                }
                return (numRows === 1 && numCols === -1)
            }
        }
    }
}


//  *******************************************************************

//    Diagonal right:

if (this.isBlack()) {
    if (numRows === 1) {
        if (numCols === 1) {
            if (this.board.getPiece(numRows, numCols) != null) {
                if (this.isWhite()) {
                    return (numRows === 1 && numCols === 1);
                }
                return false;
            }
        }
    }
}

else if (this.isWhite()) {
    if (numRows === 1) {
        if (numCols === 1) {
            if (this.board.getPiece(numRows, numCols) != null) {
                if (this.isWhite()) {
                    return false;
                }
                return (numRows === 1 && numCols === 1);
            }
        }
    }
} 
