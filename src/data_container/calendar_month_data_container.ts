import { DataContainer } from "./data_container";
import { CentralMediator, Actions } from "../mediator/mediator";
import Transaction from './transaction';

interface CalendarMonthState {
    selectedMonth: number;
    selectedYear: number;
    transactions: Array<Transaction>;
}

class CalendarMonthDataContainer implements DataContainer<CalendarMonthState> {

    private static instance: CalendarMonthDataContainer;

    state: CalendarMonthState;

    constructor() {

        this.state = {selectedMonth: -1, selectedYear: -1, transactions: []};
    }

    static getInstance() {
        if(!CalendarMonthDataContainer.instance) {
            CalendarMonthDataContainer.instance = new CalendarMonthDataContainer();
        }

        return CalendarMonthDataContainer.instance;
    }

    getState(): CalendarMonthState {
        return this.state;
    }

    setState(state: CalendarMonthState) {
        this.state = state;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.UPDATE_MONTH;
    }
}

export { CalendarMonthState, CalendarMonthDataContainer };