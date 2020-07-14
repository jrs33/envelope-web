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

    decorate() : XMLHttpRequest {
        
        if(process.env.NODE_ENV == 'development') {
            this.request.withCredentials = true;
            this.request.setRequestHeader("Authorization", "Bearer dummy");
            return this.request;
        }

        if(!access) {
            //TODO: initiate logout
            return;
        }

        this.request.withCredentials = true;
        this.request.setRequestHeader("Authorization", "Bearer " + access);
        return this.request;
    }
}

export { AuthorizationDecorator }