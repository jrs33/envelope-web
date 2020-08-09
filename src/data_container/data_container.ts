interface DataContainer<T> {

    state: T;

    getState(): T;
    setState(newState: T): void;
}

export { DataContainer };