import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';
import Transaction from './transaction';

interface CalendarDetailsState {
    readonly transactions: Array<Transaction>;
}

class CalendarDetailsDataContainer implements DataContainer<CalendarDetailsState> {

    private static instance: CalendarDetailsDataContainer;

    state: CalendarDetailsState;

    private constructor() {

        this.state = {transactions: []};
    }

    static getInstance(): CalendarDetailsDataContainer {
        if (!CalendarDetailsDataContainer.instance) {
            CalendarDetailsDataContainer.instance = new CalendarDetailsDataContainer();
        }

        return CalendarDetailsDataContainer.instance;
    }

    getState(): CalendarDetailsState {
        return this.state;
    }

    setState(newState: CalendarDetailsState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.UPDATE_CALENDAR_DETAILS;
    }
}

export { CalendarDetailsDataContainer, CalendarDetailsState, Transaction };