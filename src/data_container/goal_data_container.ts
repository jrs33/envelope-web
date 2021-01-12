import { DataContainer } from './data_container';
import { CentralMediator } from '../mediator/mediator';
import { Actions } from '../mediator/actions';

interface GoalState {
    readonly goals: Array<Goal>;
}

interface Goal {
    readonly id: number;
    readonly userId: string;
    readonly name: string;
    readonly goalAmount: number;
    readonly goalProgress: number;
}

class GoalDataContainer implements DataContainer<GoalState> {

    private static instance: GoalDataContainer;

    state: GoalState;

    private constructor() {
        this.state = {goals: []};
    }

    static getInstance(): GoalDataContainer {
        if (!GoalDataContainer.instance) {
            GoalDataContainer.instance = new GoalDataContainer();
        }

        return GoalDataContainer.instance;
    }

    getState(): GoalState {
        return this.state;
    }

    setState(newState: GoalState): void {
        this.state = newState;
        CentralMediator.getInstance().dispatch(Actions.UPDATE_GOALS);
    }

    getAction(): Actions {
        return Actions.UPDATE_GOALS;
    }
}

export { GoalState, Goal, GoalDataContainer };