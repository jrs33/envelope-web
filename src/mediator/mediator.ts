import { DataContainer } from '../data_container/data_container';

import { CalendarDetailsDataContainer, CalendarDetailsState } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer, CalendarDetailsDescriptionState } from '../data_container/calendar_details_description_container';

import { ViewHandler } from '../view_handler/view_handler';
import { CalendarDetailsViewHandler } from '../view_handler/calendar_details_view_handler';
import { CalendarDetailsDescriptionViewHandler } from '../view_handler/calendar_details_description_view_handler';

import { Actions } from './actions';

class CentralMediator {

    private static instance: CentralMediator;

    // data containers
    private calendarDetailsDataContainer: DataContainer<CalendarDetailsState>;
    private calendarDetailsDescriptionDataContainer: DataContainer<CalendarDetailsDescriptionState>;

    // view handlers
    private calendarDetailsViewHandler: ViewHandler<CalendarDetailsState>;
    private calendarDetailsDescriptionViewHandler: ViewHandler<CalendarDetailsDescriptionState>;

    private constructor() {

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();

        this.calendarDetailsViewHandler = new CalendarDetailsViewHandler();
        this.calendarDetailsDescriptionViewHandler = new CalendarDetailsDescriptionViewHandler();
    }

    static getInstance(): CentralMediator {
        if(!CentralMediator.instance) {
            CentralMediator.instance = new CentralMediator();
        }

        return CentralMediator.instance;
    }

    dispatch(action: Actions): boolean {

        switch (action) {
            case Actions.UPDATE_CALENDAR_DETAILS: {
                return this.calendarDetailsViewHandler.handle(this.calendarDetailsDataContainer.getState());
            }
            case Actions.UPDATE_CALENDAR_DETAILS_DESCRIPTION: {
                return this.calendarDetailsDescriptionViewHandler.handle(this.calendarDetailsDescriptionDataContainer.getState());
            }
            default: {
                console.log("unrecognized_action: " + action);
                break;
            }
        }
    }
}

export { CentralMediator, Actions, DataContainer };