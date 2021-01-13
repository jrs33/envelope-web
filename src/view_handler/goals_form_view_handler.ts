import { ViewHandler } from "./view_handler";
import { AuthorizationDecorator } from "../auth/auth_decorator";

class GoalFormViewHandler implements ViewHandler<void> {

    constructor() {}

    handle(state: void): boolean {

        let formTabContent: HTMLElement = this.getDOMElement();
        let header: HTMLHeadingElement = document.createElement('h4');
        header.textContent = "Create Goal";
        formTabContent.appendChild(header);
        formTabContent.appendChild(this.renderGoalCreationForm());

        return true;
    }

    private getDOMElement(): HTMLElement {
        let goalForm: HTMLElement = document.getElementById('goal-form');
        goalForm.innerHTML = ""; // clear current state
        return goalForm;
    }

    private renderGoalCreationForm() : HTMLFormElement {
		
        var createGoalForm = document.createElement('form');
        createGoalForm.id = "goalForm";

        // goal name input
        var goalNameFormGroup = document.createElement('div');
        goalNameFormGroup.id = "goalNameFormGroup";
        goalNameFormGroup.className = "form-group";
        createGoalForm.appendChild(goalNameFormGroup);

        var createGoalName = document.createElement('input');
        createGoalName.id = "goalNameInput";
        createGoalName.name = "name";
        createGoalName.className = "form-control";

        var createGoalNameLabel = document.createElement('label');
        createGoalNameLabel.setAttribute("for", createGoalName.id);
        createGoalNameLabel.textContent = "Name";

        goalNameFormGroup.appendChild(createGoalNameLabel);
        goalNameFormGroup.appendChild(createGoalName);

        // goal amount input
        var goalAmountFormGroup = document.createElement('div');
        goalAmountFormGroup.id = "goalAmountFormGroup";
        goalAmountFormGroup.className = "form-group";
        createGoalForm.appendChild(goalAmountFormGroup);

        var createGoalAmount = document.createElement('input');
        createGoalAmount.id = "goalAmountInput";
        createGoalAmount.name = "goalAmount";
        createGoalAmount.className = "form-control";

        var createGoalAmountLabel = document.createElement('label');
        createGoalAmountLabel.setAttribute("for", createGoalAmount.id);
        createGoalAmountLabel.textContent = "Goal Amount";

        goalNameFormGroup.appendChild(createGoalAmountLabel);
        goalNameFormGroup.appendChild(createGoalAmount);

        // goal progress input
        var goalProgressFormGroup = document.createElement('div');
        goalProgressFormGroup.id = "goalProgressFormGroup";
        goalProgressFormGroup.className = "form-group";
        createGoalForm.appendChild(goalProgressFormGroup);

        var createGoalProgress = document.createElement('input');
        createGoalProgress.id = "goalProgressInput";
        createGoalProgress.name = "goalProgress";
        createGoalProgress.className = "form-control";

        var createGoalProgressLabel = document.createElement('label');
        createGoalProgressLabel.setAttribute("for", createGoalProgress.id);
        createGoalProgressLabel.textContent = "Goal Progress";

        goalNameFormGroup.appendChild(createGoalProgressLabel);
        goalNameFormGroup.appendChild(createGoalProgress);

        // form submit button
        var createGoalButton = document.createElement('button');
        createGoalButton.textContent = "Create";
        createGoalButton.className = "btn btn-primary";
        createGoalForm.appendChild(createGoalButton);

        createGoalForm.addEventListener('submit', event => {
            this.createGoal(event, () => {
                // TODO: confirmation
            });
            createGoalForm.reset();
        });

        return createGoalForm;
    }

    private createGoal(goal, callback) {
        goal.preventDefault();

        let name = goal.target["name"].value;
        let amount = goal.target["goalAmount"].value;
        let progress = goal.target["goalProgress"].value;
        
        var rawRequest = new XMLHttpRequest();
        rawRequest.open('POST', process.env.ENVELOPE_API_URL + '/goal/create');
        var xhr = new AuthorizationDecorator(rawRequest).decorate();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                callback();
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: name,
            goalAmount: amount,
            goalProgress: progress
        }));
    };
}

export { GoalFormViewHandler };