import { Router } from '../routing/router';
import { Weekdays } from './weekdays';

class Calendar {

    static readonly months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    router : Router;
    route : String;

    constructor() {

        this.router = new Router();
        this.route = this.router.getRoute();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === 'dashboard') {
                this.connect();
            }
        });
    }

    async connect() {

        let contentDiv = document.getElementById("main");
        contentDiv.innerHTML = '';

        contentDiv.appendChild(this.getMonthHeader());
        contentDiv.appendChild(this.getWeekHeaders());
        contentDiv.appendChild(this.getDayList());
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

    getWeekHeaders() : HTMLUListElement {

        let weekValues = Object.values(Weekdays);
        let weekHeader = document.createElement("ul");
        weekHeader.className = "weekdays";

        weekValues.forEach(element => {
            let entry = document.createElement("li");
            entry.textContent = element;
            weekHeader.appendChild(entry);
        });

        return weekHeader;
    }

    getDayList() : HTMLUListElement {

        let dayList = document.createElement("ul");
        dayList.className = "days";

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        debugger;
        for(let i = 1; i <= this.getDaysInMonth(currentMonth, currentDate.getFullYear()); i++) {

            let dayListElement = document.createElement("li");
            dayListElement.textContent = i.toString();

            dayList.appendChild(dayListElement);
        }

        return dayList;
    }

    private getDaysInMonth(month, year) {
        
        return new Date(year, month+1, 0).getDate();
    }
}

export { Calendar };