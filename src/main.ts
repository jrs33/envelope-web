import { Dashboard } from './composites/dashboard';
import { Goals } from './composites/goals';

import { Logout } from './auth/logout';
import { AUTH } from './auth/auth';

export var id = null;
export var access = null;

const app = async () => {

    if (process.env.NODE_ENV === 'development') { 
        console.log('running_in_dev_env');
        let dashboardConnector = Dashboard.getInstance();
        let logout = new Logout();
        let goals = Goals.getInstance();
        dashboardConnector.connect();
    } else {
        AUTH.parseHash({hash: window.location.hash}, (error, authResult) => {
            if(authResult && authResult.accessToken && authResult.idToken) {
                id = authResult.idToken;
                access = authResult.accessToken;
            } else {
                console.log("auth missing: " + error);
                AUTH.authorize();
            }
    
            let dashboardConnector = Dashboard.getInstance();
            let logout = new Logout();
            let goals = Goals.getInstance();
            dashboardConnector.connect();
        });
    }
}

document.addEventListener("DOMContentLoaded", app);