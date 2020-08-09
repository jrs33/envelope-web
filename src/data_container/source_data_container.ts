import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';

interface SourceState {
    readonly sources: Array<Source>;
}

interface Source {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly userId: string
}

class SourceDataContainer implements DataContainer<SourceState> {

    private static instance: SourceDataContainer;

    state: SourceState;

    private constructor() {

        this.state = {sources: []};
    }

    static getInstance(): SourceDataContainer {
        if (!SourceDataContainer.instance) {
            SourceDataContainer.instance = new SourceDataContainer();
        }

        return SourceDataContainer.instance;
    }

    getState(): SourceState {
        return this.state;
    }

    setState(newState: SourceState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.UPDATE_SOURCES;
    }
}

export { SourceDataContainer, SourceState, Source };