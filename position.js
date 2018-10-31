function isLetter(str) {
	if (str == null || str.length < 1)
		return false;
	return str.length === 1 && str.match(/[a-z]/i);
}


// this converts a FEN position into an array
function parsePosition(pos) {
	position = [ [], [], [], [], [], [], [], [] ];
	var j = 0;
	var k = 0;
	for (var i = 0; i < pos.length; i++) {
		
		// a '/' indicates a new rank
		if (pos[i] == '/') {
			j++;
			k = 0;
		}
		
		// a number x indicates a sequence of x empty cells
		else if (!isNaN(pos[i])) {
			for (var b = 0; b < pos[i]; b++) {
				position[j][k] = '0';
				k++;
			}
		}
		
		// a letter indicates a piece
		else if (isLetter(pos[i])) {
			position[j][k] = pos[i];
			k++;
		}		
	}
	
	return position;
}


// this coverts the position array into a FEN position
function encodePosition() {
	var FEN = '';
	var emptySquares = 0;
	var numberWritten = false

	for (var i = 0; i < position.length; i++) {
		emptySquares = 0;
		numberWritten = false;
		for (var j = 0; j < position[i].length; j++) {      
			if (isLetter(position[i][j])) {
				FEN += position[i][j];
				emptySquares = 0;
				numberWritten = false;
			}
			else {
				emptySquares++;
				if (j < 7 && isLetter(position[i][j + 1])) {
					FEN += emptySquares;
					numberWritten = true;
				}
				else if (j == 7 && !numberWritten)
					FEN += emptySquares;
			}
		}
		if (i < 7)
			FEN += '/';
	}

	pieces = FEN;
	updateFEN();
}


// this updates a table cell based on the contents of an array element
function setSquare(square, coords) {
	var rank = coords[0];
	var file = coords[1];
	var img = "";

	switch (position[rank][file]) {
		case 'p':
			img = bPimg;
			break;
		case 'r':
			img = bRimg;
			break;
		case 'n':
			img = bNimg;
			break;
		case 'b':
			img = bBimg;
			break;
		case 'q':
			img = bQimg;
			break;
		case 'k':
			img = bKimg;
			break;
		case 'P':
			img = wPimg;
			break;
		case 'R':
			img = wRimg;
			break;
		case 'N':
			img = wNimg;
			break;
		case 'B':
			img = wBimg;
			break;
		case 'Q':
			img = wQimg;
			break;
		case 'K':
			img = wKimg;
			break;
		default:
			img = blank;
			break;
	}

	document.getElementById(square).innerHTML = '<img src=\"' + img + '\">';
}


// this updates the table based on the contents of the position array
function displayPosition() {
	for (var key in coordMap) {
		setSquare(key, coordMap[key]);
	}
}


