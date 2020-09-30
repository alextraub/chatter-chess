import Piece from './';

export default class Pawn extends Piece {
    canMove([fromRow, fromCol], [toRow, toCol]) {
        if (!validFinalPosition) {
            return false;
        }
        const numRows = toRow - fromRow;
        const numCols = toCol - fromCol;




        /*
            ****** for the pawn moving up *******
        
            if(numRows===1){
                if(numCols===0){
                    let currentR = fromRow +1;
                    if(super.boardState.getPiece(currentR,fromCol)!=null){ //if that position is not empty
                        return false;
                    }
                    return super.boardState.getPiece(currentR, fromCol) === null;
                }
            
            }



            *********** for the pawn moving up by 2 ********
            if(numRows===2){
                if(numCols===0){
                    let currentR = fromRow + 2;
                    if(super.boardState.getPiece(currentR,fromCol)!=null){ //if that position is not empty
                        return false;
                    }
                    return super.boardState.getPiece(currentR, fromCol) === null;
                }
            }









        */

    }
}
