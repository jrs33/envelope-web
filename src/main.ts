import { getEnvelopes } from './envelopes/envelopes_main'
import { getTransactions, renderCreateTransactionForm } from './transactions/transactions_main'
import { initializeNavigation } from './navigation/navigation_main'
import { getRemaining } from './statistics/statistics_main'

initializePage();

function initializePage() {
    var containerDiv = document.getElementById("container");
    containerDiv.appendChild(initializeNavigation());

    var mainDiv = document.createElement('div');
    mainDiv.id = "main";
    mainDiv.className = "row";
    containerDiv.appendChild(mainDiv);

    envelopeHashChangeHandler();

    window.addEventListener("hashchange", navChangeHandler, false);
}

function navChangeHandler() {
    console.log(location.hash);
    
    clearContent("main");
    if(location.hash === '#envelopes') {
        envelopeHashChangeHandler();
    } else if (location.hash === '#transactions') {
        transactionHashChangeHandler();
    }
}

function envelopeHashChangeHandler() {
    getRemaining();
    getEnvelopes();
}

function transactionHashChangeHandler() {
    renderCreateTransactionForm();
    getTransactions();
}

function clearContent(elementId) {
    var mainDiv = document.getElementById(elementId);
    while(mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
}