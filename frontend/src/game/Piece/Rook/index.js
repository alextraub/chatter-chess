import Piece from '../Piece';

<<<<<<< HEAD
export default class Rook extends Piece {

}
=======
export default class Bishop extends Piece {
    canMove([fromRow, fromCol], [toRow, toCol])
    {
        const validFinalPosition = super.canMove([fromRow, fromCol], [toRow, toCol]);   //call the super method to see if the move passes basic validation
        if(validFinalPosition) {                                    //if the lading place is not valid
            return false;                                           //return false, the move can not be done
        }
        const numRows = Math.abs(toRow - fromRow);                  //Row from compared to to
        const numCols = Math.abs(toCol - fromCol);                  //Col from compared to to

        if 

    }
>>>>>>> CC-90
