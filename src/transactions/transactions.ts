import { TransactionCreator } from './transaction_create';
import { TransactionFetcher } from './transaction_get';

class Transactions {
    
    _transactionFetcher: TransactionFetcher;
    _transactionCreator: TransactionCreator;

    constructor() {

        this._transactionFetcher = new TransactionFetcher();
        this._transactionCreator = new TransactionCreator();
    }

    getTransactionForm() : HTMLDivElement {

        let transactionCol = document.createElement('div');
    
        let formHeader = document.createElement('h2');
        formHeader.textContent = 'Transaction';
        let createTransactionForm = this._transactionCreator.renderCreateTransactionForm();
        createTransactionForm.id = 'createTransactionForm';
        transactionCol.appendChild(formHeader);
        transactionCol.appendChild(createTransactionForm);

        createTransactionForm.addEventListener('submit', event => {
            this._transactionCreator.createTransaction(event, () => {
                //TODO: send a confirmation alert here
                createTransactionForm.reset();
            });
        });

        return transactionCol;
    }
}

export { Transactions };