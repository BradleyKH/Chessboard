/*
when a pawn moves up 2 spaces, store the en passant square
when a pawn attempts to capture, check the en passant square
when a pawn moves, check for promotion on 8th rank
when a piece is captured, add it to a captured array and show it on the interface
when a king or rook moves, adjust the castling availability

need a function to...
 generate move notation
 parse move notation
 check for available moves
 check for checks
 check if castling is legal
 show pawn promotion options
need an object for each kind of piece, determining how it moves.
*/


function nextTurn() {
	turn = turn == 'w' ? 'b' : 'w';
}


function onSelect(newSquare) {
	// view is not the latest move
	if (viewHalfMove != halfMoves)
		return;
	
	var newCoord = getCoord(newSquare);
	if (pieceSelected) {
		
		// clear the selectColor if the same piece is clicked twice
		if (newSquare == selectedSquare) {
			pieceSelected = false;
			updateBoard();
			return;
		}
		
		var oldCoord = getCoord(selectedSquare);
		var piece = getPiece(oldCoord);
		var target = getPiece(newCoord);
		var capture = target != '0' || newSquare == enPassantSquare;
		
		// black cannot capture black pieces
		if (piece == piece.toLowerCase() && target == target.toLowerCase() && target != '0') { 
			updateBoard();
			document.getElementById(newSquare).style.background = selectColor;
			selectedSquare = newSquare;
			return;
		}
		
		// white cannot capture white pieces
		else if (piece == piece.toUpperCase() && target == target.toUpperCase() && target != '0') { 
			updateBoard();
			document.getElementById(newSquare).style.background = selectColor;
			selectedSquare = newSquare;
			return;
		}
		
		if (isLegalMove(piece, selectedSquare, newSquare, capture)) {
			move(piece, selectedSquare, newSquare, capture);
		}
	}
  
	// no piece already selected
	else {
		
		// clear selectColor that may be on another piece of the same color
		updateBoard();
		
		var piece = position[newCoord[0]][newCoord[1]];
		
		// white cannot move black pieces
		if (turn == 'w') {
			if (piece == piece.toLowerCase() && piece != '0') { 
				document.getElementById(newSquare).style.background = selectColor;
				return;
			}
		}
		
		// black cannot move white pieces
		else {
			if (piece == piece.toUpperCase() && piece != '0') { 
				document.getElementById(newSquare).style.background = selectColor;
				return;
			}
		}
		
		// do not select empty squares
		if (document.getElementById(newSquare).innerHTML != '<img src=\"images/blank.png\">') {
			document.getElementById(newSquare).style.background = selectColor;
			pieceSelected = true;
			selectedSquare = newSquare;
		}
		
		// show possible moves if enabled
		if (showPossibleMoves && piece != '0')
			showPossibleMoves(selectedSquare);
	}
}


function isLegalMove(piece, oldSquare, newSquare, capture) { // needs a lot of work
	var newCoord = getCoord(newSquare);
	var oldCoord = getCoord(oldSquare);
	
	// check checks
	// not implemented
	
	switch (piece) {
		case 'P':
			// the pawn move is 2 spaces forward
			
			// the move is 1 space forward
			
			// the move is 1 space diagonal
			break;
		case 'P':
			// the pawn move is 2 spaces forward
			
			// the move is 1 space forward
			
			// the move is 1 space diagonal
			break;
		case 'R':
			// the move is on the same file
			
			// the move is on the same rank
			break;
		case 'r':
			// the move is on the same file
			
			// the move is on the same rank
			break;
		case 'B':
			// the move is diagonal
			break;
		case 'b':
			// the move is diagonal
			break;
		case 'N':
			break;
		case 'n':
			break;
		case 'Q':
			// the move is on the same file
			
			// the move is on the same rank
			
			// the move is diagonal
			break;
		case 'q':
			// the move is on the same file
			
			// the move is on the same rank
			
			// the move is diagonal
			break;
		case 'K':
			// the move is to an adjacent square
			if (Math.abs(newCoord[0] - oldCoord[0]) < 2 && Math.abs(newCoord[1] - oldCoord[1]) < 2)
				return true;
						
			// the move is to a castling square
			else if (oldSquare == 'e1' && newSquare == 'g1')
				return canCastle('K');
			else if (oldSquare == 'e1' && newSquare == 'c1')
				return canCastle('Q');
			else
				return false;
			break;
		case 'k':
			// the move is to an adjacent square
			if (Math.abs(newCoord[0] - oldCoord[0]) < 2 && Math.abs(newCoord[1] - oldCoord[1]) < 2)
				return true;
			
			// the move is to a castling square
			else if (oldSquare == 'e8' && newSquare == 'g8')
				return canCastle('k');
			else if (oldSquare == 'e8' && newSquare == 'c8')
				return canCastle('q');
			else
				return false;
			break;		
	}
	
	return true;
}


function move(piece, oldSquare, newSquare, capture) {
	var newCoord = getCoord(newSquare);
	var oldCoord = getCoord(oldSquare);
	position[newCoord[0]][newCoord[1]] = piece;
	position[oldCoord[0]][oldCoord[1]] = '0';	
	
	// update castling options for king and rook moves
	if (piece.toLowerCase() == 'k' || piece.toLowerCase() == 'r')
		updateCastlingOptions(piece, oldSquare[0]);
	
	// handle castling
	if (piece.toLowerCase() == 'k') {		
		if (oldSquare == 'e8' && newSquare == 'g8')
			castle('k');
		else if (oldSquare == 'e8' && newSquare == 'c8')
			castle('q');
		else if (oldSquare == 'e1' && newSquare == 'g1')
			castle('K');
		else if (oldSquare == 'e1' && newSquare == 'c1')
			castle('Q');
	}
	
	// notate the move
	recordMove(piece, oldSquare, newSquare, capture);
	
	// if initial pawn 2-space move, store ep square, else clear ep square
	
	// update halfMoveClock for 50-move rule
	if (piece.toLowerCase() == 'p' || capture)
		halfMoveClock = 0;	
	else
		halfMoveClock++;
	
	halfMoves++;
	viewHalfMove++;
	if (turn == 'b')
		fullMoves++;
	nextTurn();
	pieceSelected = false;
	encodePosition();
	recordPosition();
	if (autoFlip)
		flipBoard();
	else
		updateBoard();
}


