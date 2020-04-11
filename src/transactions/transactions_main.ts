import { getEnvelopesAsync } from '../envelopes/envelopes_service';
import { createTableHeader, createTableBody } from '../util/table_util';

const CONFIG = require('../../config.local.json');

function getTransactions() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			parseTransactions(xhr.responseText);
		}
	};
	console.log(CONFIG);
	xhr.open('GET', CONFIG.envelope_api.host + '/transactions?from=0');
	xhr.send();
}

function renderCreateTransactionForm() {
	
	const transactionsParent = document.getElementById('main');
	var createTransactionDiv = document.createElement('div');
	transactionsParent.appendChild(createTransactionDiv);

	var createTransactionForm = document.createElement('form');
	createTransactionForm.id = "transactionForm";
	createTransactionDiv.appendChild(createTransactionForm);

	// transaction name input
	var transactionNameFormGroup = document.createElement('div');
	transactionNameFormGroup.id = "transactionNameFormGroup";
	transactionNameFormGroup.className = "form-group";
	createTransactionForm.appendChild(transactionNameFormGroup);

	var createTransactionName = document.createElement('input');
	createTransactionName.id = "transactionNameInput";
	createTransactionName.name = "name";
	createTransactionName.className = "form-control";
	createTransactionName.placeholder = "ex: Groceries";

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
	createTransactionAmount.placeholder = "ex: 23.23";

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
	getEnvelopesAsync(renderCreateTransactionEnvelopes);

	var createTransactionEnvelopeLabel = document.createElement('label');
	createTransactionEnvelopeLabel.setAttribute("for", selectEnvelopeElement.id);
	createTransactionEnvelopeLabel.textContent = "Envelope";

	transactionEnvelopeFormGroup.appendChild(createTransactionEnvelopeLabel);
	transactionEnvelopeFormGroup.appendChild(selectEnvelopeElement);

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
	getTransactionTypes();

	var createTransactionButton = document.createElement('button');
	createTransactionButton.textContent = "Create";
	createTransactionButton.className = "btn btn-primary";
	createTransactionForm.appendChild(createTransactionButton);

	createTransactionForm.addEventListener('submit', createTransaction)
}

function renderCreateTransactionEnvelopes(responseText) {
	let response = JSON.parse(responseText);

	var selectElement = document.getElementById('transactionFormEnvelopeSelect');
	for(const envelope of response) {

		var option = document.createElement('option');
		option.textContent = envelope.name;
		option.value = envelope.id;
		selectElement.appendChild(option);
	}
}

function getTransactionTypes() {
	const transactionTypes = ["CREDIT", "DEBIT"];

	var selectElement = document.getElementById('transactionFormTypeSelect');
	for (const type of transactionTypes) {

		var option = document.createElement('option');
		option.textContent = type;
		option.value = type;
		selectElement.appendChild(option);
	}
}

function createTransaction(transaction) {
	transaction.preventDefault();

	console.log(transaction.target);
	const transactionName = transaction.target["name"].value;
	const transactionAmount = transaction.target["amount"].value;
	const transactionEnvelopeId = parseInt(transaction.target["transactionFormEnvelopeSelect"].value, 10);
	const transactionType = transaction.target["transactionType"].value;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log("done! " + transaction);
		}
	};
	xhr.open('POST', CONFIG.envelope_api.host + '/transaction/create');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		transactionName: transactionName,
		amount: transactionAmount,
		envelopeId: transactionEnvelopeId,
		transactionType: transactionType
	}));
}

function parseTransactions(transactionJson) {
	let transactionObject = JSON.parse(transactionJson);
	console.log(transactionObject)

	const transactionsParent = document.getElementById('main');
	var transactionsDiv = document.createElement('div');
	transactionsParent.appendChild(transactionsDiv);

	const transactionTableHeader = createTableHeader(["Date", "Name", "Type", "Amount"]);
	transactionTableHeader.align = "center";
	
	var transactionRows = [];
	for(const transaction of transactionObject) {

		let transactionRow = [];
		transactionRow.push(transaction.date);
		transactionRow.push(transaction.transactionName);
		transactionRow.push(transaction.transactionType);
		transactionRow.push(transaction.amount);
		transactionRows.push(transactionRow);
	}

	var table = document.createElement('table');
	table.className = "table";
	table.appendChild(transactionTableHeader);

	const transactionTableBody = createTableBody(transactionRows);
	transactionTableBody.align = "center";
	table.appendChild(transactionTableBody);
	transactionsDiv.appendChild(table);
}

export { getTransactions, renderCreateTransactionForm };