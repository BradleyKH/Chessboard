function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	var img = document.createElement('img');
	img.src = ev.path[0].src;
	ev.dataTransfer.setDragImage(img, 35, 35);
}

function drop(ev) {
	ev.preventDefault();
	if (ev.path[1].toString() == '[object HTMLTableCellElement]')
		onSelect(ev.path[1].id);
	else
		onSelect(ev.path[0].id);
}
