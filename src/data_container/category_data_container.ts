import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';

interface CategoryState {
    readonly categories: Array<Category>;
}

interface Category {
    readonly id: number;
    readonly userId: string;
    readonly name: string;
    readonly envelopeType: string;
    readonly allocatedMoney: number;
    readonly spentMoney: number;
}

class CategoryDataContainer implements DataContainer<CategoryState> {

    private static instance: CategoryDataContainer;

    state: CategoryState;

    private constructor() {

        this.state = {categories: []};
    }

    static getInstance(): CategoryDataContainer {
        if (!CategoryDataContainer.instance) {
            CategoryDataContainer.instance = new CategoryDataContainer();
        }

        return CategoryDataContainer.instance;
    }

    getState(): CategoryState {
        return this.state;
    }

    setState(newState: CategoryState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(this.getAction());
    }

    getAction(): Actions {
        return Actions.UPDATE_CATEGORIES;
    }
}

export { CategoryDataContainer, CategoryState, Category };