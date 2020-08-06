interface ViewHandler<T> {
    handle(state: T): boolean;
}

export { ViewHandler };