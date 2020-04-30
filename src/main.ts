import { Transactions } from './transactions/transactions'

const app = async () => {
    const transactions = new Transactions();
    transactions.connect();
}

document.addEventListener("DOMContentLoaded", app);