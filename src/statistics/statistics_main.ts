function getRemaining() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			parseRemaining(xhr.responseText);
		}
	};
	xhr.open('GET', 'http://localhost:8080/envelope/statistics/remaining');
	xhr.send();
}

function parseRemaining(remaining) {
	const statsParent = document.getElementById('stats');
	var remainingDiv = document.createElement('div');
	statsParent.appendChild(remainingDiv);

	var remainingParagraph = document.createElement('p');
	remainingDiv.appendChild(remainingParagraph);

	remainingParagraph.textContent = "You have $" + remaining + " remaining this month";
}

export { getRemaining };