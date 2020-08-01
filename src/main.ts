import { Configuration } from './composites/configuration';
import { Dashboard } from './composites/dashboard';
import { Logout } from './auth/logout';
import { AUTH } from './auth/auth';

export var id = null;
export var access = null;

const app = async () => {

    if (process.env.NODE_ENV == 'development') { 
        console.log('running_in_dev_env');
        let configurationConnector = new Configuration();
        let dashboardConnector = new Dashboard();
        let logout = new Logout();
        // dashboardConnector.connect();
    } else {
        AUTH.parseHash({hash: window.location.hash}, (error, authResult) => {
            debugger;
            if(authResult && authResult.accessToken && authResult.idToken) {
                id = authResult.idToken;
                access = authResult.accessToken;
            } else {
                console.log("auth missing: " + error);
                AUTH.authorize();
            }
    
            let configurationConnector = new Configuration();
            let dashboardConnector = new Dashboard();
            let logout = new Logout();
            // dashboardConnector.connect();
        });
    }
}

document.addEventListener("DOMContentLoaded", app);