import { ViewHandler } from './view_handler';
import { SourceCategoryComposite, Category, Source } from '../data_container/source_category_composite'

class TransactionFormViewHandler implements ViewHandler<SourceCategoryComposite> {

    constructor() {}

    handle(state: SourceCategoryComposite): boolean {

        console.log(document.body)

        let formTabContent: HTMLElement = this.getDOMElement();
        let header: HTMLHeadingElement = document.createElement('h1');
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

		var createTransactionDate = document.createElement('input');
		createTransactionDate.id = "transactionDateInput";
		createTransactionDate.name = "date";
		createTransactionDate.className = "form-control";

		var createTransactionDateLabel = document.createElement('label');
		createTransactionDateLabel.setAttribute("for", createTransactionDate.id);
		createTransactionDateLabel.textContent = "Date (YYYY-MM-DD)";

		transactionDateFormGroup.appendChild(createTransactionDateLabel);
		transactionDateFormGroup.appendChild(createTransactionDate);

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
		createTransactionEnvelopeLabel.textContent = "Envelope";

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
		createTransactionSourceLabel.textContent = "Source";

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
}

export { TransactionFormViewHandler };