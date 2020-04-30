import { createTableHeader, createTableBody } from '../util/table_util';

const CONFIG = require('../../config.local.json');

class TransactionFetcher {

    constructor() {
    }

    getTransactions(callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        };
        console.log(CONFIG);
        xhr.open('GET', CONFIG.envelope_api.host + '/transactions?from=0');
        xhr.send();
    }

    parseTransactions(transactionJson) : HTMLTableElement {
        let transactionObject = JSON.parse(transactionJson);
        console.log(transactionObject)
    
        const transactionTableHeader = createTableHeader(["Date", "Name", "Type", "Amount"]);
        transactionTableHeader.align = "center";
        
        var transactionRows = [];
        for(const transaction of transactionObject) {
    
            let transactionRow = [];
            transactionRow.push(transaction.date);
            transactionRow.push(transaction.transactionName);
            transactionRow.push(transaction.transactionType);
            transactionRow.push(transaction.amount);
            transactionRows.push(transactionRow);
        }
    
        var table = document.createElement('table');
        table.className = "table";
        table.appendChild(transactionTableHeader);
    
        const transactionTableBody = createTableBody(transactionRows);
        transactionTableBody.align = "center";
        table.appendChild(transactionTableBody);

        return table;
    }
}

export { TransactionFetcher };