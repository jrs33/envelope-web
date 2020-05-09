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

        let contentDiv = document.getElementById('main');
        contentDiv.innerHTML = '';
    
        let formHeader = document.createElement('h2');
        formHeader.textContent = 'Record Transaction';
        let createTransactionForm = this._transactionCreator.renderCreateTransactionForm();
        createTransactionForm.id = 'createTransactionForm';
        contentDiv.appendChild(formHeader);
        contentDiv.appendChild(createTransactionForm);

        let divider = document.createElement('hr');
        let transactionTableHeader = document.createElement('h2');
        transactionTableHeader.textContent = 'Transaction History';
        contentDiv.appendChild(divider);
        contentDiv.appendChild(transactionTableHeader);

        this._transactionFetcher.getTransactions(
            transactionJson => {
                let table = this._transactionFetcher.parseTransactions(transactionJson);
                table.id = 'transactionTable';
                contentDiv.appendChild(table);
            }
        );

        createTransactionForm.addEventListener('submit', event => {
            this._transactionCreator.createTransaction(event, () => {

                document.getElementById('transactionTable').remove();
                this._transactionFetcher.getTransactions(
                    transactionJson => {
                        let table = this._transactionFetcher.parseTransactions(transactionJson);
                        table.id = 'transactionTable';
                        contentDiv.appendChild(table);
                    }
                );
            });
        });
    }
}

export { Transactions };