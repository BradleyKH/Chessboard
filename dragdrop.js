function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {

}

function drop(ev) {
	ev.preventDefault();
	onSelect(ev.path[1].id);
}