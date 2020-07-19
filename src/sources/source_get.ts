import { AuthorizationDecorator } from "../auth/auth_decorator";

const CONFIG = require('../../config.local.json');

class SourceFetcher {

    constructor() {}

    getSources() : Promise<any> {

        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/sources');
            var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
            xhr.timeout = 2000;
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.status);
                    }
                }
            };
            xhr.ontimeout = function () {
                reject('timeout')
            };
            xhr.send();
        })
    }
}

export { SourceFetcher };