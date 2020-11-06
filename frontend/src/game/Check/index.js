import King from '../Piece/King'
import BoardState from '../BoardState'

export function inCheck([Row, Col], boardstate, team)
{
	const enemyPieces = team == 0 ?
		boardstate.blackPieces :
		boardstate.whitePieces;
	// const search = boardstate.returnBoardState();     //search is the current board state
	// for(let r=0; r<8; r++)                      //for every row
	// {
	// 	for(let c=0; c<8; c++)                  //for every coleum
	// 	{
	// 		if(search[r][c] != null && search[r][c].player != team)    //if the peice there is an enemy
	// 		{
	// 			if(search[r][c].canMove([r, c], [Row, Col]))   //we check if it can move to our square
	// 			{
	// 				return true;                //if it can we return true, we are in check
	// 			}
	// 		}
	// 	}
	// }
	// return false; //we have checked the whole board and are not in check

	return enemyPieces.getPieces().some(position => {
		return boardstate.getPiece(position).canMove(position, [Row, Col]);
	});
}

export function inCheckMate([Row, Col], boardstate, team)
{

	if(Row-1 >= 0 && Col-1 >= 0)                //if the up left is on the board
	{
		if(boardstate.getPiece([Row-1, Col-1]) == null || boardstate.getPiece([Row-1, Col-1]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row-1, Col-1], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Row-1 >= 0)                              //if up is on the board
	{
		if(boardstate.getPiece([Row-1, Col]) == null || boardstate.getPiece([Row-1, Col]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row-1, Col], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Row-1 >= 0 && Col+1 < 8)                //if the up right is on the board
	{
		if(boardstate.getPiece([Row-1, Col+1]) == null || boardstate.getPiece([Row-1, Col+1]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row-1, Col+1], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Col+1 < 8)                              //if right is on the board
	{
		if(boardstate.getPiece([Row, Col+1]) == null || boardstate.getPiece([Row, Col+1]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row, Col+1], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Row+1 < 8 && Col+1 < 8)                //if down right is on the board
	{
		if(boardstate.getPiece([Row+1, Col+1]) == null || boardstate.getPiece([Row+1, Col+1]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row+1, Col+1], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Row+1 < 8)                              //if down is on the board
	{
		if(boardstate.getPiece([Row+1, Col]) == null || boardstate.getPiece([Row+1, Col]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row+1, Col], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Row+1 < 8 && Col-1 >= 0)                //if the down left is on the board
	{
		if(boardstate.getPiece([Row+1, Col-1]) == null || boardstate.getPiece([Row+1, Col-1]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row+1, Col-1], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}
	if(Col-1 >= 0)                              //if left is on the board
	{
		if(boardstate.getPiece([Row, Col-1]) == null || boardstate.getPiece([Row, Col-1]).player != team)//if the space doesn't have a allied piece
		{
			if(!(inCheck([Row, Col-1], boardstate, team)))//if that position is not in check
			{
				return false;                    //we can move to another space
			}
		}
	}

	return true; //we have nowhere to move to, thus we are in check
}