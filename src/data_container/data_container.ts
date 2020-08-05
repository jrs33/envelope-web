import { CentralMediator } from '../mediator/mediator';

interface DataContainer<T> {

    state: T;
    observer: CentralMediator;

    getState(): T;
    setState(newState: T): void;
}

export { DataContainer };