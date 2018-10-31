// needs a lot of work

function isLegalMove(piece, origin, destination, capture) { 
	var endCoord = getCoord(destination);
	var startCoord = getCoord(origin);
	var rankChange = endCoord[0] - startCoord[0];
	var fileChange = endCoord[1] - startCoord[1];
	// check checks
	// not implemented
	
	switch (piece) {
		case 'P':
			// white pawn moves 1 space forward
			if (
				!capture && // not a capture
				fileChange == 0 && // same file
				rankChange == -1 // move 1 space forward
			)
				return true;
                
			// white pawn captures
			else if (
				capture && // is a capture
                rankChange == -1 && Math.abs(fileChange) == 1 // moves 1 space diagonally forward
			)
				return true;
                
			// white pawn moves 2 spaces forward
			else if (
				!capture && // not a capture
				fileChange == 0 && // same file
				origin[1] == '2' && destination[1] == '4' && // pawn moves from rank 2 to rank 4
				getPiece((parseInt(startCoord[0]) - 1).toString() + startCoord[1]) == '0' // no piece in front of pawn
			)
				return true;
			else
				return false;
			break;
            
		case 'p':
			// black pawn moves 1 space forward
			if (
				!capture && // not a capture
				fileChange == 0 && // same file
				rankChange == 1 // move 1 space forward
			)
				return true;

			// black pawn captures
			else if (
				capture && // is a capture
                rankChange == 1 && Math.abs(fileChange) == 1 // moves 1 space diagonally forward
			)
				return true;
                
			// black pawn moves 2 spaces forward
			else if (
				!capture && // not a capture
				fileChange == 0 && // same file
				origin[1] == '7' && destination[1] == '5' && // pawn moves from rank 7 to rank 5
				getPiece((parseInt(startCoord[0]) + 1).toString() + startCoord[1]) == '0' // no piece in front of pawn
			)
				return true;
			else
				return false;
			break;
            
		case 'R':
		case 'r':
			// Rook moves along a file
			if (fileChange == 0)
				return true;
				// account for pieces in the way
			
			// Rook moves along a rank
			else if (rankChange == 0)
				return true;
				// account for pieces in the way
				
			break;
            
		case 'B':
		case 'b':
			// Bishop moves along a diagonal
			if (Math.abs(rankChange) == Math.abs(fileChange))
				return true;
				// account for pieces in the way
			break;
            
		case 'N':
		case 'n':
			// Knight moves in an L shape
			if (
				(Math.abs(rankChange) == 1 && Math.abs(fileChange) == 2) ||
				(Math.abs(rankChange) == 2 && Math.abs(fileChange) == 1)
			)
				return true;
			break;
            
		case 'Q':
		case 'q':
			// Queen moves along a file
			if (fileChange == 0)
				return true;
				// account for pieces in the way
			
			// Queen moves along a rank
			else if (rankChange == 0)
				return true;
				// account for pieces in the way			
			
			// Queen moves along a diagonal
			else if (Math.abs(rankChange) == Math.abs(fileChange))
				return true;
				// account for pieces in the way
				
			break;
            
		case 'K':
			// white king moves to an adjacent square
			if (Math.abs(endCoord[0] - startCoord[0]) < 2 && Math.abs(endCoord[1] - startCoord[1]) < 2)
				return true;
						
			// white king moves to a castling square
			else if (origin == 'e1' && destination == 'g1')
				return canCastle('K');
			else if (origin == 'e1' && destination == 'c1')
				return canCastle('Q');
			else
				return false;
			break;
            
		case 'k':
			// black king moves to an adjacent square
			if (Math.abs(endCoord[0] - startCoord[0]) < 2 && Math.abs(endCoord[1] - startCoord[1]) < 2)
				return true;
			
			// black king moves to a castling square
			else if (origin == 'e8' && destination == 'g8')
				return canCastle('k');
			else if (origin == 'e8' && destination == 'c8')
				return canCastle('q');
			else
				return false;
			break;		
	}
	
	return false;
}
