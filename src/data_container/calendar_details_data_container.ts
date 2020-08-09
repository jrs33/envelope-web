import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';

interface CalendarDetailsState {
    readonly transactions: Array<Transaction>;
}

interface Transaction {
    readonly date: Date;
    readonly transaction: string;

    readonly categoryId: number;
    readonly category: string;

    readonly methodId: number;
    readonly method: string;
    
    readonly detail?: string;
    readonly amount: number;
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