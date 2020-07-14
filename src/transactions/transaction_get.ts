import { createTableHeader, createTableBody } from '../util/table_util';
import { AuthorizationDecorator } from '../auth/auth_decorator';

const CONFIG = require('../../config.local.json');

class TransactionFetcher {

    constructor() {
    }

    getTransactions(callback) {
        var rawXmlHttpRequest = new XMLHttpRequest();
        rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/transactions?from=0');
        var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        };
        xhr.send();
    }

    getTransactionsPromise() : Promise<any> {
        
        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/transactions?from=0');
            
            var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
            xhr.timeout = 2000;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.status);
                    }
                }
            };
            xhr.ontimeout = function () {
                reject('timeout')
            }
            xhr.send();
        });
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