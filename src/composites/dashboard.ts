import { Router } from '../routing/router';

import { CalendarDetailsDataContainer, Transaction, CalendarDetailsState } from '../data_container/calendar_details_data_container';
import { CalendarDetailsDescriptionDataContainer } from '../data_container/calendar_details_description_container';
import { RemainingDataContainer } from '../data_container/remaining_data_container';
import { CategoryDataContainer, Category, CategoryState } from '../data_container/category_data_container';
import { SourceDataContainer, SourceState, Source } from '../data_container/source_data_container';
import { CalendarMonthDataContainer, CalendarMonthState } from '../data_container/calendar_month_data_container';
import { FormTabsDataContainer } from '../data_container/form_tabs_data_container';

import { ViewActions } from '../view_handler/view_actions';

import { AuthorizationDecorator } from '../auth/auth_decorator';
import { ActiveLinks } from '../view_handler/form_tabs_composite_view_handler';

class Dashboard {

    private static readonly months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    private static readonly ROUTE_TO_ACTION: string = 'dashboard';
    private static instance: Dashboard;

    private calendarDetailsDataContainer: CalendarDetailsDataContainer;
    private calendarDetailsDescriptionDataContainer: CalendarDetailsDescriptionDataContainer;
    private remainingDataContainer: RemainingDataContainer;
    private categoryDataContainer: CategoryDataContainer;
    private sourceDataContainer: SourceDataContainer;
    private calendarMonthDataContainer: CalendarMonthDataContainer;
    private formTabsDataContainer: FormTabsDataContainer

    private router: Router;
    private route: String;

    private constructor() {

        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();
        this.remainingDataContainer = RemainingDataContainer.getInstance();
        this.categoryDataContainer = CategoryDataContainer.getInstance();
        this.sourceDataContainer = SourceDataContainer.getInstance();
        this.calendarMonthDataContainer = CalendarMonthDataContainer.getInstance();
        this.formTabsDataContainer = FormTabsDataContainer.getInstance();

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

        debugger;

        // initialize the html element state
        let categoryState: CategoryState = await this.getCategories();
        let sourceState: SourceState = await this.getSources();
        this.categoryDataContainer.setState(categoryState);
        this.sourceDataContainer.setState(sourceState);

        this.formTabsDataContainer.setState({link: ActiveLinks.TRANSACTION, sourceCategoryState: {sourceState: sourceState, categoryState: categoryState}});
        document.getElementById("transaction-form-sublink").addEventListener("click", event => {
            this.formTabsDataContainer.setState({link: ActiveLinks.TRANSACTION, sourceCategoryState: {sourceState: this.sourceDataContainer.getState(), categoryState: this.categoryDataContainer.getState()}});
        });
        document.getElementById("category-form-sublink").addEventListener("click", event => {
            this.formTabsDataContainer.setState({link: ActiveLinks.CATEGORY, sourceCategoryState: {sourceState: this.sourceDataContainer.getState(), categoryState: this.categoryDataContainer.getState()}});
        });
        document.getElementById("method-form-sublink").addEventListener("click", event => {
            this.formTabsDataContainer.setState({link: ActiveLinks.METHOD, sourceCategoryState: {sourceState: this.sourceDataContainer.getState(), categoryState: this.categoryDataContainer.getState()}});
        });
        
        let currentDate = new Date();
        let transactionPromise: Promise<CalendarDetailsState> = this.getTransactionsPromise(currentDate.getMonth()+1, currentDate.getFullYear(), categoryState, sourceState);
        this.calendarDetailsDataContainer.setState(await transactionPromise);
        this.calendarDetailsDescriptionDataContainer.setState({describe: [Dashboard.months[currentDate.getMonth()], currentDate.getDate()].join(" ")});
        this.remainingDataContainer.setState({value: await this.getRemaining()});

        this.calendarMonthDataContainer.setState({
            selectedMonth: currentDate.getMonth() + 1, 
            selectedYear: currentDate.getFullYear(), 
            transactions: (await transactionPromise).transactions
        });
        document.getElementById("previous-month").addEventListener("click", event => {
            let currentMonthState = this.calendarMonthDataContainer.getState();
            
            let newMonth: number;
            let newYear: number;
            if (currentMonthState.selectedMonth == 1) {
                newMonth = 12;
                newYear = currentMonthState.selectedYear - 1;
            } else {
                newMonth = currentMonthState.selectedMonth - 1;
                newYear = currentMonthState.selectedYear;
            }

            this.getTransactionsPromise(newMonth, newYear, categoryState, sourceState)
                .then(state => {
                    debugger;
                    this.calendarMonthDataContainer.setState({
                        selectedMonth: newMonth, 
                        selectedYear: newYear, 
                        transactions: state.transactions
                    });
                })
                .catch(err => console.log("error_switching_months: " + err));
        });
        document.getElementById("next-month").addEventListener("click", event => {
            let currentMonthState = this.calendarMonthDataContainer.getState();

            let newMonth: number;
            let newYear: number;
            if (currentMonthState.selectedMonth == 12) {
                newMonth = 1;
                newYear = currentMonthState.selectedYear + 1;
            } else {
                newMonth = currentMonthState.selectedMonth + 1;
                newYear = currentMonthState.selectedYear;
            }

            this.getTransactionsPromise(newMonth, newYear, categoryState, sourceState)
                .then(state => {
                    debugger;
                    this.calendarMonthDataContainer.setState({
                        selectedMonth: newMonth, 
                        selectedYear: newYear, 
                        transactions: state.transactions
                    });
                })
                .catch(err => console.log("error_switching_months: " + err));
        });
    }

    async dispatch(action: ViewActions) {
        
        switch(action) {
            case ViewActions.TRANSACTION_CREATED: {
                let calendarMonthState: CalendarMonthState = this.calendarMonthDataContainer.getState();
                this.calendarDetailsDataContainer.setState(await this.getTransactionsPromise(calendarMonthState.selectedMonth, calendarMonthState.selectedYear, this.categoryDataContainer.getState(), this.sourceDataContainer.getState()));
                this.remainingDataContainer.setState({value: await this.getRemaining()});
            }
            default: {
                break;
            }
        }
    }

    private getTransactionsPromise(month: number, year: number, categoryState: CategoryState, sourceState: SourceState): Promise<CalendarDetailsState> {
        
        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', process.env.ENVELOPE_API_URL + '/transactions/date/all?month=' + month + '&year=' + year);
            
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

                            let category: Category = categoryState.categories.find(category => category.id == parseInt(rawTransaction.envelopeId));
                            let categoryName: string = category ? category.name : "";

                            let source: Source = sourceState.sources.find(source => source.id == parseInt(rawTransaction.sourceId));
                            let sourceName: string = source ? source.name : "";

                            convertedTransaction.push({
                                year: rawTransaction.year,
                                month: rawTransaction.month,
                                day: rawTransaction.day,
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
			rawXmlHttpRequest.open('GET', process.env.ENVELOPE_API_URL + '/envelope/statistics/remaining')
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
            rawXmlRequest.open('GET', 'https://peaceful-forest-68892.herokuapp.com' + '/envelopes?from=0');

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
            rawXmlHttpRequest.open('GET', process.env.ENVELOPE_API_URL + '/sources');
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