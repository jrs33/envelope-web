import { getEnvelopes } from '../envelopes/envelopes_main';
import { getRemaining } from '../statistics/statistics_main';
import { getTransactions, renderCreateTransactionForm } from '../transactions/transactions_main';

function initializeNavigation() {

    var navList = document.createElement('ul');
    navList.className = "nav nav-pills nav-fill justify-content-center";
    navList.id = "navigation";
    
    var envelopeNavItem = createNavItem("envelope-tab", "#envelopes", "Envelopes", () => {getRemaining(); getEnvelopes();}, true);
    var transactionNavItem = createNavItem("transaction-tab", "#transactions", "Transactions", () => {renderCreateTransactionForm(); getTransactions();}, false);    

    navList.appendChild(envelopeNavItem);
    navList.appendChild(transactionNavItem);

    return navList;
}

function createNavItem(id, href, description, handlerFunction, isClicked) {
    var navItem = document.createElement('li');
    navItem.className = "nav-item";

    var linkItem = document.createElement('a');
    linkItem.onclick = () => createOnClickHandler(linkItem, handlerFunction);
    if(isClicked) {
        linkItem.click();
    }
    linkItem.className = "nav-link";
    linkItem.id = id;
    linkItem.setAttribute("data-toggle", "tab");
    linkItem.setAttribute("role", "tab");
    linkItem.setAttribute("aria-controls", "profile");
    linkItem.setAttribute("aria-selected", "false");
    linkItem.href = href;
    linkItem.textContent = description;

    navItem.appendChild(linkItem);
    return navItem;
}

function createOnClickHandler(linkItem, handlerFunction) {
    clearContent("main");
    handlerFunction();
}

function clearContent(elementId) {
    var mainDiv = document.getElementById(elementId);
    while(mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
}

export { initializeNavigation };