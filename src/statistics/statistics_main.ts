const CONFIG = require('../../config.local.json');

function getRemaining() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			parseRemaining(xhr.responseText);
		}
	};
	xhr.open('GET', CONFIG.envelope_api.host + '/envelope/statistics/remaining');
	xhr.send();
}

function parseRemaining(remaining) {
	const statsParent = document.getElementById('main');
	var remainingDiv = document.createElement('div');
	statsParent.appendChild(remainingDiv);

	remainingDiv.className = "jumbotron";
	const remainingHeader = document.createElement('h1');
	remainingHeader.className = "display-4";
	remainingHeader.textContent = "$" + Math.round(remaining * 100) / 100;
	remainingDiv.appendChild(remainingHeader);

	const explain = document.createElement('p');
	explain.textContent = "This is the amount of money you have remaining this month";
	remainingDiv.appendChild(explain);
}

export { getRemaining };