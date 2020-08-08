import { CentralMediator, Actions } from '../mediator/mediator';

abstract class DataContainer<T> {

    state: T;

    constructor(state: T) {
        this.state = state;
    }

    abstract getAction(): Actions;

    getState(): T {
        return this.state;
    }

    setState(newState: T): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }
}

export { DataContainer };