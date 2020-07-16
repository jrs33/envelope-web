import { AuthorizationDecorator } from "../auth/auth_decorator";

const CONFIG = require('../../config.local.json');

class StatisticDelegate {

	constructor() {}

	async getRemaining() : Promise<number> {

		return await new Promise(function (resolve, reject) {
			var rawXmlHttpRequest = new XMLHttpRequest();
			rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/envelope/statistics/remaining')
			var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(xhr.response);
					} else {
						reject(xhr.status);
					}
				}
			};
			xhr.send();
		});
	}
}

export { StatisticDelegate };