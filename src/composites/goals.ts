import { Router } from '../routing/router';

class Goals {

    private static readonly ROUTE_TO_ACTION: string = 'goals';
    private static instance: Goals;

    private router: Router;
    private route: String;

    private constructor() {

        this.router = new Router();
        this.route = this.router.getRoute();

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
    }

    private getInitialTemplate(): string {
        return '<h1>Goals</h1><hr><div class="row"><div class="col-5"><div style="border: 1px solid lightgray; padding:20px;"><div id="goal-form" style="margin-top: 20px;"></div></div></div><div class="col-7"><div class="row"><div class="col-sm-6"><div class="card"><div class="card-body"><h5 class="card-title">Special title treatment</h5><p class="card-text">With supporting text below as a natural lead-in to additional content.</p><div class="progress"><div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div></div><div class="col-sm-6"><div class="card"><div class="card-body"><h5 class="card-title">Special title treatment</h5><p class="card-text">With supporting text below as a natural lead-in to additional content.</p><div class="progress"><div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div></div><div class="col-sm-6"><div class="card"><div class="card-body"><h5 class="card-title">Special title treatment</h5><p class="card-text">With supporting text below as a natural lead-in to additional content.</p><div class="progress"><div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div></div><div class="col-sm-6"><div class="card"><div class="card-body"><h5 class="card-title">Special title treatment</h5><p class="card-text">With supporting text below as a natural lead-in to additional content.</p><div class="progress"><div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div></div></div></div></div>';
    }


    /*
    <h1>Goals</h1>
    <hr>
    <div class="row">
        <div class="col-5">
            <div style="border: 1px solid lightgray; padding:20px;">
                <div id="goal-form" style="margin-top: 20px;"></div>
            </div>
        </div>
        <div class="col-7">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    */
}

export { Goals };