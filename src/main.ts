import { Transactions } from './transactions/transactions'
import { Envelopes } from './envelopes/envelopes';

const app = async () => {
    let transactionConnector = new Transactions();
    let envelopeConnector = new Envelopes();

    envelopeConnector.connect();
}

document.addEventListener("DOMContentLoaded", app);