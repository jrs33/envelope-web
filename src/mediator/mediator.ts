import { DataContainer } from '../data_container/data_container';
import { CalendarDetailsDataContainer, CalendarDetailsState } from '../data_container/calendar_details_data_container';

import { ViewHandler } from '../view_handler/view_handler';
import { CalendarDetailsViewHandler } from '../view_handler/calendar_details_view_handler';

enum Actions {
    UPDATE_CALENDAR_DETAILS = "UPDATE_CALENDAR_DETAILS",
}

class CentralMediator {

    // data containers
    calendarDetailsDataContainer: DataContainer<CalendarDetailsState>;

    // view handlers
    calendarDetailsViewHandler: ViewHandler<CalendarDetailsState>;

    constructor() {

        this.calendarDetailsDataContainer = new CalendarDetailsDataContainer();

        this.calendarDetailsViewHandler = new CalendarDetailsViewHandler();
    }

    update(action: Actions) {

        switch (action) {
            case Actions.UPDATE_CALENDAR_DETAILS: {
                this.calendarDetailsViewHandler.handle(this.calendarDetailsDataContainer.getState());
            }
            default: {
                break;
            }
        }
    }
}

export { CentralMediator };