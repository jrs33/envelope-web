import { getEnvelopesAsync } from '../envelopes/envelopes_service'

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
	
	const transactionsParent = document.getElementById('transactions');
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

	const transactionsParent = document.getElementById('transactions');
	var transactionsDiv = document.createElement('div');
	transactionsParent.appendChild(transactionsDiv);

	var transactionDateList = document.createElement('ul');
	var transactionAmountList = document.createElement('ul');
	var transactionNameList = document.createElement('ul');
	var transactionTypeList = document.createElement('ul');

	transactionsDiv.appendChild(transactionDateList);
	transactionsDiv.appendChild(transactionAmountList);
	transactionsDiv.appendChild(transactionNameList);
	transactionsDiv.appendChild(transactionTypeList);
	for(const transaction of transactionObject) {

		appendList(transaction.date, transactionDateList);
		appendList(transaction.amount, transactionAmountList);
		appendList(transaction.transactionName, transactionNameList);
		appendList(transaction.transactionType, transactionTypeList);
	}
}

function appendList(value, list) {
	let newListEntry = document.createElement('li');
	newListEntry.innerHTML = value;
	list.appendChild(newListEntry);
}

export { getTransactions, renderCreateTransactionForm };