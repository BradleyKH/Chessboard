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
 render board table
 flip board table
 generate move notation
 parse move notation
 check for available moves
 check for checks
 check if castling is legal
 show pawn promotion options
need an object for each kind of piece, determining how it moves. pawns need a hasMoved field.

*/

//initial variables
var turn = 'w'; // b or w
var fullMoves = 1;
var halfMoveClock = 0;
var enPassantSquare = '-';
var castlingOptions = 'KQkq';
var pieces = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
var position = [ [], [], [], [], [], [], [], [] ];
var positionFEN = pieces + ' ' + turn + ' ' + castlingOptions + ' ' 
	+ enPassantSquare + ' ' + halfMoveClock + ' ' + fullMoves;

const wPimg = 'images/pw.png';
const wRimg = 'images/rw.png';
const wNimg = 'images/nw.png';
const wBimg = 'images/bw.png';
const wQimg = 'images/qw.png';
const wKimg = 'images/kw.png';
const bPimg = 'images/pb.png';
const bRimg = 'images/rb.png';
const bNimg = 'images/nb.png';
const bBimg = 'images/bb.png';
const bQimg = 'images/qb.png';
const bKimg = 'images/kb.png';
const blank = 'images/blank.png';

// interface options
var showPossibleMoves = false;
var showCoords = false;
var highlightLastMove = false;
var autoQueen = false;
var autoFlip = false;
var view = 'w';

function isLetter(str) {
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
		else if (!isNaN(pos[i]))
			k += parseInt(pos[i]);
		
		// a letter indicates a piece
		else if (isLetter(pos[i])) {
			position[j][k] = pos[i];
			k++;
		}		
	}
	
	return position;
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
	setSquare('a8', '00');
	setSquare('b8', '01');
	setSquare('c8', '02');
	setSquare('d8', '03');
	setSquare('e8', '04');
	setSquare('f8', '05');
	setSquare('g8', '06');
	setSquare('h8', '07');

	setSquare('a7', '10');
	setSquare('b7', '11');
	setSquare('c7', '12');
	setSquare('d7', '13');
	setSquare('e7', '14');
	setSquare('f7', '15');
	setSquare('g7', '16');
	setSquare('h7', '17');

	setSquare('a6', '20');
	setSquare('b6', '21');
	setSquare('c6', '22');
	setSquare('d6', '23');
	setSquare('e6', '24');
	setSquare('f6', '25');
	setSquare('g6', '26');
	setSquare('h6', '27');

	setSquare('a5', '30');
	setSquare('b5', '31');
	setSquare('c5', '32');
	setSquare('d5', '33');
	setSquare('e5', '34');
	setSquare('f5', '35');
	setSquare('g5', '36');
	setSquare('h5', '37');

	setSquare('a4', '40');
	setSquare('b4', '41');
	setSquare('c4', '42');
	setSquare('d4', '43');
	setSquare('e4', '44');
	setSquare('f4', '45');
	setSquare('g4', '46');
	setSquare('h4', '47');

	setSquare('a3', '50');
	setSquare('b3', '51');
	setSquare('c3', '52');
	setSquare('d3', '53');
	setSquare('e3', '54');
	setSquare('f3', '55');
	setSquare('g3', '56');
	setSquare('h3', '57');

	setSquare('a2', '60');
	setSquare('b2', '61');
	setSquare('c2', '62');
	setSquare('d2', '63');
	setSquare('e2', '64');
	setSquare('f2', '65');
	setSquare('g2', '66');
	setSquare('h2', '67');

	setSquare('a1', '70');
	setSquare('b1', '71');
	setSquare('c1', '72');
	setSquare('d1', '73');
	setSquare('e1', '74');
	setSquare('f1', '75');
	setSquare('g1', '76');
	setSquare('h1', '77');

	document.getElementById('FEN').value = positionFEN;
}

function resetBoard() {
	pieces = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
	position = parsePosition(pieces);
	clearTable();
	createTable('w');
	displayPosition();
}

function createTable(view) {
  const files = 'abcdefgh';
  var table = document.createElement('table');
  table.className = 'board';

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
}

function clearTable() {
  const boardArea = document.getElementById('chessboard');
  if (boardArea.childNodes.length > 0)
    boardArea.removeChild(boardArea.childNodes[0]);
}

function flipBoard() {
  clearTable();
  if (view == 'w') {
    view = 'b';
    createTable('b');
  }
  else {
    view = 'w';
    createTable('w');
  }
  displayPosition();
}

function onSelect(square) {
  console.log(square);
}