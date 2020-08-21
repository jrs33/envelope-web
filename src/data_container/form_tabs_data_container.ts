import { DataContainer } from "./data_container";
import { Actions } from "../mediator/actions";
import { CentralMediator } from "../mediator/mediator";
import { ActiveLinkState, ActiveLinks } from "../view_handler/form_tabs_composite_view_handler";

class FormTabsDataContainer implements DataContainer<ActiveLinkState> {
    
    private static instance: FormTabsDataContainer;

    state: ActiveLinkState;

    private constructor() {
        this.state = {link: null, sourceCategoryState: null};
    }

    static getInstance(): FormTabsDataContainer {
        if (!FormTabsDataContainer.instance) {
            FormTabsDataContainer.instance = new FormTabsDataContainer();
        }

        return FormTabsDataContainer.instance;
    }

    getState(): ActiveLinkState {
        return this.state;
    }

    setState(newState: ActiveLinkState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.FORM_TAB_CLICKED;
    }
}

export { FormTabsDataContainer };