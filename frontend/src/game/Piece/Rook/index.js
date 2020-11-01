import Piece from '../Piece';
import { boardPositionToString } from '../../utils/boardPosition';

export default class Rook extends Piece {
	get type() {
		return 'rook';
	}

	canMove([fromRow, fromCol], [toRow, toCol], mode=0)
	{
		const validFinalPosition = super.canMove([fromRow, fromCol], [toRow, toCol], mode);   //call the super method to see if the move passes basic validation
		if(!validFinalPosition || typeof(validFinalPosition) === 'string') {                                    //if the lading place is not valid
			return validFinalPosition;                                           //return false, the move can not be done
		}
		const numRows = toRow - fromRow;                              //Row from compared to to
		const numCols = toCol - fromCol;                              //Col from compared to to

		if(numRows != 0 && numCols != 0)                              //if we are traveling both rows and cols
		{
			return mode === 0 ?
				false : `A ${this.type} can only move vertically or horizontally`;                                           //we are not moving in a stright line
		}

		if(numRows != 0)                                            //if we're moving up or down
		{
			if(numRows > 0)                                         //if were moving down
			{
				let currR = fromRow + 1;
				while(currR < toRow)
				{
					if (this.boardState.getPiece([currR, fromCol]) != null)//if that position is not empty
					{
						return mode === 0 ?
							false : `There is a piece at ${boardPositionToString([currR, fromCol])} blocking your ${this.type}'s path`;                                   //something is blocking us
					}
					currR = currR + 1;
				}
				return true;
			} else                                                 //if we are moving up
			{
				let currR = fromRow - 1;
				while(currR > toRow)
				{
					if (this.boardState.getPiece([currR, fromCol]) != null)//if that position is not empty
					{
						return mode === 0 ?
							false : `There is a piece at ${boardPositionToString([currR, fromCol])} blocking your ${this.type}'s path`;                                   //something is blocking us
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
					if (this.boardState.getPiece([fromRow, currC]) != null)//if that position is not empty
					{
						return mode === 0 ?
							false : `There is a piece at ${boardPositionToString([fromRow, currC])} blocking your ${this.type}'s path`;                                   //something is blocking us
					}
					currC = currC + 1;
				}
				return true;
			} else                                                  //if we are going left
			{
				let currC = fromCol - 1;
				while(currC > toCol)
				{
					if (this.boardState.getPiece([fromRow, currC]) != null)//if that position is not empty
					{
						return mode === 0 ?
							false : `There is a piece at ${boardPositionToString([fromRow, currC])} blocking your ${this.type}'s path`;                                   //something is blocking us
					}
					currC = currC - 1;
				}
				return true;
			}
		}
	}
}
