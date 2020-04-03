function getEnvelopesAsync(asyncHandler) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			asyncHandler(xhr.responseText);
		}
	};
	xhr.open('GET', 'http://localhost:8080/envelopes?from=0');
	xhr.send();
}

export { getEnvelopesAsync };