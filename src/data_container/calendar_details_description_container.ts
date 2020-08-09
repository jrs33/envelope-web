import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';

interface CalendarDetailsDescriptionState {
    readonly describe: string;
}

class CalendarDetailsDescriptionDataContainer implements DataContainer<CalendarDetailsDescriptionState> {

    private static instance: CalendarDetailsDescriptionDataContainer;

    state: CalendarDetailsDescriptionState;

    private constructor() {

        this.state = {describe: ""};
    }

    static getInstance(): CalendarDetailsDescriptionDataContainer {
        if (!CalendarDetailsDescriptionDataContainer.instance) {
            CalendarDetailsDescriptionDataContainer.instance = new CalendarDetailsDescriptionDataContainer();
        }

        return CalendarDetailsDescriptionDataContainer.instance;
    }

    getState(): CalendarDetailsDescriptionState {
        return this.state;
    }

    setState(newState: CalendarDetailsDescriptionState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.UPDATE_CALENDAR_DETAILS_DESCRIPTION;
    }
}

export { CalendarDetailsDescriptionDataContainer, CalendarDetailsDescriptionState };