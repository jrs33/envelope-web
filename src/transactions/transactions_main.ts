import { getEnvelopesAsync } from '../envelopes/envelopes_service';
import { createTableHeader, createTableBody } from '../util/table_util';

function getTransactions() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			parseTransactions(xhr.responseText);
		}
	};
	xhr.open('GET', 'http://localhost:8080/transactions?from=0');
	xhr.send();
}

function renderCreateTransactionForm() {
	
	const transactionsParent = document.getElementById('main');
	var createTransactionDiv = document.createElement('div');
	transactionsParent.appendChild(createTransactionDiv);

	var createTransactionForm = document.createElement('form');
	createTransactionForm.id = "transactionForm";
	createTransactionDiv.appendChild(createTransactionForm);

	var createTransactionName = document.createElement('input');
	createTransactionName.name = "name";
	createTransactionForm.appendChild(createTransactionName);

	var createTransactionName = document.createElement('input');
	createTransactionName.name = "amount";
	createTransactionForm.appendChild(createTransactionName);

	var selectElement = document.createElement('select');
	selectElement.id = "transactionFormEnvelopeSelect";
	selectElement.name = "transactionFormEnvelopeSelect";
	createTransactionForm.appendChild(selectElement);
	getEnvelopesAsync(renderCreateTransactionEnvelopes);

	var createTransactionButton = document.createElement('button');
	createTransactionButton.textContent = "Submit"
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

function createTransaction(transaction) {
	transaction.preventDefault();

	console.log(transaction.target);
	const transactionName = transaction.target["name"].value;
	const transactionAmount = transaction.target["amount"].value;
	const transactionEnvelopeId = parseInt(transaction.target["transactionFormEnvelopeSelect"].value, 10);

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log("done! " + transaction);
		}
	};
	xhr.open('POST', 'http://localhost:8080/transaction/create');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		transactionName: transactionName,
		amount: transactionAmount,
		envelopeId: transactionEnvelopeId,
		date: '2020-03-20',
		transactionType: 'DEBIT'
	}));
}

function parseTransactions(transactionJson) {
	let transactionObject = JSON.parse(transactionJson);
	console.log(transactionObject);

	const transactionsParent = document.getElementById('main');
	var transactionsDiv = document.createElement('div');
	transactionsParent.appendChild(transactionsDiv);

	const transactionTableHeader = createTableHeader(["Date", "Name", "Type", "Amount"]);
	
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
	table.appendChild(createTableBody(transactionRows));
	transactionsDiv.appendChild(table);
}

export { getTransactions, renderCreateTransactionForm };