import { Router } from '../routing/router';
import { AUTH } from './auth';

const CONFIG = require('../../config.local.json');

class Logout {

    static readonly ROUTE_TO_ACTION = 'logout';

    router: Router;
    route: String;

    constructor() {
        
        this.router = new Router();
        this.route = this.router.getRoute();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === Logout.ROUTE_TO_ACTION) {
                this.connect();
            }
        });
    }

    async connect() {
        AUTH.logout({
            returnTo: CONFIG.auth.returnTo,
            clientID: CONFIG.auth.client_id
        });
    }
}

export { Logout };