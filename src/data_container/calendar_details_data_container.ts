import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';

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

class CalendarDetailsDataContainer implements DataContainer<CalendarDetailsState> {

    state: CalendarDetailsState;
    observer: CentralMediator;

    constructor() {

        this.state = {transactions: []};
        this.observer = new CentralMediator();
    }

    getState(): CalendarDetailsState {
        return this.state;
    }

    setState(state: CalendarDetailsState): void {
        this.state = state;
    }
}

export { CalendarDetailsDataContainer, CalendarDetailsState };