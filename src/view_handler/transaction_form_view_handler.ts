import { ViewHandler } from './view_handler';
import { SourceCategoryComposite, Category, Source } from '../data_container/source_category_composite'
import { Dashboard } from '../composites/dashboard';
import { AuthorizationDecorator } from '../auth/auth_decorator';
import { ViewActions } from './view_actions';

const CONFIG = require('../../config.local.json');

class TransactionFormViewHandler implements ViewHandler<SourceCategoryComposite> {

    constructor() {}

    handle(state: SourceCategoryComposite): boolean {

        let formTabContent: HTMLElement = this.getDOMElement();
        let header: HTMLHeadingElement = document.createElement('h4');
        header.textContent = "Create Transaction";
        formTabContent.appendChild(header);
        formTabContent.appendChild(this.renderCreateTransactionForm(state));

        return true;
    }

    private getDOMElement(): HTMLElement {
        let tableBody: HTMLElement = document.getElementById('my-tab-content');
        tableBody.innerHTML = ""; // clear current state
        return tableBody;
    }

    private renderCreateTransactionForm(state: SourceCategoryComposite) : HTMLFormElement {
		
		var createTransactionForm = document.createElement('form');
		createTransactionForm.id = "transactionForm";

		// transaction date input
		var transactionDateFormGroup = document.createElement('div');
		transactionDateFormGroup.id = "transactionDateFormGroup";
		transactionDateFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionDateFormGroup);

		var createTransactionYear = document.createElement('input');
		createTransactionYear.id = "transactionYearInput";
		createTransactionYear.name = "year";
		createTransactionYear.className = "form-control";
		var createTransactionMonth = document.createElement('input');
		createTransactionMonth.id = "transactionMonthInput";
		createTransactionMonth.name = "month";
		createTransactionMonth.className = "form-control";
		var createTransactionDay = document.createElement('input');
		createTransactionDay.id = "transactionDayInput";
		createTransactionDay.name = "day";
		createTransactionDay.className = "form-control";

		var createTransactionYearLabel = document.createElement('label');
		createTransactionYearLabel.setAttribute("for", createTransactionYear.id);
		createTransactionYearLabel.textContent = "Year";
		var createTransactionMonthLabel = document.createElement('label');
		createTransactionMonthLabel.setAttribute("for", createTransactionMonth.id);
		createTransactionMonthLabel.textContent = "Month";
		var createTransactionDayLabel = document.createElement('label');
		createTransactionDayLabel.setAttribute("for", createTransactionDay.id);
		createTransactionDayLabel.textContent = "Day";

		transactionDateFormGroup.appendChild(createTransactionYearLabel);
		transactionDateFormGroup.appendChild(createTransactionYear);
		transactionDateFormGroup.appendChild(createTransactionMonthLabel);
		transactionDateFormGroup.appendChild(createTransactionMonth);
		transactionDateFormGroup.appendChild(createTransactionDayLabel);
		transactionDateFormGroup.appendChild(createTransactionDay);

