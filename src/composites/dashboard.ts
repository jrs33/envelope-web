import { Calendar } from '../calendar/calendar';
import { CalendarDetails } from '../calendar/calendar_details';
import { Router } from '../routing/router';
import { StatisticDelegate } from '../statistics/statistics_delegate';

import { CalendarDetailsDataContainer, Transaction } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer } from '../data_container/calendar_details_description_container';
import { AuthorizationDecorator } from '../auth/auth_decorator';

const CONFIG = require('../../config.local.json');

class Dashboard {

    static readonly ROUTE_TO_ACTION = 'dashboard';

    calendar : Calendar;
    calendarDetails: CalendarDetails;
    statistics: StatisticDelegate;

    calendarDetailsDataContainer: CalendarDetailsDataContainer;
    calendarDetailsDescriptionDataContainer: CalendarDetailsDescriptionDataContainer;

    router: Router;
    route: String;

    constructor() {

        this.calendar = new Calendar();
        this.calendarDetails = new CalendarDetails();
        this.statistics = new StatisticDelegate();

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();

        this.router = new Router();
        this.route = this.router.getRoute();
        
        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === Dashboard.ROUTE_TO_ACTION) {
                this.connect();
            }
        });
    }

    async connect() {

        // get reference to html elements that will be dispatching events to data containers
        let remainingHeader: HTMLElement = document.getElementById('remaining-amount');
        // TODO: form set up
        let transactionFormTabLink: HTMLElement = document.getElementById('transaction-form-sublink');
        let categoryFormTabLink: HTMLElement = document.getElementById('category-form-sublink');
        let sourceFormTabLink: HTMLElement = document.getElementById('source-form-sublink');
        let formTabContent: HTMLElement = document.getElementById('my-tab-content');
        let monthIndicator: HTMLElement = document.getElementById('month-indicator');
        let dateGrid: HTMLElement = document.getElementById('date-grid');
        // let transactionSelectDescription: HTMLElement = document.getElementById('transaction-select-description');
        // let calendarDetailsBody: HTMLElement = document.getElementById('calendar-details-body');

        // initialize the html element state
        this.calendarDetailsDataContainer.setState({transactions: await this.getTransactionsPromise()});
        this.calendarDetailsDescriptionDataContainer.setState({describe: "All Time"});

        // add event listeners to dispatch state changes to data containers
        // which will update other UI components
    }

    private getTransactionsPromise() : Promise<Array<Transaction>> {
        
        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/transactions?from=0');
            
            var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
            xhr.timeout = 2000;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        debugger;
                        let transactionRawJson: Array<any> = JSON.parse(xhr.response);
                        let convertedTransaction: Array<Transaction> = [];
                        for(let rawTransaction of transactionRawJson) {
                            let details = "";
                            if(!rawTransaction.details) {
                                details = "";   
                            } else {
                                details = "" + rawTransaction.details
                            }
                            convertedTransaction.push({
                                date: new Date(rawTransaction.date),
                                transaction: rawTransaction.transactionName,
                                category: "TODO",
                                method: "TODO",
                                detail: details,
                                amount: parseFloat(rawTransaction.amount)
                            })
                        }
                        resolve(convertedTransaction);
                    } else {
                        console.log("transaction_fetch_error: " + xhr.status);
                        reject([]);
                    }
                }
            };
            xhr.ontimeout = function () {
                reject('timeout')
            }
            xhr.send();
        });
    }
}

export { Dashboard };