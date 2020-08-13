import { Router } from '../routing/router';

import { CalendarDetailsDataContainer, Transaction, CalendarDetailsState } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer } from '../data_container/calendar_details_description_container';
import { RemainingDataContainer } from '../data_container/remaining_data_container';
import { CategoryDataContainer, Category, CategoryState } from '../data_container/category_data_container';
import { SourceDataContainer, SourceState, Source } from '../data_container/source_data_container';
import { CalendarMonthDataContainer, CalendarMonthState } from '../data_container/calendar_month_data_container';

import { ViewActions } from '../view_handler/view_actions';

import { AuthorizationDecorator } from '../auth/auth_decorator';

const CONFIG = require('../../config.local.json');

class Dashboard {

    private static readonly ROUTE_TO_ACTION: string = 'dashboard';
    private static instance: Dashboard;

    private calendarDetailsDataContainer: CalendarDetailsDataContainer;
    private calendarDetailsDescriptionDataContainer: CalendarDetailsDescriptionDataContainer;
    private remainingDataContainer: RemainingDataContainer;
    private categoryDataContainer: CategoryDataContainer;
    private sourceDataContainer: SourceDataContainer;
    private calendarMonthDataContainer: CalendarMonthDataContainer;

    private router: Router;
    private route: String;

    private constructor() {

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();
        this.remainingDataContainer = RemainingDataContainer.getInstance();
        this.categoryDataContainer = CategoryDataContainer.getInstance();
        this.sourceDataContainer = SourceDataContainer.getInstance();
        this.calendarMonthDataContainer = CalendarMonthDataContainer.getInstance();

        this.router = new Router();
        this.route = this.router.getRoute();
        
        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            if(this.route === Dashboard.ROUTE_TO_ACTION) {
                this.connect();
            }
        });
    }

    static getInstance(): Dashboard {
        if(!Dashboard.instance) {
            Dashboard.instance = new Dashboard();
        }

        return Dashboard.instance;
    }

    async connect() {

        // initialize the html element state
        let categoryState: CategoryState = await this.getCategories();
        let sourceState: SourceState = await this.getSources();
        this.categoryDataContainer.setState(categoryState);
        this.sourceDataContainer.setState(sourceState);
        
        let transactionPromise: Promise<CalendarDetailsState> = this.getTransactionsPromise(categoryState, sourceState);
        this.calendarDetailsDataContainer.setState(await transactionPromise);
        this.calendarDetailsDescriptionDataContainer.setState({describe: "All Time"});
        this.remainingDataContainer.setState({value: await this.getRemaining()});

        this.calendarMonthDataContainer.setState({selectedMonth: 8, selectedYear: 2020, transactions: (await transactionPromise).transactions});
    }

    async dispatch(action: ViewActions) {
        
        switch(action) {
            case ViewActions.TRANSACTION_CREATED: {
                this.calendarDetailsDataContainer.setState(await this.getTransactionsPromise(this.categoryDataContainer.getState(), this.sourceDataContainer.getState()));
                this.remainingDataContainer.setState({value: await this.getRemaining()});
            }
            default: {
                break;
            }
        }
    }

    private getTransactionsPromise(categoryState: CategoryState, sourceState: SourceState): Promise<CalendarDetailsState> {
        
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

                            debugger;
                            let category: Category = categoryState.categories.find(category => category.id == parseInt(rawTransaction.envelopeId));
                            let categoryName: string = category ? category.name : "";

                            let source: Source = sourceState.sources.find(source => source.id == parseInt(rawTransaction.sourceId));
                            let sourceName: string = source ? source.name : "";

                            convertedTransaction.push({
                                date: new Date(rawTransaction.date),
                                transaction: rawTransaction.transactionName,
                                categoryId: parseInt(rawTransaction.envelopeId),
                                category: categoryName,
                                methodId: parseInt(rawTransaction.sourceId),
                                method: sourceName,
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

    private getSources(): Promise<SourceState> {
        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/sources');
            var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
            xhr.timeout = 2000;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let sourceRawJson: Array<any> = JSON.parse(xhr.response);
                        let convertedSources: Array<Source> = [];
                        for(let rawSource of sourceRawJson) {
                            convertedSources.push({
                                id: parseInt(rawSource.id),
                                userId: rawSource.userId,
                                name: rawSource.name,
                                description: rawSource.description
                            });
                        }
                        resolve({sources: convertedSources});
                    } else {
                        console.log("category_fetch_error: " + xhr.status);
						reject({categories: []});
                    }
                }
            };
            xhr.ontimeout = function () {
                reject('timeout')
            };
            xhr.send();
        });
    }
}

export { Dashboard };