import { Transactions } from './transactions/transactions'
import { Envelopes } from './envelopes/envelopes';

const app = async () => {
    new Transactions();
    new Envelopes();
}

document.addEventListener("DOMContentLoaded", app);