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
var pieceSelected = false;
var selectedSquare = '';
var moves = [];
var positions = [];
var halfMoves = 0;

// piece images
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
var showCoords = true;
var highlightLastMove = false;
var autoQueen = false;
var autoFlip = false;
var view = 'w';
var viewHalfMove = 0;
var selectColor = '#FFFF00';
var mode = 'play';

// this associates square names with coordinates in the position array
var coordMap = {
a8: '00',
b8: '01',
c8: '02',
d8: '03',
e8: '04',
f8: '05',
g8: '06',
h8: '07',

a7: '10',
b7: '11',
c7: '12',
d7: '13',
e7: '14',
f7: '15',
g7: '16',
h7: '17',

a6: '20',
b6: '21',
c6: '22',
d6: '23',
e6: '24',
f6: '25',
g6: '26',
h6: '27',

a5: '30',
b5: '31',
c5: '32',
d5: '33',
e5: '34',
f5: '35',
g5: '36',
h5: '37',

a4: '40',
b4: '41',
c4: '42',
d4: '43',
e4: '44',
f4: '45',
g4: '46',
h4: '47',

a3: '50',
b3: '51',
c3: '52',
d3: '53',
e3: '54',
f3: '55',
g3: '56',
h3: '57',

a2: '60',
b2: '61',
c2: '62',
d2: '63',
e2: '64',
f2: '65',
g2: '66',
h2: '67',

a1: '70',
b1: '71',
c1: '72',
d1: '73',
e1: '74',
f1: '75',
g1: '76',
h1: '77'
};


function updateColors() {
	var cells = document.getElementsByTagName("td");
	const darkColor = document.getElementById('darkColor').value;
	const lightColor = document.getElementById('lightColor').value;

	for (var i = 0; i < cells.length; i++) {
		if (cells[i].className == 'dark')
			cells[i].style.background = darkColor;
		else if (cells[i].className == 'light')
			cells[i].style.background = lightColor;
	}
}


function toggleAutoFlip() {
	autoFlip = !autoFlip;
	view = turn;
	updateBoard();
}


function toggleShowLegalMoves() {
	showPossibleMoves = !showPossibleMoves;
	
	if (!showPossibleMoves)
		clearLegalMoves();
	if (showPossibleMoves && pieceSelected)
		showLegalMoves(selectedSquare);
}


function toggleCoords() {
    const coordDisplay = document.getElementById('showCoords');
    showCoords = coordDisplay.checked;
    updateBoard();
}


function setMode(modeValue) {
	mode = modeValue;
	const settings = document.getElementById('settings');
	const trainbox = document.getElementById('trainbox');

	settings.style.display = 'none';
	trainbox.style.display = 'none';

	switch (modeValue) {
		case 'play':
			if (pieces == '8/8/8/8/8/8/8/8')
				resetBoard();		
			break;
		case 'train':
			trainbox.style.display = 'block';
			if (pieces == 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
				clearBoard();
			clearAlerts();
			break;
		case 'settings':
			settings.style.display = 'block';
			break;
	}
}