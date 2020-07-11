import { Weekdays } from './weekdays';

class Calendar {

    static readonly months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    constructor() {
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

    getDayList() : Array<HTMLUListElement> {

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        
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
    }

    private deepCloneNode<T extends Node>(node: T) {
        return <T>node.cloneNode(true);
    }

    private getDaysInMonth(month, year) {
        return new Date(year, month+1, 0).getDate();
    }
}

export { Calendar };