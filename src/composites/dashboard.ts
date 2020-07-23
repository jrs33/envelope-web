import { Calendar } from '../calendar/calendar';
import { CalendarDetails } from '../calendar/calendar_details';
import { Router } from '../routing/router';
import { StatisticDelegate } from '../statistics/statistics_delegate';

class Dashboard {

    static readonly ROUTE_TO_ACTION = 'dashboard';

    calendar : Calendar;
    calendarDetails: CalendarDetails;
    statistics: StatisticDelegate;

    router: Router;
    route: String;

    constructor() {

        this.calendar = new Calendar();
        this.calendarDetails = new CalendarDetails();
        this.statistics = new StatisticDelegate();

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

        let remainingThisMonth = await this.statistics.getRemaining();
        let remainingDiv = document.createElement('div');
        remainingDiv.className = "row";
        let remainingCol = document.createElement('div');
        remainingCol.className = "col-12";
        let remainingSpan = document.createElement('h1');
        remainingSpan.textContent = "$" + remainingThisMonth + " remaining this month";
        remainingCol.appendChild(remainingSpan);
        remainingDiv.appendChild(remainingCol);

        mainDiv.appendChild(remainingDiv);

        let calendarDiv = document.createElement('div');
        mainDiv.appendChild(calendarDiv);

        let monthHeader : HTMLDivElement = this.calendar.getMonthHeader();
        let weekHeader : HTMLDivElement = this.calendar.getWeekHeaders();
        let dayList : Array<HTMLUListElement> = await this.calendar.getDayList();

        let monthRow = document.createElement('div');
        monthRow.className = "row";
        let monthCol = document.createElement('div');
        monthCol.className = "col-12";

        monthCol.appendChild(monthHeader);
        monthRow.appendChild(monthCol);
        calendarDiv.appendChild(monthRow);

        let weekRow = document.createElement('div');
        weekRow.className = "row";
        weekHeader.className = "col-12";
        weekRow.appendChild(weekHeader);
        calendarDiv.appendChild(weekRow);

        dayList.forEach(weekList => {
            let dateRow = document.createElement('div');
            dateRow.className = "row";

            let listDiv = document.createElement('div');
            listDiv.appendChild(weekList);
            listDiv.className = "col-12";

            dateRow.appendChild(listDiv);

            calendarDiv.appendChild(dateRow);
        });

        let detailsRow = document.createElement('div');
        detailsRow.className = "row";
        let calendarDetails = CalendarDetails._calendarDetails;
        calendarDetails.className = "col-12";
        detailsRow.appendChild(calendarDetails);
        mainDiv.appendChild(detailsRow);
    }
}

export { Dashboard };