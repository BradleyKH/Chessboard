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

