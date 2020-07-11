import { Calendar } from '../calendar/calendar';
import { Router } from '../routing/router';

class Dashboard {

    static readonly ROUTE_TO_ACTION = 'dashboard';

    calendar : Calendar;

    router: Router;
    route: String;

    constructor() {

        this.calendar = new Calendar();

        this.router = new Router();
        this.route = this.router.getRoute();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === Dashboard.ROUTE_TO_ACTION) {
                this.connect();
            }
        });
    }

    async connect() {

        let mainDiv = document.getElementById("container");
        mainDiv.innerHTML = '';

        let calendarDiv = document.createElement('div');
        mainDiv.appendChild(calendarDiv);

        let monthHeader : HTMLDivElement = this.calendar.getMonthHeader();
        let weekHeader : HTMLDivElement = this.calendar.getWeekHeaders();
        let dayList : Array<HTMLUListElement> = this.calendar.getDayList();

        let monthRow = document.createElement('div');
        monthRow.className = "row";
        let monthCol = document.createElement('div');
        monthCol.className = "col-7";

        monthCol.appendChild(monthHeader);
        monthRow.appendChild(monthCol);
        calendarDiv.appendChild(monthRow);

        let weekRow = document.createElement('div');
        weekRow.className = "row";
        weekHeader.className = "col-7";
        weekRow.appendChild(weekHeader);
        calendarDiv.appendChild(weekRow);

        dayList.forEach(weekList => {
            let dateRow = document.createElement('div');
            dateRow.className = "row";

            let listDiv = document.createElement('div');
            listDiv.appendChild(weekList);
            listDiv.className = "col-7";

            dateRow.appendChild(listDiv);

            calendarDiv.appendChild(dateRow);
        });
    }
}

export { Dashboard };