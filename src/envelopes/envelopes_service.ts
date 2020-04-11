const CONFIG = require('../../config.local.json');

function getEnvelopesAsync(asyncHandler) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			asyncHandler(xhr.responseText);
		}
	};
	xhr.open('GET', CONFIG.envelope_api.host + '/envelopes?from=0');
	xhr.send();
}

export { getEnvelopesAsync };