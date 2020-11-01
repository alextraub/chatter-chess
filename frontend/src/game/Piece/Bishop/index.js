import Piece from '../Piece';
import { boardPositionToString } from '../../utils/boardPosition';

export default class Bishop extends Piece {
	get type() {
		return 'bishop';
	}

	canMove([fromRow, fromCol], [toRow, toCol], mode=0)
	{
		const validFinalPosition = super.canMove([fromRow, fromCol], [toRow, toCol], mode);   //call the super method to see if the move passes basic validation
		if(!validFinalPosition || typeof(validFinalPosition) === 'string') {                                    //if the lading place is not valid
			return validFinalPosition;                                           //return false, the move can not be done
		}
		const numRows = toRow - fromRow;                            //Row from compared to to
		const numCols = toCol - fromCol;                            //Col from compared to to

		if (Math.abs(numRows) !== Math.abs(numCols))                  //if the number of rows crossed != the number of cols crossed
		{
			return mode === 0 ?
				false : `A ${this.type} can only move diagonally`;                                           //its not a diagonal path
		}

		if (numRows > 0 && numCols > 0)                             //rows and cols are going up, meaning we are going down right the board
		{
			let currR = fromRow + 1;                                //position next down right
			let currC = fromCol + 1;
			while(currR < toRow && currC < toCol)                   //while that position is not the final position
			{
				if (this.boardState.getPiece([currR, currC]) != null)//if that position is not empty
				{
					return mode === 0 ?
						false : `There is a piece at ${boardPositionToString([currR, currC])} blocking your ${this.type}'s path`;                                   //something is blocking us
				}
				currR++;                                            //move pointer down right
				currC++;
			}
			return true;                                            //if we arrive at the place before our destination which was already cleared by supers version we know we can move there and return true

		} else if (numRows > 0 && numCols < 0)                      //rows is going up but cols is going down, meaning we are going down left the board
		{
			let currR = fromRow + 1;
			let currC = fromCol - 1;
			while(currR < toRow && currC > toCol)
			{
				if (this.boardState.getPiece([currR, currC]) != null)//copy of up code but going down left
				{
					return false;
				}
				currR++;
				currC--;
			}
			return true;
		} else if (numRows < 0 && numCols > 0)                      //rows is going down but cols is going up, meaning we are going up right the board
		{
			let currR = fromRow - 1;
			let currC = fromCol + 1;
			while(currR > toRow && currC < toCol)
			{
				if (this.boardState.getPiece([currR, currC]) != null)//copy of code but going up right
				{
					return false;
				}
				currR--;
				currC++;
			}
			return true;
		} else                                                      //otherwise we are going up left the board
		{
			let currR = fromRow - 1;
			let currC = fromCol - 1;
			while(currR > toRow && currC > toCol)
			{
				if (this.boardState.getPiece([currR, currC]) != null)//copy of code but going up left
				{
					return false;
				}
				currR--;
				currC--;
			}
			return true;
		}
	}
}
