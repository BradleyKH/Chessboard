Chessboard
==========

## Goal

A chessboard which:
* Restricts moves to legal moves
* Records moves (in PGN) and positions (in FEN) as the game progresses
* Can interpret notated moves and positions
* Can load certain positions for training purposes, giving feedback on the user's moves

## Issues

* Queens, Rooks, and Bishops move too freely; need to account for blocked paths
* Checks, pawn promotions, and en passant captures are unaccounted for 
* No training positions/moves loaded
* No features for showing/hiding board coordinates, possible moves
* Move parser incomplete
* Move notation doesn't account for multiple Knights or Rooks able to move to a given square