import { ViewHandler } from "./view_handler";
import { AuthorizationDecorator } from "../auth/auth_decorator";

import { Goal, GoalState } from '../data_container/goal_data_container';

class GoalUpdateFormViewHandler implements ViewHandler<GoalState> {

    constructor() {}

    handle(state: GoalState): boolean {

        let formTabContent: HTMLElement = this.getDOMElement();
        let header: HTMLHeadingElement = document.createElement('h4');
        header.textContent = "Update Goal Progress";
        formTabContent.appendChild(header);
        formTabContent.appendChild(this.renderGoalUpdateForm(state));

        return true;
    }

    private getDOMElement(): HTMLElement {
        let goalForm: HTMLElement = document.getElementById('goal-update-form');
        goalForm.innerHTML = ""; // clear current state
        return goalForm;
    }

    private renderGoalUpdateForm(state: GoalState) : HTMLFormElement {
		
        var updateGoalForm = document.createElement('form');
        updateGoalForm.id = "goalUpdateForm";

        // goal select
		var goalFormGroup = document.createElement('div');
		goalFormGroup.id = "goalFormGroup";
		goalFormGroup.className = "form-group";
		updateGoalForm.appendChild(goalFormGroup);

		var selectGoalElement = document.createElement('select');
		selectGoalElement.id = "goalSelect";
		selectGoalElement.name = "id";
		selectGoalElement.className = "form-control";
		this.renderUpdateGoalOptions(selectGoalElement, state.goals);

		var updateGoalLabel = document.createElement('label');
		updateGoalLabel.setAttribute("for", selectGoalElement.id);
		updateGoalLabel.textContent = "Goal";

		goalFormGroup.appendChild(updateGoalLabel);
        goalFormGroup.appendChild(selectGoalElement);
        
        // goal amount input
        var goalAmountFormGroup = document.createElement('div');
        goalAmountFormGroup.id = "goalAmountFormGroup";
        goalAmountFormGroup.className = "form-group";
        updateGoalForm.appendChild(goalAmountFormGroup);

        var goalAmount = document.createElement('input');
        goalAmount.id = "goalAmountInput";
        goalAmount.name = "amount";
        goalAmount.className = "form-control";

        var goalAmountLabel = document.createElement('label');
        goalAmountLabel.setAttribute("for", goalAmount.id);
        goalAmountLabel.textContent = "Amount";

        goalAmountFormGroup.appendChild(goalAmountLabel);
        goalAmountFormGroup.appendChild(goalAmount);

        // form submit button
        var updateGoalButton = document.createElement('button');
        updateGoalButton.textContent = "Update";
        updateGoalButton.className = "btn btn-primary";
        updateGoalForm.appendChild(updateGoalButton);

        updateGoalForm.addEventListener('submit', event => {
            this.updateGoal(event, () => {
                // TODO: confirmation
            });
            updateGoalForm.reset();
        });

        return updateGoalForm;
    }

    private updateGoal(goalUpdate, callback) {
        goalUpdate.preventDefault();

        let id = goalUpdate.target["id"].value;
        let amount = goalUpdate.target["amount"].value;
        
        var rawRequest = new XMLHttpRequest();
        let requestUrl = process.env.ENVELOPE_API_URL + '/goal/progress/increase?amount=' + amount + '&goalId=' + id
        rawRequest.open('PATCH', requestUrl);
        var authedRequest = new AuthorizationDecorator(rawRequest).decorate();
        authedRequest.onreadystatechange = function() {
            if(authedRequest.readyState == 4 && authedRequest.status == 200) {
                callback();
            }
        };
        authedRequest.setRequestHeader('Content-Type', 'application/json');
        authedRequest.send(JSON.stringify({}));
    };

    private renderUpdateGoalOptions(selectGoalElement: HTMLSelectElement, goals: Array<Goal>): void{

        for(const goal of goals) {
    
            var option = document.createElement('option');
            option.textContent = goal.name;
            option.value = "" + goal.id;
            selectGoalElement.appendChild(option);
        }
    }
}

export { GoalUpdateFormViewHandler };