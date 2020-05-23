import { Transactions } from './transactions/transactions'
import { Envelopes } from './envelopes/envelopes';
import { AUTH } from './auth/auth';

var debugme = null;

const app = async () => {

    AUTH.parseHash({hash: window.location.hash}, (error, authResult) => {
        console.log('error: ' + error + " result: " + authResult);
        if(!authResult) {
            console.log("auth missing: " + error);
            AUTH.authorize();
        }
        debugme = authResult;
        console.log("auth success: " + authResult.accessToken + " " + authResult.idToken);

        // register route handlers, and display envelopes by default
        let transactionConnector = new Transactions();
        let envelopeConnector = new Envelopes();
        envelopeConnector.connect();
    });
}

document.addEventListener("DOMContentLoaded", app);