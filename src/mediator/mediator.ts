import { DataContainer } from '../data_container/data_container';
import { CalendarDetailsDataContainer, CalendarDetailsState } from '../data_container/calendar_details_data_container';

import { ViewHandler } from '../view_handler/view_handler';
import { CalendarDetailsViewHandler } from '../view_handler/calendar_details_view_handler';

enum Actions {
    UPDATE_CALENDAR_DETAILS = "UPDATE_CALENDAR_DETAILS",
}

class CentralMediator {

    private static instance: CentralMediator;

    // data containers
    private calendarDetailsDataContainer: DataContainer<CalendarDetailsState>;

    // view handlers
    private calendarDetailsViewHandler: ViewHandler<CalendarDetailsState>;

    private constructor() {

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();

        this.calendarDetailsViewHandler = new CalendarDetailsViewHandler();
    }

    static getInstance(): CentralMediator {
        if(!CentralMediator.instance) {
            CentralMediator.instance = new CentralMediator();
        }

        return CentralMediator.instance;
    }

    dispatch(action: Actions) {

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

export { CentralMediator, Actions };