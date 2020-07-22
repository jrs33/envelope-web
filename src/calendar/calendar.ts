import { Weekdays } from './weekdays';
import { TransactionFetcher } from '../transactions/transaction_get';

class Calendar {

    static readonly months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    private _transactionFetcher: TransactionFetcher;

    constructor() {

        this._transactionFetcher = new TransactionFetcher();
    }

    getMonthHeader() : HTMLDivElement {

        let currentDate = new Date();
        let currentMonth = Calendar.months[currentDate.getMonth()];

        let monthElement = document.createElement("li");
        monthElement.textContent = currentMonth + " " + currentDate.getFullYear();

        let listWrapper = document.createElement("ul");
        
        let divElement = document.createElement("div");
        divElement.className = "month";
        
        listWrapper.appendChild(monthElement);
        divElement.appendChild(listWrapper);

        return divElement;
    }

    getWeekHeaders() : HTMLDivElement {

        let weekValues = Object.values(Weekdays);
        let weekHeader = document.createElement("ul");
        weekHeader.className = "weekdays";

        weekValues.forEach(element => {
            let entry = document.createElement("li");
            entry.textContent = element;
            weekHeader.appendChild(entry);
        });
        
        let weekDiv = document.createElement('div');
        weekDiv.appendChild(weekHeader);
        return weekDiv;
    }

    getDayList() : Promise<Array<HTMLUListElement>> {

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        
        return this._transactionFetcher.getTransactionsPromise()
            .then(transactions => {
                let transactionList = JSON.parse(transactions);
                let thisMonthsTransactions = new Map<number, Array<any>>();
                for(let i = 0; i < transactionList.length; i++) {
                    let transactDate = this.parseDateFromTransaction(transactionList[i].date);
                    if(transactDate.getMonth() == currentMonth) {
                        if(thisMonthsTransactions.has(transactDate.getDate())) {
                            thisMonthsTransactions.get(transactDate.getDate()).push(transactionList[i]);
                        } else {
                            thisMonthsTransactions.set(transactDate.getDate(), [transactionList[i]]);
                        }
                    }
                }

                let weeks : Array<HTMLUListElement> = [];

                let currDayCount = 0;
                let weekList : HTMLUListElement = document.createElement('ul');
                weekList.className = "weekdays";
                for(let dayOfMonth: number = 1; dayOfMonth <= this.getDaysInMonth(currentMonth, currentDate.getFullYear()); dayOfMonth++) {

                    let dayElement = document.createElement('li');
                    dayElement.id = dayOfMonth.toString();

                    if(thisMonthsTransactions.has(dayOfMonth)) {
                        let dayTotal = this.sumTransactionTotal(thisMonthsTransactions.get(dayOfMonth));
                        dayElement.textContent = dayOfMonth.toString() + " $" + dayTotal;
                    } else {
                        dayElement.textContent = dayOfMonth.toString() + " $0";
                    }

                    weekList.appendChild(dayElement);
                    currDayCount = currDayCount + 1;
                    
                    if(currDayCount % 7 == 0) {
                        let weekListCopy: HTMLUListElement = this.deepCloneNode(weekList);
                        
                        // need to attach here since there is no way to get event listeners from the DOM.
                        // cloning would omit this handler
                        let daysOfWeek = weekListCopy.getElementsByTagName("li");
                        for(let weekdayIndex = 0; weekdayIndex < daysOfWeek.length; weekdayIndex++) {
                            daysOfWeek[weekdayIndex].addEventListener("click", event => {
                                debugger;
                                console.log("clicked! " + thisMonthsTransactions.get(parseInt(daysOfWeek[weekdayIndex].id, 10)));
                            });
                        }

                        weeks.push(weekListCopy);
                        
                        weekList.innerHTML = '';
                        currDayCount = 0;
                    }
                }

                return weeks;
            })
            .catch(error => {
                console.log("error getting transactions:" + error);
                return [];
            });
    }

    private deepCloneNode<T extends Node>(node: T) : T {
        return <T>node.cloneNode(true);
    }

    private getDaysInMonth(month, year) : number {
        return new Date(year, month+1, 0).getDate();
    }

    private parseDateFromTransaction(date : string) : Date {
        let year = parseInt(date.substring(0,4));
        let month = parseInt(date.substring(5,7));
        let day = parseInt(date.substring(8,10));
        return new Date(year, month-1, day);
    }

    private sumTransactionTotal(transactionList) : number { 

        let runningTotal = 0;
        for(let transaction of transactionList) {
            if (transaction.transactionType == 'CREDIT') {
                runningTotal = runningTotal + transaction.amount;
            } else if (transaction.transactionType == 'DEBIT') {
                runningTotal = runningTotal - transaction.amount;
            } else { 
                throw "unrecognized_transaction_type";
            }
        }
        return runningTotal;
    }
}

export { Calendar };