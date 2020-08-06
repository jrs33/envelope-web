import { ViewHandler } from './view_handler';
import { CalendarDetailsState } from '../data_container/calendar_details_data_container';

class CalendarDetailsViewHandler implements ViewHandler<CalendarDetailsState> {

    constructor() {}

    handle(state: CalendarDetailsState): boolean {

        let tableBody: HTMLElement = document.getElementById('calendar-details-body');
        
        // TODO: loop through transactions and create table rows

        return true;
    }
}

export { CalendarDetailsViewHandler };