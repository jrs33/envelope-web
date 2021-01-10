import { DataContainer } from '../data_container/data_container';

import { CalendarDetailsDataContainer, CalendarDetailsState } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer, CalendarDetailsDescriptionState } from '../data_container/calendar_details_description_container';
import { RemainingDataContainer, RemainingState } from '../data_container/remaining_data_container';
import { CategoryDataContainer, CategoryState } from '../data_container/category_data_container';
import { SourceDataContainer, SourceState } from '../data_container/source_data_container';
import { SourceCategoryComposite } from '../data_container/source_category_composite';
import { CalendarMonthState, CalendarMonthDataContainer } from '../data_container/calendar_month_data_container';
import { GoalDataContainer, GoalState } from '../data_container/goal_data_container';

import { ViewHandler } from '../view_handler/view_handler';
import { CalendarDetailsViewHandler } from '../view_handler/calendar_details_view_handler';
import { CalendarDetailsDescriptionViewHandler } from '../view_handler/calendar_details_description_view_handler';
import { RemainingViewHandler } from '../view_handler/remaining_view_handler';
import { TransactionFormViewHandler } from '../view_handler/transaction_form_view_handler';
import { CalendarDayViewHandler } from '../view_handler/calendar_day_view_handler';
import { GoalsViewHandler } from '../view_handler/goals_view_handler';
import { GoalFormViewHandler } from '../view_handler/goals_form_view_handler';

import { Actions } from './actions';
import { ActiveLinkState, FormTabsCompositeViewHandler, ActiveLinks } from '../view_handler/form_tabs_composite_view_handler';
import { FormTabsDataContainer } from '../data_container/form_tabs_data_container';

class CentralMediator {

    private static instance: CentralMediator;

    // data containers
    private calendarDetailsDataContainer: DataContainer<CalendarDetailsState>;
    private calendarDetailsDescriptionDataContainer: DataContainer<CalendarDetailsDescriptionState>;
    private remainingDataContainer: DataContainer<RemainingState>;
    private categoryDataContainer: DataContainer<CategoryState>;
    private sourceDataContainer: DataContainer<SourceState>;
    private calendarMonthDataContainer: DataContainer<CalendarMonthState>;
    private formTabsDataContainer: DataContainer<ActiveLinkState>;
    private goalDataContainer: DataContainer<GoalState>;

    // view handlers
    private calendarDetailsViewHandler: ViewHandler<CalendarDetailsState>;
    private calendarDetailsDescriptionViewHandler: ViewHandler<CalendarDetailsDescriptionState>;
    private remainingViewHandler: ViewHandler<RemainingState>;
    private transactionFormViewHandler: ViewHandler<SourceCategoryComposite>;
    private calendarDayViewHandler: ViewHandler<CalendarMonthState>;
    private formTabsViewHandler: ViewHandler<ActiveLinkState>;
    private goalViewHandler: ViewHandler<GoalState>;
    private goalUpdateFormViewHandler: ViewHandler<GoalState>;
    private goalFormViewHandler: ViewHandler<void>;

    private constructor() {

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();
        this.remainingDataContainer = RemainingDataContainer.getInstance();
        this.categoryDataContainer = CategoryDataContainer.getInstance();
        this.sourceDataContainer = SourceDataContainer.getInstance();
        this.calendarMonthDataContainer = CalendarMonthDataContainer.getInstance();
        this.formTabsDataContainer = FormTabsDataContainer.getInstance();
        this.goalDataContainer = GoalDataContainer.getInstance();

        this.calendarDetailsViewHandler = new CalendarDetailsViewHandler();
        this.calendarDetailsDescriptionViewHandler = new CalendarDetailsDescriptionViewHandler();
        this.remainingViewHandler = new RemainingViewHandler();
        this.transactionFormViewHandler = new TransactionFormViewHandler();
        this.calendarDayViewHandler = new CalendarDayViewHandler();
        this.formTabsViewHandler = new FormTabsCompositeViewHandler();
        this.goalViewHandler = new GoalsViewHandler();
        this.goalFormViewHandler = new GoalFormViewHandler();
    }

    static getInstance(): CentralMediator {
        if(!CentralMediator.instance) {
            CentralMediator.instance = new CentralMediator();
        }

        return CentralMediator.instance;
    }

    dispatch(action: Actions): boolean {

        switch (action) {
            case Actions.DAY_CLICKED: {
                this.calendarDetailsDescriptionViewHandler.handle(this.calendarDetailsDescriptionDataContainer.getState());
                return this.calendarDetailsViewHandler.handle(this.calendarDetailsDataContainer.getState());
            }
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
                return true;
            }
            case Actions.UPDATE_SOURCES: {
                return true;
            }
            case Actions.UPDATE_MONTH: {
                return this.calendarDayViewHandler.handle(this.calendarMonthDataContainer.getState());
            }
            case Actions.FORM_TAB_CLICKED: {
                return this.formTabsViewHandler.handle(this.formTabsDataContainer.getState());
            }
            case Actions.UPDATE_GOALS: {
                return this.goalViewHandler.handle(this.goalDataContainer.getState()) 
                && this.goalUpdateFormViewHandler.handle(this.goalDataContainer.getState());
            }
            case Actions.GOAL_FORM_RENDER: {
                return this.goalFormViewHandler.handle(null);
            }
            default: {
                console.log("unrecognized_action: " + action);
                break;
            }
        }
    }
}

export { CentralMediator, Actions, DataContainer };