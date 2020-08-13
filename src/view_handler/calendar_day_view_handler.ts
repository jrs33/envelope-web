import { CalendarDayProvider } from './calendar_day_provider';
import { CalendarMonthState } from '../data_container/calendar_month_data_container';
import { ViewHandler } from './view_handler';
import Transaction from '../data_container/transaction';

interface DaysWithOffset {

    days: Array<HTMLDivElement>;
    offset: number;
}

class CalendarDayViewHandler implements ViewHandler<CalendarMonthState> {

    dayProvider: CalendarDayProvider;
    
    constructor() {

        this.dayProvider = new CalendarDayProvider();
    }
    
    handle(state: CalendarMonthState): boolean {
        
        debugger;
        let dateGrid: HTMLElement = document.getElementById('date-grid');

        let daysWithOffset: DaysWithOffset = this.getDaysWithOffset(state);
        daysWithOffset.days[0].style.gridColumn = "" + daysWithOffset.offset;

        for(let dayDiv of daysWithOffset.days) {
            dateGrid.appendChild(dayDiv);
        }

        return true;
    }

    private getDaysWithOffset(state: CalendarMonthState): DaysWithOffset {

        let firstDay: number = new Date(state.selectedYear, state.selectedMonth, 1).getDay() + 1;
        let daysInMonth = this.getDaysInMonth(state.selectedMonth, state.selectedYear);

        let transactionDayIndex = Object.assign({}, ...state.transactions.map(t => ({[t.date.getDay()]: t})));
        let dayArray: Array<HTMLDivElement> = [];
        for (let day = 1; day < daysInMonth; day++) {
            let dayElement: HTMLDivElement = this.dayProvider.for(new Date(state.selectedYear, state.selectedMonth, day), transactionDayIndex[day]);
            dayArray.push(dayElement);
        }

        return {days: dayArray, offset: firstDay};
    }

    private getDaysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }
}

export { CalendarDayViewHandler };