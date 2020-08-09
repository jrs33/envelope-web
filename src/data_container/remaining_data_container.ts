import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';

interface RemainingState {
    readonly value: string;
}

class RemainingDataContainer implements DataContainer<RemainingState> {

    private static instance: RemainingDataContainer;

    state: RemainingState;

    private constructor() {

        this.state = {value: "$0.00"};
    }

    static getInstance(): RemainingDataContainer {
        if (!RemainingDataContainer.instance) {
            RemainingDataContainer.instance = new RemainingDataContainer();
        }

        return RemainingDataContainer.instance;
    }

    getState(): RemainingState {
        return this.state;
    }

    setState(newState: RemainingState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.UPDATE_REMAINING;
    }
}

export { RemainingDataContainer, RemainingState };