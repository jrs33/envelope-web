import { Router } from '../routing/router';

import { Goal, GoalState, GoalDataContainer } from '../data_container/goal_data_container';

import { AuthorizationDecorator } from '../auth/auth_decorator';
import { CentralMediator, Actions } from '../mediator/mediator';
import { ViewActions } from '../view_handler/view_actions';

class Goals {

    private static readonly ROUTE_TO_ACTION: string = 'goals';
    private static instance: Goals;

    private router: Router;
    private route: String;

    private goalDataContainer: GoalDataContainer;

    private constructor() {

        this.router = new Router();
        this.route = this.router.getRoute();

        this.goalDataContainer = GoalDataContainer.getInstance();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if (this.route === Goals.ROUTE_TO_ACTION) {
                this.connect();
            }
        })
    }

    static getInstance(): Goals {
        if(!Goals.instance) {
            Goals.instance = new Goals();
        }

        return Goals.instance;
    }

    async connect() {
        
        let initialTemplate: string = this.getInitialTemplate();
        document.getElementById('container').innerHTML = initialTemplate;

        // initialize the html element state
        let goals: Array<Goal> = await this.getGoals();
        this.goalDataContainer.setState({goals: goals});

        CentralMediator.getInstance().dispatch(Actions.GOAL_FORM_RENDER);
    }

    async dispatch(action: ViewActions) {
        
        switch(action) {
            case ViewActions.GOAL_UPDATED:
            case ViewActions.GOAL_CREATED: {
                this.goalDataContainer.setState({goals: await this.getGoals()});
            }
            default: {
                break;
            }
        }
    }

    private getGoals(): Promise<Array<Goal>> {
        
        return new Promise(function (resolve, reject) {
			var rawXmlHttpRequest = new XMLHttpRequest();
			rawXmlHttpRequest.open('GET', process.env.ENVELOPE_API_URL + '/goals?from=0');
			var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
                        let goalRawJson: Array<any> = JSON.parse(xhr.response);
                        let goals: Array<Goal> = [];
                        for (let rawGoal of goalRawJson) {
                            goals.push({
                                id: rawGoal.id,
                                userId: rawGoal.userId,
                                name: rawGoal.name,
                                goalAmount: rawGoal.goalAmount,
                                goalProgress: rawGoal.goalProgress
                            });
                        }
						resolve(goals);
					} else {
                        console.log("goal_fetch_error: " + xhr.status);
						reject("ERROR");
					}
				}
			};
			xhr.send();
		});
    }

    private getInitialTemplate(): string {
        return '<h1>Goals</h1><hr><div class="row"><div class="col-5"><div style="border: 1px solid lightgray; padding:20px;"><div id="goal-form" style="margin-top: 20px;"></div></div></div><div class="col-7"><div id="goal-state" class="row"></div></div><div class="col-5"><div style="border: 1px solid lightgray; padding:20px;"><div id="goal-update-form" style="margin-top: 20px;"></div></div></div></div>';
    }
}

export { Goals };