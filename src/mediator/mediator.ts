import { DataContainer } from '../data_container/data_container';
import { CalendarDetailsDataContainer } from '../data_container/calendar_details_data_container';

class CentralMediator {

    mediatorState: Array<DataContainer<any>>;

    constructor() {

        this.mediatorState = new Array();
        this.mediatorState.push(new CalendarDetailsDataContainer());
    }

    updateCalendarDetails() {
        // todo notify the proper data containers/view handlers to update
    }
}

export { CentralMediator };