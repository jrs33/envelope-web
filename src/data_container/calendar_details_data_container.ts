import { DataContainer } from './data_container';
import { Actions } from '../mediator/mediator';

interface CalendarDetailsState {
    readonly transactions: Array<Transaction>;
}

interface Transaction {
    readonly date: Date;
    readonly transaction: string;
    readonly category: string;
    readonly method: string;
    readonly detail?: string;
    readonly amount: number;
}

class CalendarDetailsDataContainer extends DataContainer<CalendarDetailsState> {

    private static instance: CalendarDetailsDataContainer;

    state: CalendarDetailsState;

    private constructor() {

        super({transactions: []});
    }

    static getInstance(): CalendarDetailsDataContainer {
        if (!CalendarDetailsDataContainer.instance) {
            CalendarDetailsDataContainer.instance = new CalendarDetailsDataContainer();
        }

        return CalendarDetailsDataContainer.instance;
    }

    getAction(): Actions {
        return Actions.UPDATE_CALENDAR_DETAILS;
    }
}

export { CalendarDetailsDataContainer, CalendarDetailsState, Transaction };