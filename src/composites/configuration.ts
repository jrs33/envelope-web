import { Transactions } from '../transactions/transactions';
import { Envelopes } from '../envelopes/envelopes';
import { Router } from '../routing/router';

class Configuration {

    static readonly ROUTE_TO_ACTION = 'transactions';

    router: Router;
    route: String;

    transactions: Transactions;
    envelopes: Envelopes;

    constructor() {

        this.transactions = new Transactions();
        this.envelopes = new Envelopes();

        this.router = new Router();
        this.route = this.router.getRoute();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === Configuration.ROUTE_TO_ACTION) {
                this.connect();
            }
        });
    }

    async connect() {

        let contentDiv = document.getElementById('container');
        contentDiv.innerHTML = '';

        // create header
        let headerDiv = document.createElement('div');
        headerDiv.className = "row";
        let headerCol = document.createElement('div');
        headerCol.className = "col-12";
        let header = document.createElement('h1');
        header.textContent = "Transactions";
        let divider = document.createElement('hr');
        headerCol.appendChild(header);
        headerCol.appendChild(divider);
        headerDiv.appendChild(headerCol);
        contentDiv.appendChild(headerDiv);

        // create transaction form
        let transactionDiv = document.createElement('div');
        transactionDiv.className = "row";
        let transactionCol = document.createElement('div');
        transactionCol.className = "col-4";
        transactionDiv.appendChild(transactionCol);
        contentDiv.appendChild(transactionDiv);

        let transactionFormDiv = this.transactions.getTransactionForm();
        transactionCol.appendChild(transactionFormDiv);

        // create envelope form
        let envelopeCol = document.createElement('div');
        envelopeCol.className = "col-4";
        transactionDiv.appendChild(envelopeCol);

        let envelopeFormDiv = this.envelopes.getEnvelopeForm();
        envelopeCol.appendChild(envelopeFormDiv);
    }
}

export { Configuration };