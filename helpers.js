function warn(message) {
	document.getElementById('alerts').innerHTML = message;
	document.getElementById('alerts').className = 'warn';
}


function notify(message) {
	document.getElementById('alerts').innerHTML = message;
	document.getElementById('alerts').className = 'notify';
}


function clearAlerts() {
	document.getElementById('alerts').innerHTML = '';
}


function isLetter(str) {
	if (str == null || str.length < 1)
		return false;
	return str.length === 1 && str.match(/[a-z]/i);
}

// returns a given string with all instances of a given character removed
function removeFromString(str, char) {
	var newStr = '';
	for (var i = 0; i < str.length; i++) {
		if (str[i] != char)
			newStr += str[i];
	}
	return newStr;
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


// returns the color of the piece on a given square, or '0' if the square is empty
function getPieceColor(input) {
	var piece = '';
	if (!isNaN(input[0]))
		piece = position[input[0]][input[1]];
	else {
		var coord = getCoord(input);
		piece = position[coord[0]][coord[1]];
	}
	if (piece == '0')
		return '0';
	else if (piece == piece.toLowerCase())
		return 'b';
	else
		return 'w';
}


// returns the square of the given color's King
function getKingSquare(color) {
	var king = color == 'w' ? 'K' : 'k';
	for (var key in coordMap) {
		if (getPiece(key) == king)
			return key;
	}
}


function isCheck(color) {
	var kingSquare = getKingSquare(color);
	for (var key in coordMap) {
		var piece = getPiece(key);
		if (getPieceColor(key) != color && isLegalMove(piece, key, kingSquare, true))
			return true;
	}
	return false;
}


function testLegalMove(pos) {

}


function wouldBeCheck(pos, color) {
	
}
