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
need an object for each kind of piece, determining how it moves. pawns need a hasMoved field.
*/


function onSelect(square) {
  if (pieceSelected) {
    var oldCoord = (coordMap[selectedSquare]);
    var newCoord = (coordMap[square]);
    var piece = position[oldCoord[0]][oldCoord[1]];
    // here I need to check if the move is legal. assuming true for now.
    position[newCoord[0]][newCoord[1]] = piece;
    position[oldCoord[0]][oldCoord[1]] = '';
    pieceSelected = false;
    encodePosition();
    updateBoard();
  }
  else {
    updateBoard();
    if (document.getElementById(square).innerHTML != '<img src=\"images/blank.png\">') {
      document.getElementById(square).style.background = '#FFFF00';
      pieceSelected = true;
      selectedSquare = square;
    }
  }
}
