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

        let cardDescription = document.createElement('p');
        cardDescription.className = "card-text";
        cardDescription.textContent = '$' + goal.goalProgress + ' out of a target of $' + goal.goalAmount;

        var cardProgressBar = document.createElement('div');
        cardProgressBar.className = 'progress-bar';
        let progressPercentage = (goal.goalProgress / goal.goalAmount) * 100.0;
        cardProgressBar.style.width = progressPercentage + '%';
        cardProgressBar.textContent = progressPercentage + '%';

        cardProgressDiv.appendChild(cardProgressBar);
        cardBody.appendChild(cardHeader);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(cardProgressDiv);
        card.appendChild(cardBody);
        cardColumns.appendChild(card);

        return cardColumns;
    }
}

export { GoalsViewHandler };
