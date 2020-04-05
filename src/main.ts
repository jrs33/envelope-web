import { getEnvelopes } from './envelopes/envelopes_main'
import { getTransactions, renderCreateTransactionForm } from './transactions/transactions_main'
import { getRemaining } from './statistics/statistics_main'

window.addEventListener("hashchange", navChangeHandler, false);

function navChangeHandler() {
    console.log(location.hash);
    
    var mainDiv = document.getElementById("main");
    while(mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    
    if(location.hash === '#envelopes') {
        envelopeHashChangeHandler();
    } else if (location.hash === '#transactions') {
        transactionHashChangeHandler();
    }
}

function envelopeHashChangeHandler() {
    getEnvelopes();
    getRemaining();
}

function transactionHashChangeHandler() {
    renderCreateTransactionForm();
    getTransactions();
}