import Piece from '../Piece';

export default class Bishop extends Piece {
	canMove([fromRow, fromCol], [toRow, toCol])
	{
		const validFinalPosition = super.canMove([fromRow, fromCol], [toRow, toCol]);   //call the super method to see if the move passes basic validation
		if(validFinalPosition) {                                    //if the lading place is not valid
			return false;                                           //return false, the move can not be done
		}
		const numRows = toRow - fromRow;                              //Row from compared to to
		const numCols = toCol - fromCol;                              //Col from compared to to

		if(numRows !== 0 && numCols !== 0)                              //if we are traveling both rows and cols
		{
			return false;                                           //we are not moving in a stright line
		}

		if(numRows !== 0)                                            //if we're moving up or down
		{
			if(numRows > 0)                                         //if were moving down
			{
				let currR = fromRow + 1;
				while(currR < toRow)
				{
					if (this.BoardState.getPiece(currR, fromCol) != null)//if that position is not empty
					{
						return false;                                   //something is blocking us
					}
					currR = currR + 1;
				}
				return true;
			} else                                                 //if we are moving up
			{
				let currR = fromRow - 1;
				while(currR > toRow)
				{
					if (this.BoardState.getPiece(currR, fromCol) != null)//if that position is not empty
					{
						return false;                                   //something is blocking us
					}
					currR = currR - 1;
				}
				return true;
			}
		} else                                                      //if we are moving left or right
		{
			if(numCols > 0)                                         //if we are going right
			{
				let currC = fromCol + 1;
				while(currC < toCol)
				{
					if (this.BoardState.getPiece(fromRow, currC) != null)//if that position is not empty
					{
						return false;                                   //something is blocking us
					}
					currC = currC + 1;
				}
				return true;
			} else                                                  //if we are going left
			{
				let currC = fromCol - 1;
				while(currC > toCol)
				{
					if (this.BoardState.getPiece(fromRow, currC) != null)//if that position is not empty
					{
						return false;                                   //something is blocking us
					}
					currC = currC - 1;
				}
				return true;
			}
		}
	}
}