		// transaction name input
		var transactionNameFormGroup = document.createElement('div');
		transactionNameFormGroup.id = "transactionNameFormGroup";
		transactionNameFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionNameFormGroup);

		var createTransactionName = document.createElement('input');
		createTransactionName.id = "transactionNameInput";
		createTransactionName.name = "name";
		createTransactionName.className = "form-control";

		var createTransactionNameLabel = document.createElement('label');
		createTransactionNameLabel.setAttribute("for", createTransactionName.id);
		createTransactionNameLabel.textContent = "Name";

		transactionNameFormGroup.appendChild(createTransactionNameLabel);
		transactionNameFormGroup.appendChild(createTransactionName);

		// transaction amount input
		var transactionAmountFormGroup = document.createElement('div');
		transactionAmountFormGroup.id = "transactionAmountFormGroup";
		transactionAmountFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionAmountFormGroup);

		var createTransactionAmount = document.createElement('input');
		createTransactionAmount.id = "transactionAmountInput";
		createTransactionAmount.name = "amount";
		createTransactionAmount.className = "form-control";

		var createTransactionAmountLabel = document.createElement('label');
		createTransactionAmountLabel.setAttribute("for", createTransactionAmount.id);
		createTransactionAmountLabel.textContent = "Amount";

		transactionAmountFormGroup.appendChild(createTransactionAmountLabel);
		transactionAmountFormGroup.appendChild(createTransactionAmount);

		// transaction description input
		var transactionDescriptionFormGroup = document.createElement('div');
		transactionDescriptionFormGroup.id = "transactionDescriptionFormGroup";
		transactionDescriptionFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionDescriptionFormGroup);

		var createTransactionDescription = document.createElement('input');
		createTransactionDescription.id = "transactionDescriptionInput";
		createTransactionDescription.name = "description";
		createTransactionDescription.className = "form-control";

		var createTransactionDescriptionLabel = document.createElement('label');
		createTransactionDescriptionLabel.setAttribute("for", createTransactionDescription.id);
		createTransactionDescriptionLabel.textContent = "Description";

		transactionAmountFormGroup.appendChild(createTransactionDescriptionLabel);
		transactionAmountFormGroup.appendChild(createTransactionDescription);

		// transaction envelope select
		var transactionEnvelopeFormGroup = document.createElement('div');
		transactionEnvelopeFormGroup.id = "transactionEnvelopeFormGroup";
		transactionEnvelopeFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionEnvelopeFormGroup);

		var selectEnvelopeElement = document.createElement('select');
		selectEnvelopeElement.id = "transactionFormEnvelopeSelect";
		selectEnvelopeElement.name = "id";
		selectEnvelopeElement.className = "form-control";
		this.renderCreateTransactionEnvelopes(selectEnvelopeElement, state.categoryState.categories);

		var createTransactionEnvelopeLabel = document.createElement('label');
		createTransactionEnvelopeLabel.setAttribute("for", selectEnvelopeElement.id);
		createTransactionEnvelopeLabel.textContent = "Category";

		transactionEnvelopeFormGroup.appendChild(createTransactionEnvelopeLabel);
		transactionEnvelopeFormGroup.appendChild(selectEnvelopeElement);

		// transaction source select
		var transactionSourceFormGroup = document.createElement('div');
		transactionSourceFormGroup.id = "transactionSourceFormGroup";
		transactionSourceFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionSourceFormGroup);

		var selectSourceElement = document.createElement('select');
		selectSourceElement.id = "transactionFormSourceSelect";
		selectSourceElement.name = "id";
		selectSourceElement.className = "form-control";
		this.renderCreateTransactionSources(selectSourceElement, state.sourceState.sources);

		var createTransactionSourceLabel = document.createElement('label');
		createTransactionSourceLabel.setAttribute("for", selectSourceElement.id);
		createTransactionSourceLabel.textContent = "Method";

		transactionSourceFormGroup.appendChild(createTransactionSourceLabel);
		transactionSourceFormGroup.appendChild(selectSourceElement);

		// transaction type select
		var transactionTypeFormGroup = document.createElement('div');
		transactionTypeFormGroup.id = "transactionTypeFormGroup";
		transactionTypeFormGroup.className = "form-group";
		createTransactionForm.appendChild(transactionTypeFormGroup);

		var selectTransactionTypeElement = document.createElement('select');
		selectTransactionTypeElement.id = "transactionFormTypeSelect";
		selectTransactionTypeElement.name = "transactionType";
		selectTransactionTypeElement.className = "form-control";

		var createTransactionTypeLabel = document.createElement('label');
		createTransactionTypeLabel.setAttribute("for", selectTransactionTypeElement.id);
		createTransactionTypeLabel.textContent = "Type";

		transactionTypeFormGroup.appendChild(createTransactionTypeLabel);
		transactionTypeFormGroup.appendChild(selectTransactionTypeElement);
		const transactionTypes = this.getTransactionTypes();
		for (const type of transactionTypes) {

			var option = document.createElement('option');
			option.textContent = type;
			option.value = type;
			selectTransactionTypeElement.appendChild(option);
		}

		var createTransactionButton = document.createElement('button');
		createTransactionButton.textContent = "Create";
		createTransactionButton.className = "btn btn-primary";
        createTransactionForm.appendChild(createTransactionButton);
        
        createTransactionForm.addEventListener('submit', event => {
            this.createTransaction(event, () => {
                //TODO: send a confirmation alert here
                createTransactionForm.reset();

                //TODO: decouple view handlers from composite views
                Dashboard.getInstance().dispatch(ViewActions.TRANSACTION_CREATED);
            });
        });

		return createTransactionForm;
    }
    
    private renderCreateTransactionEnvelopes(selectEnvelopeElement: HTMLSelectElement, envelopes: Array<Category>) {

		for(const envelope of envelopes) {

			var option = document.createElement('option');
			option.textContent = envelope.name;
			option.value = "" + envelope.id;
			selectEnvelopeElement.appendChild(option);
		}
	}

	private renderCreateTransactionSources(selectEnvelopeElement: HTMLSelectElement, sources: Array<Source>) {

		for(const source of sources) {

			var option = document.createElement('option');
			option.textContent = source.name;
			option.value = "" + source.id;
			selectEnvelopeElement.appendChild(option);
		}
    }
    
    private getTransactionTypes() {
		return ["CREDIT", "DEBIT"];
    }
    
    private createTransaction(transaction, callback) {
		transaction.preventDefault();

		console.log(transaction.target);
		let transactionName = transaction.target["name"].value;
		let transactionAmount = transaction.target["amount"].value;
		let transactionEnvelopeId = parseInt(transaction.target["transactionFormEnvelopeSelect"].value, 10);
		let transactionType = transaction.target["transactionType"].value;
		let transactionSourceId = parseInt(transaction.target["transactionFormSourceSelect"].value, 10);
		let transactionYear = transaction.target["year"].value;
		let transactionMonth = transaction.target["month"].value;
		let transactionDay = transaction.target["day"].value;
		let transactionDescription = transaction.target["description"].value;

		var rawXmlHttpRequest = new XMLHttpRequest();
		rawXmlHttpRequest.open('POST', CONFIG.envelope_api.host + '/transaction/create/v2');
        var xhr = new AuthorizationDecorator(rawXmlHttpRequest).decorate();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				callback();
			}
		};
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify({
			transactionName: transactionName,
			amount: transactionAmount,
			envelopeId: transactionEnvelopeId,
			transactionType: transactionType,
			sourceId: transactionSourceId,
			year: transactionYear,
			month: transactionMonth,
			day: transactionDay,
			description: transactionDescription
		}));
	}
}

export { TransactionFormViewHandler };