import { Calendar } from './calendar';
import { createTableHeader, createTableBody } from '../util/table_util';

class CalendarDetails {

    static _calendarDetails: HTMLDivElement = document.createElement('div');

    constructor() {

        Calendar._calendarDayClickEventHook.addEventListener("calendarDayClicked", function(event: CustomEvent) {
            debugger;
            let transactionList = event.detail;

            CalendarDetails._calendarDetails.innerHTML = '';
            let table: HTMLTableElement = document.createElement('table');
            table.className = "table";
            let tableHeader: HTMLTableSectionElement = createTableHeader(['Date', 'Name', 'Amount', 'Type']);
            table.appendChild(tableHeader);

            let values = [];
            if(Array.isArray(transactionList)) {
                for(let i = 0; i < transactionList.length; i++) {
                    let transaction = transactionList[i];
                    values.push([transaction.date, transaction.transactionName, transaction.amount, transaction.transactionType]);
                }
                table.appendChild(createTableBody(values));
            }
            CalendarDetails._calendarDetails.appendChild(table);
        });
    }
}

export { CalendarDetails };