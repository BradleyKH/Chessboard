
/*
Pawn endgames

Each exercise should have:
- a prompt (e.g. Black to move, White to move a draw/win)
- a starting FEN position (which includes the turn)
- a solution (a sequence of moves)
*/


const test1 = [
    'Black to move',
    '3k4/8/8/8/3PK3/8/8/8 b - - 0 1',
    'Ke8 Ke5 Ke7 d5 Kd7 d6 Kd8 Ke6 Ke8 d7+ Kd8'    
];

const test2 = [
    'Black to move and draw',
    '3k4/8/8/8/3PK3/8/8/8 b - - 0 1',
    'Ke8 Ke5 Ke7 d5 Kd7 d6 Kd8 Ke6 Ke8 d7+ Kd8'    
];

const pawnEndgames = [test1, test2];