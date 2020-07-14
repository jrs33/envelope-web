import { Weekdays } from './weekdays';
import { TransactionFetcher } from '../transactions/transaction_get';

class Calendar {

    static readonly months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    transactionFetcher: TransactionFetcher;

    constructor() {

        this.transactionFetcher = new TransactionFetcher();
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

    async getDayList() : Promise<Array<HTMLUListElement>> {

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        
        return await this.transactionFetcher.getTransactionsPromise()
            .then(transactions => {
                debugger;
                let transactionList = JSON.parse(transactions);
                let weeks : Array<HTMLUListElement> = [];

                let currDayCount = 0;
                let weekList : HTMLUListElement = document.createElement('ul');
                weekList.className = "weekdays"
                for(let i = 1; i <= this.getDaysInMonth(currentMonth, currentDate.getFullYear()); i++) {

                    let dayElement = document.createElement('li');
                    dayElement.textContent = i.toString();

                    weekList.appendChild(dayElement);
                    currDayCount = currDayCount + 1;
                    
                    if(currDayCount % 7 == 0) {
                        let weekListCopy = this.deepCloneNode(weekList);
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

    private deepCloneNode<T extends Node>(node: T) {
        return <T>node.cloneNode(true);
    }

    private getDaysInMonth(month, year) {
        return new Date(year, month+1, 0).getDate();
    }
}

export { Calendar };