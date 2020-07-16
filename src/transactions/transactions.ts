import { TransactionCreator } from './transaction_create';
import { TransactionFetcher } from './transaction_get';
import { Router } from '../routing/router';

class Transactions {
    
    _transactionFetcher: TransactionFetcher;
    _transactionCreator: TransactionCreator;
    
    router: Router;
    route: String;

    constructor() {

        this._transactionFetcher = new TransactionFetcher();
        this._transactionCreator = new TransactionCreator();
        
        this.router = new Router();
        this.route = this.router.getRoute();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === 'transactions') {
                this.connect();
            }
        });
    }

    async connect() {

        let contentDiv = document.getElementById('container');
        contentDiv.innerHTML = '';

        let headerDiv = document.createElement('div');
        headerDiv.className = "row";
        let headerCol = document.createElement('div');
        headerCol.className = "col-12";
        let header = document.createElement('h1');
        header.textContent = "Transactions";
        headerCol.appendChild(header);
        headerDiv.appendChild(headerCol);
        contentDiv.appendChild(headerDiv);

        let transactionDiv = document.createElement('div');
        transactionDiv.className = "row";
        let transactionCol = document.createElement('div');
        transactionCol.className = "col-4";
        transactionDiv.appendChild(transactionCol);
        contentDiv.appendChild(transactionDiv);
    
        let formHeader = document.createElement('h2');
        formHeader.textContent = 'Record Transaction';
        let createTransactionForm = this._transactionCreator.renderCreateTransactionForm();
        createTransactionForm.id = 'createTransactionForm';
        transactionCol.appendChild(formHeader);
        transactionCol.appendChild(createTransactionForm);

        let divider = document.createElement('hr');
        let transactionTableHeader = document.createElement('h2');
        transactionTableHeader.textContent = 'Transaction History';
        transactionCol.appendChild(divider);
        transactionCol.appendChild(transactionTableHeader);

        this._transactionFetcher.getTransactions(
            transactionJson => {
                let table = this._transactionFetcher.parseTransactions(transactionJson);
                table.id = 'transactionTable';
                transactionCol.appendChild(table);
            }
        );

        createTransactionForm.addEventListener('submit', event => {
            this._transactionCreator.createTransaction(event, () => {

                document.getElementById('transactionTable').remove();
                this._transactionFetcher.getTransactions(
                    transactionJson => {
                        let table = this._transactionFetcher.parseTransactions(transactionJson);
                        table.id = 'transactionTable';
                        transactionCol.appendChild(table);
                    }
                );
            });
        });
    }
}

export { Transactions };