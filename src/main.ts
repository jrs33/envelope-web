import { Transactions } from './transactions/transactions'

const app = async () => {
    new Transactions();
}

document.addEventListener("DOMContentLoaded", app);