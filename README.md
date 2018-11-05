Chessboard
==========

## Goal

A chessboard which:
* Allows only legal moves
* Records moves (in PGN) and positions (in FEN) as the game progresses
* Can interpret and render notated moves and positions
* Can load certain positions for training purposes, giving feedback on the user's moves

## Issues

* Checks and pawn promotions are unaccounted for 
* No training positions/moves loaded
* No feature for showing/hiding board coordinates
* Move parser incomplete
* Move notation doesn't account for multiple Knights or Rooks able to move to a given square