/*
when a piece moves, adjust the active color (w/b)
when a black piece moves, increment the fullmove number
when a pawn moves up 2 spaces, store the en passant square
when a piece is captured or a pawn is moved, reset the halfmove clock to 0
when a king or rook moves, adjust the castling availability

need a function to...
 parse FEN position
 load position
 generate move notation
 parse move notation
 check for available moves
 check for checks
 check if castling is legal
need an object for each kind of piece, determining how it moves. pawns need a hasMoved field.
*/

//initial variables
var turn = 'w'; // b or w
var fullMoves = 1;
var halfMoveClock = 0;
var enPassantSquare = '-';
var castlingOptions = 'KQkq';
var pieces = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
var position = pieces + ' ' + turn + ' ' + castlingOptions + ' ' + enPassantSquare + ' ' + halfMoveClock + ' ' + fullMoves;

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function parsePosition(pos) {
	pos = 'rnbqkbnr/pppppppp/3p2p1/8/8/8/PPPPPPPP/RNBQKBNR';
	position = [ [], [], [], [], [], [], [], [] ];
	var j = 0;
	var k = 0;
	for (var i = 0; i < pos.length; i++) {
			
		if (pos[i] == '/') {
			j++;
			k = 0;
		}
			
		else if (!isNaN(pos[i]))
			k += parseInt(pos[i]);
		
		else if (isLetter(pos[i])) {
			position[j][k] = pos[i];
			k++;
		}		
	}
	
	// return position;
}

function print(something) {
	console.log(something);
}