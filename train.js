var collection = [];
var solution = [];
var exerciseNumber = 0;

const endgames = [
basicEndgames, pawnEndgames
];


function train(exercises) {
	collection = endgames[exercises];
	exerciseNumber = 0;
	loadExercise(collection[exerciseNumber]);
}


function loadExercise(exercise) {
	var prompt = exercise[0];
	var FEN = exercise[1];
	solution = exercise[2].split(' ');
	
	resetVariables();
	loadPosition(FEN);
	recordPosition(FEN);
	updateMoves();
	view = turn;
	updateBoard();
	document.getElementById('exerciseControls').style.display = 'block';
	document.getElementById('exerciseNumber').innerHTML = exerciseNumber + 1;
	document.getElementById('collectionLength').innerHTML = collection.length;
	notify(prompt);
}


function previousExercise() {
	if (exerciseNumber > 0) {
		exerciseNumber--;
		loadExercise(collection[exerciseNumber]);
	}
}


function nextExercise() {
	if (exerciseNumber < collection.length - 1) {
		exerciseNumber++;
		loadExercise(collection[exerciseNumber]);
	}
}


function tryMove(piece, origin, destination, capture) {
    clearNextMove();
	move(piece, origin, destination, capture);
	const attempt = moves[moves.length - 1];
	const correctMove = solution[halfMoves - 1];
	var message = attempt;
	if (attempt == correctMove) {
		message += ' is correct!';
		if (halfMoves == solution.length)
			message += ' Exercise solved. Proceed to <a href="javascript:void(0)" onclick="nextExercise()">next exercise</a>.';
		else {
			var nextMove = solution[halfMoves];
			parseMove(nextMove);
			message += ' Opponent plays ' + nextMove + '.';
		}
		notify(message);
	}		
	else {
		message += ' is incorrect. Try again, or <a href="javascript:void(0)" onclick="showNextMove()">show next move</a>.';
		warn(message);
		undoMove();
	}
}

function showNextMove() {
    if (halfMoves < solution.length) {
        var nextMove = solution[halfMoves];
        document.getElementById('hint').innerHTML = nextMove;
    }
}

function clearNextMove() {
    document.getElementById('hint').innerHTML = '';
}
