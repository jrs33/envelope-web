import { Transactions } from './transactions/transactions'
import { Envelopes } from './envelopes/envelopes';
import { Logout } from './auth/logout';
import { AUTH } from './auth/auth';

export var id = null;
export var access = null;

const app = async () => {

    if (process.env.NODE_ENV == 'development') { 
        console.log('running_in_dev_env');
        // register route handlers, and display envelopes by default
        let transactionConnector = new Transactions();
        let envelopeConnector = new Envelopes();
        let logout = new Logout();
        envelopeConnector.connect();
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
    
            // register route handlers, and display envelopes by default
            let transactionConnector = new Transactions();
            let envelopeConnector = new Envelopes();
            let logout = new Logout();
            envelopeConnector.connect();
        });
    }
}

document.addEventListener("DOMContentLoaded", app);