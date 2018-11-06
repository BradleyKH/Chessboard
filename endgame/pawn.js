
/*
Pawn endgames

Each exercise should have:
- a prompt (e.g. Black to move, White to move a draw/win)
- a starting FEN position (which includes the turn)
- a solution (a sequence of moves)
*/

const pawn1 = [
    'White to move and win',
    '8/6p1/7k/8/1K6/8/1P6/8 w - - 0 1',
    'Kc5 Kg6 b4 Kf7 b5 Ke7 Kc6 Kd8 Kb7 g5 b6 g4 Ka8'    
];

const pawn2 = [
    'White to move and draw',
    '8/8/8/2p5/8/8/1kP5/3K4 w - - 0 1',
    'c4'    
];

const pawn3 = [
    'White to move and draw',
    '7K/8/k1P5/7p/8/8/8/8 w - - 0 1',
    'Kg7 h4 Kf6 h3 Ke6 h2 c7'    
];

const pawn4 = [
    'White to move and draw',
    '8/8/1p6/8/8/P7/8/5k1K w - - 0 1',
    'Kh2 Kf2 Kh3 Kf3 Kh4 Kf4 Kh5 Kf5 Kh6 Kf6 Kh7 Kf7 Kh6 b5 Kg5 Ke6 Kf4 Kd5 Ke3 Kc4 a4'    
];

const pawn5 = [
    'White to move and win',
    '8/8/8/8/8/P4p2/k6K/8 w - - 0 1',
    'a4 Kb3 a5 Kc3 Kg1 Kd4 a6 Ke3 Kf1'    
];

const pawn6 = [
    'White to move and win',
    '8/8/6p1/1k6/4K3/8/5P2/8 w - - 0 1',
    'Kd4 Kc6 Ke5 Kc5 f4 Kc4 Kf6 Kd3 Kxg6'    
];

const pawn7 = [
    'White to move and draw',
    '5k2/6p1/7p/8/7P/7K/8/8 w - - 0 1',
    'Kg3 Ke7 Kf3 Kf6 Ke4 Kf7 Ke3 Ke7 Kf3'    
];

const pawn8 = [ // The line in the book is a bit suspect. 1...Kc7 or 1...Kc5 is better.
    'White to move and draw',
    '8/8/1kpp4/8/2P5/2K5/8/8 w - - 0 1',
    'Kc2 Ka6'    
];

const pawn9 = [
    'White to move and draw',
    '8/5p2/1p6/1P2K2k/8/8/8/8 w - - 0 1',
    'Kf5 Kh4 Kf4 Kh3 Kf3 Kh2 Kf2 f6 Kf3 Kg1 Ke4 Kf2 Kd5 f5 Kc6 f4 Kxb6'    
];

const pawn10 = [
    'White to move and draw',
    '8/8/8/4p1p1/8/5P2/6K1/3k4 w - - 0 1',
    'Kh1 Kc1 Kg1 g4 Kg2'    
];

const pawn11 = [
    'White to move and draw',
    '8/2p4K/8/7k/8/8/6PP/8 w - - 0 1',
    'g4+ Kg5 Kg7 c5 h4+ Kxg4 Kg6'    
];

const pawnEndgames = [pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn9, pawn10, pawn11];