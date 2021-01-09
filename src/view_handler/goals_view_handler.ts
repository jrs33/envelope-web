import { GoalState, Goal } from '../data_container/goal_data_container';
import { ViewHandler } from '../view_handler/view_handler';

class GoalsViewHandler implements ViewHandler<GoalState> {

    constructor() {}

    handle(state: GoalState): boolean {

        let goalsHtml: HTMLElement = document.getElementById('goal-state');
        goalsHtml.innerHTML = ''; //clear state

        let goalCardArray = state.goals
            .map(goal => this.constructGoalCard(goal));

        goalCardArray.forEach(goalCard => goalsHtml.appendChild(goalCard));
        return true;
    }

    private constructGoalCard(goal: Goal): HTMLElement {
        let cardColumns = document.createElement('div');
        cardColumns.className = 'col-sm-6';

        let card = document.createElement('div');
        card.className = 'card';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardHeader = document.createElement('h5');
        cardHeader.className = 'card-title';
        cardHeader.textContent = goal.name;

        let cardProgressDiv = document.createElement('div');
        cardProgressDiv.className = 'progress';

        var cardProgressBar = document.createElement('div');
        cardProgressBar.className = 'progress-bar';
        let progressPercentage : number = (goal.goalProgress / goal.goalAmount) * 100.0;
        cardProgressBar.style.width = progressPercentage + '%;';
        cardProgressBar.textContent = goal.goalProgress + '';

        cardProgressDiv.appendChild(cardProgressBar);
        cardBody.appendChild(cardHeader);
        cardBody.appendChild(cardProgressDiv);
        card.appendChild(cardBody);
        cardColumns.appendChild(card);

        return cardColumns;
    }
}

export { GoalsViewHandler };

/*
<div class="col-sm-6">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
        </div>
    </div>
</div>
*/