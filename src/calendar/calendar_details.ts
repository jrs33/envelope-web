import { Calendar } from './calendar';

class CalendarDetails {

    static _calendarDetails: HTMLDivElement = document.createElement('div');

    constructor() {

        Calendar._calendarDayClickEventHook.addEventListener("calendarDayClicked", function(event: CustomEvent) {
            debugger;
            let transactionList = event.detail;

            CalendarDetails._calendarDetails.innerHTML = '';
            let list: HTMLUListElement = document.createElement('ul');
            if(Array.isArray(transactionList)) {
                for(let i = 0; i < transactionList.length; i++) {
                    let transaction = transactionList[i];
                    let listElement = document.createElement('li');
                    listElement.textContent = transaction.date + " " + transaction.transactionName + " " + transaction.amount + " " + transaction.transactionType;
                    list.appendChild(listElement);
                }
            }
            CalendarDetails._calendarDetails.appendChild(list);
        });
    }
}

export { CalendarDetails };