import { getEnvelopesAsync } from './envelopes_service';

function renderCreateEnvelopeForm() {
	
	const envelopeParent = document.getElementById('main');
	var createEnvelopeDiv = document.createElement('div');
	envelopeParent.appendChild(createEnvelopeDiv);

	var createEnvelopeForm = document.createElement('form');
	createEnvelopeForm.id = "envelopeForm";
	createEnvelopeDiv.appendChild(createEnvelopeForm);

	// envelope name input
	var envelopeNameFormGroup = document.createElement('div');
	envelopeNameFormGroup.id = "envelopeNameFormGroup";
	envelopeNameFormGroup.className = "form-group";
	createEnvelopeForm.appendChild(envelopeNameFormGroup);

	var createEnvelopeName = document.createElement('input');
	createEnvelopeName.id = "envelopeNameInput";
	createEnvelopeName.name = "name";
	createEnvelopeName.className = "form-control";
	createEnvelopeName.placeholder = "ex: Groceries";

	var createEnvelopeNameLabel = document.createElement('label');
	createEnvelopeNameLabel.setAttribute("for", createEnvelopeName.id);
	createEnvelopeNameLabel.textContent = "Name";

	envelopeNameFormGroup.appendChild(createEnvelopeNameLabel);
	envelopeNameFormGroup.appendChild(createEnvelopeName);

	// envelope allocation input
	var envelopeAmountFormGroup = document.createElement('div');
	envelopeAmountFormGroup.id = "envelopeAmountFormGroup";
	envelopeAmountFormGroup.className = "form-group";
	createEnvelopeForm.appendChild(envelopeAmountFormGroup);

	var createEnvelopeAmount = document.createElement('input');
	createEnvelopeAmount.id = "envelopeAmountInput";
	createEnvelopeAmount.name = "allocation";
	createEnvelopeAmount.className = "form-control";
	createEnvelopeAmount.placeholder = "ex: 23.23";

	var createEnvelopeAmountLabel = document.createElement('label');
	createEnvelopeAmountLabel.setAttribute("for", createEnvelopeAmount.id);
	createEnvelopeAmountLabel.textContent = "Amount";

	envelopeAmountFormGroup.appendChild(createEnvelopeAmountLabel);
	envelopeAmountFormGroup.appendChild(createEnvelopeAmount);

	var createEnvelopeButton = document.createElement('button');
	createEnvelopeButton.textContent = "Create";
	createEnvelopeButton.className = "btn btn-primary";
	createEnvelopeForm.appendChild(createEnvelopeButton);

	createEnvelopeForm.addEventListener('submit', createEnvelope)
}

function createEnvelope(envelope) {
	envelope.preventDefault();

	console.log(envelope.target);
	const envelopeName = envelope.target["name"].value;
	const envelopeAmount = envelope.target["allocation"].value;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log("done! " + envelope);
		}
	};
	xhr.open('POST', 'http://localhost:8080/envelope/create');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		name: envelopeName,
		allocatedMoney: envelopeAmount,
		spentMoney: 0
	}));
}

function getEnvelopes() {
	getEnvelopesAsync(parseEnvelopes);
}

function parseEnvelopes(envelopeJson) {
	let envelopeObject = JSON.parse(envelopeJson);

	const envelopesParent = document.getElementById('main');
	var envelopesDiv = document.createElement('div');
	envelopesParent.appendChild(envelopesDiv);

	const tableHeader = createTableHeader();
	tableHeader.align = "center";
	const tableBody = createTableBody(envelopeObject);
	tableBody.align = "center";
	var table = document.createElement('table');
	table.className = "table";
	table.appendChild(tableHeader);
	table.appendChild(tableBody);
	envelopesDiv.appendChild(table);
}

function createTableHeader() {

	var tableHead = document.createElement('thead');
	var tableHeadRow = document.createElement('tr');
	tableHead.appendChild(tableHeadRow);

	var nameCol = document.createElement('th');
	var allocatedCol = document.createElement('th');
	var spentCol = document.createElement('th');
	var remainingCol = document.createElement('th');

	nameCol.scope = "col";
	nameCol.textContent = "Name";
	allocatedCol.scope = "col";
	allocatedCol.textContent = "Allocated";
	spentCol.scope = "col";
	spentCol.textContent = "Spent";
	remainingCol.scope = "col";
	remainingCol.textContent = "Remaining";
	
	tableHeadRow.appendChild(nameCol);
	tableHeadRow.appendChild(allocatedCol);
	tableHeadRow.appendChild(spentCol);
	tableHeadRow.appendChild(remainingCol);

	return tableHead;
}

function createTableBody(envelopeObject) {

	var tableBody = document.createElement('tbody');
	for(const envelope of envelopeObject) {

		var tableRow = document.createElement('tr');

		let remaining = envelope.allocatedMoney - envelope.spentMoney;
		var nameData = document.createElement('td');
		nameData.textContent = envelope.name;
		var allocatedData = document.createElement('td');
		allocatedData.textContent = envelope.allocatedMoney;
		var spentData = document.createElement('td');
		spentData.textContent = envelope.spentMoney;
		var remainingData = document.createElement('td');
		remainingData.textContent = remaining.toString();

		tableRow.appendChild(nameData);
		tableRow.appendChild(allocatedData);
		tableRow.appendChild(spentData);
		tableRow.appendChild(remainingData);
		tableBody.appendChild(tableRow);
	}

	return tableBody;
}

export { getEnvelopes, renderCreateEnvelopeForm };