function showPossibleMoves(square) {
	// not implemented
}


function recordMove(piece, oldSquare, newSquare, capture) {
	var move = '';
	
	// castling
	if (piece.toLowerCase() == 'k' && oldSquare[0] == 'e' && newSquare[0] == 'g')
		move += 'O-O';
	else if (piece.toLowerCase() == 'k' && oldSquare[0] == 'e' && newSquare[0] == 'c')
		move += 'O-O-O';
		
	else {
		if (piece.toLowerCase() != 'p')
			move += piece.toUpperCase();
	
		// need to account for multiple Knights or Rooks able to move to newSquare (e.g. Nbd2)
	
		if (piece.toLowerCase() == 'p' && capture)
			move += oldSquare[0];
		
		if (capture)
			move += 'x';
		
		move += newSquare;
	}

	// need to account for checks

	moves[moves.length] = move;
	
	updateMoves();
}


function updateMoves() {
	var moveRecord = '';
	var moveNumber = 1;
	
	for (var i = 0; i < moves.length; i++) {
		if (i % 2 == 0) {
			moveRecord += moveNumber + '. ';
			moveNumber++
		}
		moveRecord += moves[i] + ' ';
	}
	
	document.getElementById('moves').innerHTML = moveRecord;
}


function castle(corner) {
	switch(corner) {
		case "K":
			position[7][4] = '0';
			position[7][5] = 'R';
			position[7][6] = 'K';
			position[7][7] = '0';
			break;
		case "k":
			position[0][4] = '0';
			position[0][5] = 'r';
			position[0][6] = 'k';
			position[0][7] = '0';
			break;
		case "Q":
			position[7][0] = '0';
			position[7][2] = 'K';
			position[7][3] = 'R';
			position[7][4] = '0';
			break;
		case "q":
			position[0][0] = '0';
			position[0][2] = 'k';
			position[0][3] = 'r';
			position[0][4] = '0';
			break;
	}
}


function canCastle(corner) {
	// not implemented
	var isOption = false;
	var isClear = false;	
	
	// determine if the king or rook has moved
	for (var i = 0; i < castlingOptions.length; i++) {		
		if (castlingOptions[i] == corner)
			isOption = true;
	}
	
	// determine if there are no pieces between the king and rook
	switch (corner) {
		case "K":
			if (position[7][5] == '0' && position[7][6] == '0')
				isClear = true;
			break;
		case "k":
			if (position[0][5] == '0' && position[0][6] == '0')
				isClear = true;			
			break;
		case "Q":
			if (position[7][1] == '0' && position[7][2] == '0' && position[7][3] == '0')
				isClear = true;
			break;
		case "q":
			if (position[0][1] == '0' && position[0][2] == '0' && position[0][3] == '0')
				isClear = true;
			break;
	}
	
	// determine if any of the 3 squares are in check
	//not implemented
	var noChecks = true;
	
	return isOption && isClear && noChecks;
}


// updates castling options for king and rook moves
function updateCastlingOptions(piece, file) {	
	
	var newCastlingOptions = '';
	
	// king moves
	if (piece.toLowerCase() == 'k') {
		
		// remove all castling options for a color when its king moves
		if (turn == 'w' && castlingOptions != '-') {
			for (var i = 0; i < castlingOptions.length; i++) {
				if (castlingOptions[i] != 'K' && castlingOptions[i] != 'Q')
					newCastlingOptions += castlingOptions[i];
			}
		}
		else if (turn == 'b' && castlingOptions != '-') {
			for (var i = 0; i < castlingOptions.length; i++) {
				if (castlingOptions[i] != 'k' && castlingOptions[i] != 'q')
					newCastlingOptions += castlingOptions[i];
			}
		}
		
		castlingOptions = newCastlingOptions == '' ? '-' : newCastlingOptions;
	}
	
	// queen's rook moves
	if (piece.toLowerCase() == 'r' && file == 'a') {		
		
		if (turn == 'w' && castlingOptions != '-') {
			for (var i = 0; i < castlingOptions.length; i++) {
				if (castlingOptions[i] != 'Q')
					newCastlingOptions += castlingOptions[i];
			}
		}
		else if (turn == 'b' && castlingOptions != '-') {
			for (var i = 0; i < castlingOptions.length; i++) {
				if (castlingOptions[i] != 'q')
					newCastlingOptions += castlingOptions[i];
			}
		}
		
		castlingOptions = newCastlingOptions == '' ? '-' : newCastlingOptions;
	}
	
	// king's rook moves
	if (piece.toLowerCase() == 'r' && file == 'h') {		
		
		if (turn == 'w' && castlingOptions != '-') {
			for (var i = 0; i < castlingOptions.length; i++) {
				if (castlingOptions[i] != 'K')
					newCastlingOptions += castlingOptions[i];
			}
		}
		else if (turn == 'b' && castlingOptions != '-') {
			for (var i = 0; i < castlingOptions.length; i++) {
				if (castlingOptions[i] != 'k')
					newCastlingOptions += castlingOptions[i];
			}
		}
		
		castlingOptions = newCastlingOptions == '' ? '-' : newCastlingOptions;
	}	
}