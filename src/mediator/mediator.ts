import { DataContainer } from '../data_container/data_container';

import { CalendarDetailsDataContainer, CalendarDetailsState } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer, CalendarDetailsDescriptionState } from '../data_container/calendar_details_description_container';
import { RemainingDataContainer, RemainingState } from '../data_container/remaining_data_container';
import { CategoryDataContainer, CategoryState } from '../data_container/category_data_container';
import { SourceDataContainer, SourceState } from '../data_container/source_data_container';
import { SourceCategoryComposite } from '../data_container/source_category_composite';
import { CalendarMonthState, CalendarMonthDataContainer } from '../data_container/calendar_month_data_container';

import { ViewHandler } from '../view_handler/view_handler';
import { CalendarDetailsViewHandler } from '../view_handler/calendar_details_view_handler';
import { CalendarDetailsDescriptionViewHandler } from '../view_handler/calendar_details_description_view_handler';
import { RemainingViewHandler } from '../view_handler/remaining_view_handler';
import { TransactionFormViewHandler } from '../view_handler/transaction_form_view_handler';
import { CalendarDayViewHandler } from '../view_handler/calendar_day_view_handler';

import { Actions } from './actions';
import { Dashboard } from '../composites/dashboard';
import { ViewActions } from '../view_handler/view_actions';

class CentralMediator {

    private static instance: CentralMediator;

    // data containers
    private calendarDetailsDataContainer: DataContainer<CalendarDetailsState>;
    private calendarDetailsDescriptionDataContainer: DataContainer<CalendarDetailsDescriptionState>;
    private remainingDataContainer: DataContainer<RemainingState>;
    private categoryDataContainer: DataContainer<CategoryState>;
    private sourceDataContainer: DataContainer<SourceState>;
    private calendarMonthDataContainer: DataContainer<CalendarMonthState>;

    // view handlers
    private calendarDetailsViewHandler: ViewHandler<CalendarDetailsState>;
    private calendarDetailsDescriptionViewHandler: ViewHandler<CalendarDetailsDescriptionState>;
    private remainingViewHandler: ViewHandler<RemainingState>;
    private transactionFormViewHandler: ViewHandler<SourceCategoryComposite>;
    private calendarDayViewHandler: ViewHandler<CalendarMonthState>;

    private constructor() {

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();
        this.remainingDataContainer = RemainingDataContainer.getInstance();
        this.categoryDataContainer = CategoryDataContainer.getInstance();
        this.sourceDataContainer = SourceDataContainer.getInstance();
        this.calendarMonthDataContainer = CalendarMonthDataContainer.getInstance();

        this.calendarDetailsViewHandler = new CalendarDetailsViewHandler();
        this.calendarDetailsDescriptionViewHandler = new CalendarDetailsDescriptionViewHandler();
        this.remainingViewHandler = new RemainingViewHandler();
        this.transactionFormViewHandler = new TransactionFormViewHandler();
        this.calendarDayViewHandler = new CalendarDayViewHandler();
    }

    static getInstance(): CentralMediator {
        if(!CentralMediator.instance) {
            CentralMediator.instance = new CentralMediator();
        }

        return CentralMediator.instance;
    }

    dispatch(action: Actions): boolean {

        switch (action) {
            case Actions.DAY_CLICKED:
            case Actions.UPDATE_CALENDAR_DETAILS: {
                return this.calendarDetailsViewHandler.handle(this.calendarDetailsDataContainer.getState());
            }
            case Actions.UPDATE_CALENDAR_DETAILS_DESCRIPTION: {
                return this.calendarDetailsDescriptionViewHandler.handle(this.calendarDetailsDescriptionDataContainer.getState());
            }
            case Actions.UPDATE_REMAINING: {
                return this.remainingViewHandler.handle(this.remainingDataContainer.getState());
            }
            case Actions.UPDATE_CATEGORIES: {
                console.log('category update: need to update forms: ' + this.categoryDataContainer.getState());
                return true;
            }
            case Actions.UPDATE_SOURCES: {
                // TEMP
                this.transactionFormViewHandler.handle({sourceState: this.sourceDataContainer.getState(), categoryState: this.categoryDataContainer.getState()});
                return true;
            }
            case Actions.UPDATE_MONTH: {
                this.calendarDayViewHandler.handle(this.calendarMonthDataContainer.getState());
            }
            default: {
                console.log("unrecognized_action: " + action);
                break;
            }
        }
    }
}

export { CentralMediator, Actions, DataContainer };