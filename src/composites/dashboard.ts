import { Calendar } from '../calendar/calendar';
import { CalendarDetails } from '../calendar/calendar_details';
import { Router } from '../routing/router';
import { StatisticDelegate } from '../statistics/statistics_delegate';

import { CalendarDetailsDataContainer, Transaction, CalendarDetailsState } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer } from '../data_container/calendar_details_description_container';
import { RemainingDataContainer } from '../data_container/remaining_data_container';
import { CategoryDataContainer, Category, CategoryState } from '../data_container/category_data_container';

import { AuthorizationDecorator } from '../auth/auth_decorator';

const CONFIG = require('../../config.local.json');

class Dashboard {

    static readonly ROUTE_TO_ACTION = 'dashboard';

    calendar : Calendar;
    calendarDetails: CalendarDetails;
    statistics: StatisticDelegate;

    private calendarDetailsDataContainer: CalendarDetailsDataContainer;
    private calendarDetailsDescriptionDataContainer: CalendarDetailsDescriptionDataContainer;
    private remainingDataContainer: RemainingDataContainer;
    private categoryDataContainer: CategoryDataContainer;

    private router: Router;
    private route: String;

    constructor() {

        this.calendar = new Calendar();
        this.calendarDetails = new CalendarDetails();
        this.statistics = new StatisticDelegate();

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();
        this.remainingDataContainer = RemainingDataContainer.getInstance();
        this.categoryDataContainer = CategoryDataContainer.getInstance();

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
        // let remainingHeader: HTMLElement = document.getElementById('remaining-amount');
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
        this.calendarDetailsDataContainer.setState(await this.getTransactionsPromise());
        this.calendarDetailsDescriptionDataContainer.setState({describe: "All Time"});
        this.remainingDataContainer.setState({value: await this.getRemaining()});
        this.categoryDataContainer.setState(await this.getCategories());
    }

    private getTransactionsPromise(): Promise<CalendarDetailsState> {
        
        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/transactions?from=0');
            
            var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
            xhr.timeout = 2000;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
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
                        resolve({transactions: convertedTransaction});
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

    private getRemaining(): Promise<string> {
        
        return new Promise(function (resolve, reject) {
			var rawXmlHttpRequest = new XMLHttpRequest();
			rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/envelope/statistics/remaining')
			var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
                        let remaining = "$" + parseFloat(xhr.response).toFixed(2);
						resolve(remaining);
					} else {
                        console.log("remaining_fetch_error: " + xhr.status);
						reject("ERROR");
					}
				}
			};
			xhr.send();
		});
    }

    private getCategories(): Promise<CategoryState> {
        return new Promise(function (resolve, reject) {
            var rawXmlRequest = new XMLHttpRequest();
            rawXmlRequest.open('GET', CONFIG.envelope_api.host + '/envelopes?from=0');

            var xhr = new AuthorizationDecorator(rawXmlRequest).decorate();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let categoryRawJson: Array<any> = JSON.parse(xhr.response);
                        let convertedCategories: Array<Category> = [];
                        for(let rawCategory of categoryRawJson) {
                            convertedCategories.push({
                                id: parseInt(rawCategory.id),
                                userId: rawCategory.userId,
                                name: rawCategory.name,
                                envelopeType: rawCategory.envelopeType,
                                allocatedMoney: parseFloat(rawCategory.allocatedMoney),
                                spentMoney: parseFloat(rawCategory.spentMoney)
                            });
                        }
                        resolve({categories: convertedCategories});
                    } else {
                        console.log("category_fetch_error: " + xhr.status);
						reject({categories: []});
                    }
                }
            };
            xhr.send();
        });
    }
}

export { Dashboard };