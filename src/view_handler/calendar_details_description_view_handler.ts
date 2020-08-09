import { ViewHandler } from './view_handler';
import { CalendarDetailsDescriptionState } from '../data_container/calendar_details_description_container';

class CalendarDetailsDescriptionViewHandler implements ViewHandler<CalendarDetailsDescriptionState> {

    constructor() {}

    handle(state: CalendarDetailsDescriptionState): boolean {

        let transactionSelectDescription: HTMLElement = this.getDOMElement();
        transactionSelectDescription.textContent = state.describe;

        return true;
    }

    private getDOMElement(): HTMLElement {
        let tableBody: HTMLElement = document.getElementById('transaction-select-description');
        tableBody.innerHTML = ""; // clear current state
        return tableBody;
    }
}

export { CalendarDetailsDescriptionViewHandler };