import Piece from '../Piece';

export default class Pawn extends Piece {
<<<<<<< HEAD
	canMove([fromRow, fromCol], [toRow, toCol]) {
		const validFinalPosition = super.canMove([ fromRow, fromCol ], [ toRow, toCol ]);
    	if (!validFinalPosition) {
			return false;
		}
		const numRows = toRow - fromRow;
		const numCols = toCol - fromCol;

		//    ****** for the pawn moving up 1 *******     \\

		if ((Math.abs(numRows) === 1 || Math.abs(numRows) === 2) && numCols === 0) {
            		if (numRows < 0 && this.isBlack()) {
            			return false;
			}
            		if (numRows > 0 && this.isWhite()) {
            			return false;
			}
            		if (Math.abs(numRows) === 2) {
				if (fromRow === 1 && this.isWhite()) {
					if (this.board.getPiece(fromRow - 1, fromCol) !== null) {
						return false;
					}
				}
				if (fromRow === 6 && this.isBlack()) {
					if (this.board.getPiece(fromRow + 1, fromCol) !== null) {
						return false;
					}
				}
			}
			//if the to position is empty, return true
			return this.board.getPiece(numRows, numCols) == null;
		}
		if (Math.abs(numCols) === 1) {
            	if (numRows === -1 && this.isBlack()) {
				return false;
			} else if (numRows === 1 && this.isWhite()) {
            		return false;
			}
			return (this.boardState.getPiece(numRows, numCols) != null);
		}
	}
=======
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
>>>>>>> CC-90
}
