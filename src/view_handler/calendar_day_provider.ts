import Transaction from "../data_container/transaction";
import { AuthorizationDecorator } from "../auth/auth_decorator";
import { CategoryDataContainer, Category, CategoryState } from "../data_container/category_data_container";
import { SourceDataContainer, Source, SourceState } from "../data_container/source_data_container";
import { CalendarDetailsDataContainer } from "../data_container/calendar_details_data_container";
import { CentralMediator, Actions } from "../mediator/mediator";
import { CalendarDetailsDescriptionDataContainer } from "../data_container/calendar_details_description_container";

const CONFIG = require('../../config.local.json');

class CalendarDayProvider {

    private categoryDataContainer: CategoryDataContainer;
    private sourceDataContainer: SourceDataContainer;
    private calendarDetailsDataContainer: CalendarDetailsDataContainer;
    private calendarDetailsDescriptionDataContainer: CalendarDetailsDescriptionDataContainer;

    constructor() {

        this.categoryDataContainer = CategoryDataContainer.getInstance();
        this.sourceDataContainer = SourceDataContainer.getInstance();
        this.calendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();
        this.calendarDetailsDescriptionDataContainer = CalendarDetailsDescriptionDataContainer.getInstance();
    }

    for(date: Date, money: number): HTMLDivElement {

        let dayDiv: HTMLDivElement = document.createElement('div');
        dayDiv.className = "date-grid-item";

        let dayNumSpan: HTMLSpanElement = document.createElement('span');
        let timeElement: HTMLTimeElement = document.createElement('time');
        timeElement.dateTime = this.formatDate(date);
        timeElement.textContent = "" + date.getDate();
        dayNumSpan.appendChild(timeElement);

        let moneyHeader: HTMLHeadingElement = document.createElement('h4');
        moneyHeader.style.textAlign = "center";
        moneyHeader.style.padding = "20px";
        moneyHeader.textContent = "$" + money.toFixed(2);

        dayDiv.appendChild(dayNumSpan);
        dayDiv.appendChild(moneyHeader);
        dayDiv.addEventListener("click", event => {
            this.calendarDetailsDescriptionDataContainer.setState({describe: "August 8th"});
            this.getTransactionsPromise(date.getFullYear(), date.getMonth()+1, date.getDate())
                .then(transactionArr => this.calendarDetailsDataContainer.setState({transactions: transactionArr}))
                .then(() => CentralMediator.getInstance().dispatch(Actions.DAY_CLICKED))
                .catch(err => console.log("error_day_click_transaction_fetch: " + err));
        });
    
        return dayDiv;
    }

    private getTransactionsPromise(year: number, month: number, date: number): Promise<Array<Transaction>> {
        
        let categoryState: CategoryState = this.categoryDataContainer.getState();
        let sourceState: SourceState = this.sourceDataContainer.getState();

        return new Promise(function (resolve, reject) {
            var rawXmlHttpRequest = new XMLHttpRequest();
            rawXmlHttpRequest.open('GET', CONFIG.envelope_api.host + '/transactions?from=3'); // TODO: day query
            
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

    private formatDate(date: Date): string {

        let year: string = "" + date.getFullYear();
        let month: string = "" + date.getMonth();
        if (month.length < 2) {
            month = "0" + month;
        }

        let day: string = "" + date.getDate();
        if (day.length < 2) {
            day = "0" + day;
        }

        return [year, month, day].join("-");
    }
}

export { CalendarDayProvider };