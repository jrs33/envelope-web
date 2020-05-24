import { createTableHeader, createTableBody } from '../util/table_util';
import { AuthorizationDecorator } from '../auth/auth_decorator';

const CONFIG = require('../../config.local.json');

class EnvelopeFetcher {

    constructor() {
    }

    getEnvelopesAsync(callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        };
        xhr.open('GET', CONFIG.envelope_api.host + '/envelopes?from=0');
        let authDecorator = new AuthorizationDecorator(xhr);
        authDecorator.send();
    }

    parseEnvelopes(envelopeJson) : HTMLTableElement {
        let envelopeObject = JSON.parse(envelopeJson);

        var envelopeRows = [];
        for(const envelope of envelopeObject) {
    
            let envelopeRow = [];
            envelopeRow.push(envelope.name);
            envelopeRow.push(envelope.allocatedMoney);
            envelopeRow.push(envelope.spentMoney);
            envelopeRow.push(envelope.allocatedMoney - envelope.spentMoney);
            envelopeRows.push(envelopeRow);
        }

        var table = document.createElement('table');
        table.className = "table";

        const tableHeader = createTableHeader(["Name", "Allocated", "Spent", "Remaining"]);
        tableHeader.align = "center";
        table.appendChild(tableHeader);
    
        const transactionTableBody = createTableBody(envelopeRows);
        transactionTableBody.align = "center";
        table.appendChild(transactionTableBody);

        return table;
    }
}

export { EnvelopeFetcher };