function createTable() {
	const files = 'abcdefgh';
	var table = document.createElement('table');
	table.className = 'board';

	// build a table from white's point of view
	if (view == 'w') {
		for (var rank = 8; rank > 0; rank--) {
			var tr = document.createElement('tr');
			for (var file = 0; file < 8; file++) {
				var td = document.createElement('td');
				td.setAttribute('id', files[file].toString() + rank.toString());
				td.setAttribute('onclick', 'onSelect(\'' + files[file].toString() + rank.toString() + '\')');
				if ((file % 2 != 0 && rank % 2 == 0) || (file % 2 == 0 && rank % 2 != 0))
					td.setAttribute('class', 'dark');
				else
					td.setAttribute('class', 'light');
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}

	// build a table from black's point of view
	else {
		for (var rank = 1; rank <= 8; rank++) {
			var tr = document.createElement('tr');
			for (var file = 7; file >= 0; file--) {
				var td = document.createElement('td');
				td.setAttribute('id', files[file].toString() + rank.toString());
				td.setAttribute('onclick', 'onSelect(\'' + files[file].toString() + rank.toString() + '\')');
				if ((file % 2 != 0 && rank % 2 == 0) || (file % 2 == 0 && rank % 2 != 0))
					td.setAttribute('class', 'dark');
				else
					td.setAttribute('class', 'light');
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}

	document.getElementById('chessboard').appendChild(table);
	updateColors();
}


function clearTable() {
	const boardArea = document.getElementById('chessboard');
	if (boardArea.childNodes.length > 0)
		boardArea.removeChild(boardArea.childNodes[0]);
}


function flipBoard() {
	view = view == 'w' ? 'b' : 'w';
	updateBoard();
}


function updateBoard() {
	position = parsePosition(pieces);
	clearTable();
	createTable();
	displayPosition();
	updateFEN();
}


function resetBoard() {
	pieces = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
	view = 'w';
	pieceSelected = false;
	moves = [];
	positions = [];
	turn = 'w';
	fullMoves = 1;
	halfMoves = 0;
	viewHalfMove = 0;
	halfMoveClock = 0;
	enPassantSquare = '-';
	castlingOptions = 'KQkq';
	updateBoard();
	recordPosition();
	updateMoves();
	clearAlerts();
}


function clearBoard() {
	pieces = '8/8/8/8/8/8/8/8';
	view = 'w';
	pieceSelected = false;
	moves = [];
	positions = [];
	turn = 'w';
	fullMoves = 1;
	halfMoves = 0;
	viewHalfMove = 0;
	halfMoveClock = 0;
	enPassantSquare = '-';
	castlingOptions = 'KQkq';
	updateBoard();
	recordPosition();
	updateMoves();
	clearAlerts();
}


function loadPosition(FEN) {
	FEN = FEN.split(' ');
	pieces = FEN[0];
	turn = FEN[1];
	castlingOptions = FEN[2];
	enPassantSquare = FEN[3];
	halfMoveClock = FEN[4];
	fullMoves = FEN[5];
	updateBoard();
}


function updateFEN() {
	positionFEN = pieces + ' ' + turn + ' ' + castlingOptions + ' ' 
		+ enPassantSquare + ' ' + halfMoveClock + ' ' + fullMoves;
	document.getElementById('FEN').value = positionFEN;
}


function customPosition() {
	const FEN = document.getElementById('FEN').value;
	loadPosition(FEN);
	recordPosition();
}


function recordPosition() {
	positions[positions.length] = positionFEN;
}


function previousPosition() {
	if (viewHalfMove > 0)
		viewHalfMove--;
	loadPosition(positions[viewHalfMove]);
}


function nextPosition() {
	if (halfMoves > viewHalfMove)
		viewHalfMove++;
	loadPosition(positions[viewHalfMove]);
}


function getSquare(coord) {
	for (var key in coordMap) {
		if (coordMap[key] == coord)
			return key;		
	}
	return -1;
}


function getCoord(square) {
	for (var key in coordMap) {
		if (key == square)
			return coordMap[key];
	}
	return -1;
}


function getPiece(input) {
	if (!isNaN(input[0]))
		return position[input[0]][input[1]];
	else {
		var coord = getCoord(input);
		return position[coord[0]][coord[1]];
	}
}

function removeFromString(str, char) {
	var newStr = '';
	for (var i = 0; i < str.length; i++) {
		if (str[i] != char)
			newStr += str[i];
	}
	return newStr;
}

function parseMove(m) {
	// ignore strings that begin with numbers
	if (!isNaN(m[0]))
		return;

	// remove extraneous characters
	var extras = ['+', '!', '?', '='];	
	for (var i = 0; i < extras.length; i++) {
	        m = removeFromString(m, extras[i]);
	}

	// remove any letters from the end (e.g. 'a8=Q')
	if (isLetter(m[m.length - 1]) && m[m.length - 1] != 'O')
		m = removeFromString(m, m[m.length - 1]);

	// castling	
	if (m == 'O-O' && turn == 'w' && canCastle('K'))
		move('K', 'e1', 'g1', false);
	else if (m == 'O-O' && turn == 'b' && canCastle('k'))
		move('k', 'e8', 'g8', false);
	else if (m == 'O-O-O' && turn == 'w' && canCastle('Q'))
		move('K', 'e1', 'c1', false);
	else if (m == 'O-O-O' && turn == 'b' && canCastle('q'))
		move('k', 'e8', 'c8', false);

	// conventional moves
	else {
		// get destination square
		var destination = m[m.length - 2] + m[m.length - 1];

		// get piece type
		var piece = '';
		switch (m[0]) {
			case 'K':
			case 'N':
			case 'B':
			case 'Q':
			case 'R':
				piece = m[0];				
				break;
			default:
				piece = 'P'
				break;
		}
		if (turn == 'b')
			piece = piece.toLowerCase();

		// get capture boolean (useful for isLegal() below)
		// not implemented
		var capture = false;

		// find the location(s) of all instances of piece
		var squares = [];
		for (var key in coordMap) {
			if (getPiece(key) == piece)
				squares[squares.length] = key;
		}		

		// elimate pieces that cannot legally move to the destination square
		for (var i = squares.length - 1; i >= 0; i--) {
			if (!isLegalMove(piece, squares[i], destination, capture))
				squares.splice(i, 1);
		}

		// find the origin square
		var origin = '';
		
		if (squares.length == 1)
			origin = squares[0];			
		else {
			// get m[1] - should be an 'x', 

			// if m[1] == 'x', then m[0] gives the file

			// if m[1] != 'x', then it should be a rank (1-8), or a file (a-h) - e.g. Nbd2, R3c5
			// see if only one of the piece candidates (should be a Rook or Knight) matches that rank/file
			
		}
		
		// move the piece
		if (origin != '')
			move(piece, origin, destination, capture);
	}	
}

function loadMoves() {
	resetBoard();
	const customMoves = document.getElementById('PGN').value.split(' ');
	for (var i = 0; i < customMoves.length; i++) {
		parseMove(customMoves[i]);
	}

}