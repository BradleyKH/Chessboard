/*
when a piece moves, adjust the active color (w/b)
when a black piece moves, increment the fullmove number
when a pawn moves up 2 spaces, store the en passant square
when a pawn attempts to capture, check the en passant square
when a pawn moves, check for promotion on 8th rank
when a piece is captured or a pawn is moved, reset the halfmove clock to 0
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
	var newCoord = (coordMap[newSquare]);
	if (pieceSelected) {
		if (newSquare == selectedSquare) {
			pieceSelected = false;
			updateBoard();
			return;
		}
		var oldCoord = (coordMap[selectedSquare]);
		var newCoord = (coordMap[newSquare]);
		var piece = position[oldCoord[0]][oldCoord[1]];
		var capture = position[newCoord[0]][newCoord[1]] != '0'; // also en passant
	
		if (isLegalMove(piece, selectedSquare, newSquare, capture)) {
			position[newCoord[0]][newCoord[1]] = piece;
			position[oldCoord[0]][oldCoord[1]] = '';
			move(piece, selectedSquare, newSquare, capture);
			if (autoFlip)
				flipBoard();
		}
	}
  
	// no piece already selected
	else {
		updateBoard();
		var piece = position[newCoord[0]][newCoord[1]];
		if (turn == 'w') {
			if (piece == piece.toLowerCase() && piece != '0') { // white cannot move black pieces
				document.getElementById(newSquare).style.background = selectColor;
				return;
			}
		}
		else {
			if (piece == piece.toUpperCase()  && piece != '0') { // black cannot move white pieces
				document.getElementById(newSquare).style.background = selectColor;
				return;
			}
		}
		
		if (document.getElementById(newSquare).innerHTML != '<img src=\"images/blank.png\">') {
			document.getElementById(newSquare).style.background = selectColor;
			pieceSelected = true;
			selectedSquare = newSquare;
		}
		if (showPossibleMoves)
			showPossibleMoves(selectedSquare);
	}
}


function isLegalMove(piece, oldSquare, newSquare, capture) {
	// not implemented in any meaningful way
	
	if (capture) {
		var newCoord = (coordMap[newSquare]);
		var capturedPiece = position[newCoord[0]][newCoord[1]];

		// prohibit capturing of one's own pieces
		if (piece == piece.toLowerCase() && capturedPiece == capturedPiece.toLowerCase()) {
			updateBoard();
			return false;
		}
			
		else if (piece == piece.toUpperCase() && capturedPiece == capturedPiece.toUpperCase()) {
			updateBoard();
			return false;
		}		
	}
	return true;
}


function move(piece, oldSquare, newSquare, capture) {
	recordMove(piece, oldSquare, newSquare, capture);
	// if inital pawn first move, store ep square, else clear ep square
	if (piece.toLowerCase == 'p') // also if there's a capture
		halfMoveClock = 0;
	halfMoves++;
	viewHalfMove++;
	if (turn == 'b')
		fullMoves++;
	nextTurn();
	pieceSelected = false;
	encodePosition();
	recordPosition();
	updateBoard();    
}


function showPossibleMoves(square) {
	// not implemented
}


function recordMove(piece, oldSquare, newSquare, capture) {
	var move = '';
	
	// need to account for castling

	if (piece.toLowerCase() != 'p')
		move += piece.toUpperCase();
	
	// need to account for multiple Knights or Rooks able to make a move (e.g. Nbd2)
	
	if (piece.toLowerCase() == 'p' && capture)
		move += oldSquare[0];
	
	if (capture)
		move += 'x';
	
	move += newSquare;

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
	// determine if corner is in castlingOptions, if no pieces between, and if any of the 3 squares are in check
	return true;
}
