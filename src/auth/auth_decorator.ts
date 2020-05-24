import { AUTH } from './auth';
import { WebAuth } from 'auth0-js';
import { access } from '../main';

class AuthorizationDecorator {

    request : XMLHttpRequest;
    auth : WebAuth

    constructor(request : XMLHttpRequest) {

        this.request = request;
        this.auth = AUTH;
    }

    send() {
        if(!access) {
            //initiate logout
            return;
        }

        this.request.setRequestHeader("Authorization", "Bearer " + access);
        this.request.send();
    }
}

export { AuthorizationDecorator }