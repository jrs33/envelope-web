class CalendarDayProvider {

    constructor() {}

    for(date: Date, money: number): HTMLDivElement {

        let dayDiv: HTMLDivElement = document.createElement('div');
        dayDiv.className = "date-grid-item";

        let dayNumSpan: HTMLSpanElement = document.createElement('span');
        let timeElement: HTMLTimeElement = document.createElement('time');
        timeElement.dateTime = this.formatDate(date);
        timeElement.textContent = "" + date.getDate();
        dayNumSpan.appendChild(timeElement);

        let moneyHeader: HTMLHeadingElement = document.createElement('h4');
        moneyHeader.style.textAlign = "center";
        moneyHeader.style.padding = "20px";
        moneyHeader.textContent = "$" + money.toFixed(2);

        dayDiv.appendChild(dayNumSpan);
        dayDiv.appendChild(moneyHeader);
    
        return dayDiv;
    }

    private formatDate(date: Date): string {

        let year: string = "" + date.getFullYear();
        let month: string = "" + date.getMonth();
        if (month.length < 2) {
            month = "0" + month;
        }

        let day: string = "" + date.getDate();
        if (day.length < 2) {
            day = "0" + day;
        }

        return [year, month, day].join("-");
    }
}

export { CalendarDayProvider };