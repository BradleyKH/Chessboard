// needs a lot of work

function isLegalMove(piece, origin, destination, capture) { 
	var endCoord = getCoord(destination);
	var startCoord = getCoord(origin);
	
	// check checks
	// not implemented
	
	switch (piece) {
		case 'P':
			// white pawn moves 1 space forward
			if (
				!capture && // not a capture
				origin[0] == destination[0] && // same file
				destination[1] - origin[1] == 1 // move 1 space forward
			)
				return true;
                
			// white pawn captures
			else if (
				capture && // is a capture
                destination[1] - origin[1] == 1 && Math.abs(startCoord[1] - endCoord[1]) == 1 // moves 1 space diagonally forward
			)
				return true;
                
			// white pawn moves 2 spaces forward
			else if (
				!capture && // not a capture
				origin[0] == destination[0] && // same file
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
				origin[0] == destination[0] && // same file
				origin[1] - destination[1] == 1 // move 1 space forward
			)
				return true;

			// black pawn captures
			else if (
				capture && // is a capture
                origin[1] - destination[1] == 1 && Math.abs(startCoord[1] - endCoord[1]) == 1 // moves 1 space diagonally forward
			)
				return true;
                
			// black pawn moves 2 spaces forward
			else if (
				!capture && // not a capture
				origin[0] == destination[0] && // same file
				origin[1] == '7' && destination[1] == '5' && // pawn moves from rank 7 to rank 5
				getPiece((parseInt(startCoord[0]) + 1).toString() + startCoord[1]) == '0' // no piece in front of pawn
			)
				return true;
			else
				return false;
			break;
            
		case 'R':
		case 'r':
			// the move is on the same file
			
			// the move is on the same rank
            return true;
			break;
            
		case 'B':
		case 'b':
			// the move is diagonal
            return true;
			break;
            
		case 'N':
		case 'n':
            return true;
			break;
            
		case 'Q':
		case 'q':
			// the move is on the same file
			
			// the move is on the same rank
			
			// the move is diagonal
            return true;
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
