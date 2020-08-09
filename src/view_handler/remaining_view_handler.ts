import { ViewHandler } from './view_handler';
import { RemainingState } from '../data_container/remaining_data_container';

class RemainingViewHandler implements ViewHandler<RemainingState> {

    constructor() {}

    handle(state: RemainingState): boolean {

        let remaining: HTMLElement = this.getDOMElement();
        remaining.textContent = state.value;

        return true;
    }

    private getDOMElement(): HTMLElement {
        let tableBody: HTMLElement = document.getElementById('remaining-amount');
        tableBody.innerHTML = ""; // clear current state
        return tableBody;
    }
}

export { RemainingViewHandler };