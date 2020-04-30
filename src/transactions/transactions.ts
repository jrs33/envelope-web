import { TransactionCreator } from './transaction_create';
import { TransactionFetcher } from './transaction_get';

class Transactions {
    
    _transactionFetcher: TransactionFetcher;
    _transactionCreator: TransactionCreator;

    constructor() {

        this._transactionFetcher = new TransactionFetcher();
        this._transactionCreator = new TransactionCreator();
    }

    async connect() {

        const contentDiv = document.getElementById('main');
    
        const createTransactionForm = this._transactionCreator.renderCreateTransactionForm();
        createTransactionForm.id = 'createTransactionForm';
        contentDiv.appendChild(createTransactionForm);

        this._transactionFetcher.getTransactions(
            transactionJson => {
                const table = this._transactionFetcher.parseTransactions(transactionJson);
                table.id = 'transactionTable';
                contentDiv.appendChild(table);
            }
        );

        createTransactionForm.addEventListener('submit', event => {
            this._transactionCreator.createTransaction(event, () => {

                document.getElementById('transactionTable').remove();
                this._transactionFetcher.getTransactions(
                    transactionJson => {
                        const table = this._transactionFetcher.parseTransactions(transactionJson);
                        table.id = 'transactionTable';
                        contentDiv.appendChild(table);
                    }
                );
            });
        });
    }
}

export { Transactions };