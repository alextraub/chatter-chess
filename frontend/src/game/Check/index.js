import DPiece from '../../__mocks__/DPiece';

export function inCheck([Row, Col], boardstate, team)
{
	const enemyPieces = team == 0 ?
		boardstate.blackPieces :
		boardstate.whitePieces;

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

	const enemyPieceSet = team === 0 ?
		boardstate.blackPieces :
		boardstate.whitePieces;
	const allyPieceSet = team === 0 ?
		boardstate.whitePieces :
		boardstate.blackPieces;

	// Array of all enemy pieces that can capture the king
	const threats = enemyPieceSet.getPieces(([r,c]) =>
	{
		return boardstate
			.getPiece([r,c])
			.canMove([r,c], [Row,Col]);
	});

	let blockablePositions = []; // Candidate positions to get out of check
	for (let pos of threats)
	{
		const path = boardstate.getPiece(pos).getValidMovePath(pos, [Row,Col]);
		path.forEach(([x,y]) => // Add unique candidate positions along the paths pieces in threats will take to capture the king
		{
			if(!blockablePositions
				.some(([a,b]) => x === a && y ===b))
			{
				blockablePositions.push([x,y]);
			}
		});
	}

	// Used purely for seeing the effect of moving a piece on the check status of the king
	const dummy = team === 0 ?
		new DPiece(boardstate) :
		new DPiece(boardstate, 1);

	// Eliminate all candidates that if occupied by an ally piece would still have the king in check
	blockablePositions = blockablePositions.filter(([r,c]) =>
	{
		if(r === Row && c == Col)
		{
			return false;
		} // Do not include the king

		const curPiece = boardstate.getPiece([r,c]); // Used to restore the boardState after conditional checks
		if(curPiece !== null) // If curPiece is a non-empty square remove it from its team's PieceSet, so it won't be used by inCheck
		{
			if(team === 0)
			{
				boardstate.blackPieces.remove(curPiece, [r,c]);
			} else
			{
				boardstate.whitePieces.remove(curPiece, [r,c]);
			}
		}

		boardstate.placePiece(dummy, [r,c]); // Place the dummy piece at the candidate position
		const doesBlock = !inCheck([Row, Col], boardstate, team); // Determine if this position will get the king out of check

		// Remove the dummy piece from the team's PieceSet, so it won't be there after running this function
		if(team === 0)
		{
			boardstate.whitePieces.remove(dummy, [r,c]);
		} else
		{
			boardstate.blackPieces.remove(dummy, [r,c]);
		}

		// Restore the BoardState with the original piece
		if(curPiece === null)
		{
			boardstate.board[r][c] = null;
		} else
		{
			boardstate.placePiece(curPiece, [r,c]);
		}

		return doesBlock; // True if this position should remain a candidate
	});


	// An array of all the ally pieces that can be moved in such a way to get the king out of check
	const allyPieces = allyPieceSet
		.getPieces(([r,c]) =>
		{
			if(r === Row && c === Col)
			{
				return false;
			} // Exclude the king

			// Loop through all the candidate positions
			for(let [x,y] of blockablePositions)
			{
				if(boardstate
					.getPiece([r,c])
					.canMove([r,c], [x,y]))
				{
					return true; // If the allied piece can move to the candidate position, include it in allyPieces
				}
			}
		});

	return allyPieces.length === 0; // If there are no pieces that can be moved to get out of check, then it is check mate=
}
