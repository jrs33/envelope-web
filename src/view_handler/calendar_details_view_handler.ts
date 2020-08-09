import { ViewHandler } from './view_handler';
import { CalendarDetailsState, Transaction } from '../data_container/calendar_details_data_container';

class CalendarDetailsViewHandler implements ViewHandler<CalendarDetailsState> {

    constructor() {}

    handle(state: CalendarDetailsState): boolean {

        console.log(document.body)

        let tableBody: HTMLElement = this.getDOMElement();
        
        for (let transaction of state.transactions) {
            let tableRow = document.createElement('tr');
            
            let amountData = document.createElement('td'); amountData.textContent = "" + transaction.amount;
            let categoryData = document.createElement('td'); categoryData.textContent = "" + transaction.category;
            let dateData = document.createElement('td'); dateData.textContent = "" + transaction.date;
            let detailData = document.createElement('td'); detailData.textContent = "" + transaction.detail;
            let methodData = document.createElement('td'); methodData.textContent = "" + transaction.method;
            let transactionData = document.createElement('td'); transactionData.textContent = "" + transaction.transaction;
            
            tableRow.appendChild(dateData);
            tableRow.appendChild(transactionData);
            tableRow.appendChild(categoryData);
            tableRow.appendChild(methodData);
            tableRow.appendChild(detailData);
            tableRow.appendChild(amountData);

            tableBody.appendChild(tableRow);
        }

        return true;
    }

    private getDOMElement(): HTMLElement {
        let tableBody: HTMLElement = document.getElementById('calendar-details-body');
        tableBody.innerHTML = ""; // clear current state
        return tableBody;
    }
}

export { CalendarDetailsViewHandler };