function isLegalMove(piece, origin, destination, capture) {
	if (!canMove(piece, origin, destination, capture))
		return false;
	
	var testPosition = [...position];

	testPosition = testMove(testPosition, piece, origin, destination, capture);

	if (turn == 'w' && isCheck('w', testPosition))
		return false;
	
	if (turn == 'b' && isCheck('b', testPosition))
		return false;
	
	return true;
}


function testMove(pos, piece, origin, destination, capture) {
	var endCoord = getCoord(destination);
	var startCoord = getCoord(origin);
	pos[endCoord[0]][endCoord[1]] = piece;
	pos[startCoord[0]][startCoord[1]] = '0';	
	
	// handle en passant captures
	if (piece.toLowerCase() == 'p' && capture && destination == enPassantSquare) {
		if (turn == 'w')
			pos[(parseInt(endCoord[0]) + 1).toString()][endCoord[1]] = '0';
		else
			pos[(parseInt(endCoord[0]) - 1).toString()][endCoord[1]] = '0';
	}

	// handle castling
}


function canMove(piece, origin, destination, capture) { 
	var endCoord = getCoord(destination);
	var startCoord = getCoord(origin);
	var rankChange = endCoord[0] - startCoord[0];
	var fileChange = endCoord[1] - startCoord[1];
	var originRank = parseInt(startCoord[0]);
	var originFile = parseInt(startCoord[1]);
	var destinationRank = parseInt(endCoord[0]);
	var destinationFile = parseInt(endCoord[1]);

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
				getPiece((originRank - 1).toString() + startCoord[1]) == '0' // no piece in front of pawn
			)
				return true;
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
				getPiece((originRank + 1).toString() + startCoord[1]) == '0' // no piece in front of pawn
			)
				return true;
			break;
            
		case 'R':
		case 'r':
			// Rook moves along a file
			if (fileChange == 0) {
				// legal if adjacent square
				if (Math.abs(originRank - destinationRank) == 1)
					return true;

				// legal if no pieces in between origin and destination
				else if (originRank < destinationRank) {
					for (var i = originRank + 1; i < destinationRank; i++) {
						if (getPiece(i.toString() + startCoord[1]) != '0')
							return false;
					}
				}
				else if (originRank > destinationRank) {
					for (var i = originRank - 1; i > destinationRank; i--) {
						if (getPiece(i.toString() + startCoord[1]) != '0')
							return false;
					}
				}
				return true;
			}
			
			// Rook moves along a rank
			else if (rankChange == 0) {
				// legal if adjacent square
				if (Math.abs(originFile - destinationFile) == 1)
					return true;

				// legal if no pieces in between origin and destination
				else if (originFile < destinationFile) {
					for (var i = originFile + 1; i < destinationFile; i++) {
						if (getPiece(startCoord[0] + i.toString()) != '0')
							return false
					}
				}
				else if (originFile > destinationFile) {
					for (var i = originFile - 1; i > destinationFile; i--) {
						if (getPiece(startCoord[0] + i.toString()) != '0')
							return false;
					}
				}
				return true;
			}	
			break;
            
		case 'B':
		case 'b':
			// Bishop moves along a diagonal
			if (Math.abs(rankChange) == Math.abs(fileChange)) {			
				if (rankChange == fileChange && Math.abs(rankChange) == 1)
					return true;

				else if (rankChange == fileChange && destinationRank > originRank) {
					for (var i = 1; i < destinationRank - originRank; i++) {
						if (getPiece((originRank + i).toString() + (originFile + i).toString()) != '0')
							return false;
					}
				}
				
				else if (rankChange == fileChange && destinationRank < originRank) {
					for (var i = 1; i < originRank - destinationRank; i++) {
						if (getPiece((originRank - i).toString() + (originFile - i).toString()) != '0')
							return false;
					}
				}

				else if (rankChange == -fileChange && destinationRank > originRank) {
					for (var i = 1; i < destinationRank - originRank; i++) {
						if (getPiece((originRank + i).toString() + (originFile - i).toString()) != '0')
							return false;
					}
				}

				else if (rankChange == -fileChange && destinationRank < originRank) {
					for (var i = 1; i < originRank - destinationRank; i++) {
						if (getPiece((originRank - i).toString() + (originFile + i).toString()) != '0')
							return false;
					}
				}				

				return true;
			}
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
			if (fileChange == 0) {
				// legal if adjacent square
				if (Math.abs(originRank - destinationRank) == 1)
					return true;

				// legal if no pieces in between origin and destination
				else if (originRank < destinationRank) {
					for (var i = originRank + 1; i < destinationRank; i++) {
						if (getPiece(i.toString() + startCoord[1]) != '0')
							return false;
					}
				}
				else if (originRank > destinationRank) {
					for (var i = originRank - 1; i > destinationRank; i--) {
						if (getPiece(i.toString() + startCoord[1]) != '0')
							return false;
					}
				}
				return true;
			}
			
			// Queen moves along a rank
			else if (rankChange == 0) {
				// legal if adjacent square
				if (Math.abs(originFile - destinationFile) == 1)
					return true;

				// legal if no pieces in between origin and destination
				else if (originFile < destinationFile) {
					for (var i = originFile + 1; i < destinationFile; i++) {
						if (getPiece(startCoord[0] + i.toString()) != '0')
							return false
					}
				}
				else if (originFile > destinationFile) {
					for (var i = originFile - 1; i > destinationFile; i--) {
						if (getPiece(startCoord[0] + i.toString()) != '0')
							return false;
					}
				}
				return true;
			}		
			
			// Queen moves along a diagonal
			else if (Math.abs(rankChange) == Math.abs(fileChange)) {			
				if (rankChange == fileChange && Math.abs(rankChange) == 1)
					return true;

				else if (rankChange == fileChange && destinationRank > originRank) {
					for (var i = 1; i < destinationRank - originRank; i++) {
						if (getPiece((originRank + i).toString() + (originFile + i).toString()) != '0')
							return false;
					}
				}
				
				else if (rankChange == fileChange && destinationRank < originRank) {
					for (var i = 1; i < originRank - destinationRank; i++) {
						if (getPiece((originRank - i).toString() + (originFile - i).toString()) != '0')
							return false;
					}
				}

				else if (rankChange == -fileChange && destinationRank > originRank) {
					for (var i = 1; i < destinationRank - originRank; i++) {
						if (getPiece((originRank + i).toString() + (originFile - i).toString()) != '0')
							return false;
					}
				}

				else if (rankChange == -fileChange && destinationRank < originRank) {
					for (var i = 1; i < originRank - destinationRank; i++) {
						if (getPiece((originRank - i).toString() + (originFile + i).toString()) != '0')
							return false;
					}
				}				

				return true;
			}			
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
			break;		
	}
	
	return false;
}
