import { getEnvelopesAsync } from './envelopes_service';

function getEnvelopes() {
	getEnvelopesAsync(parseEnvelopes);
}

function parseEnvelopes(envelopeJson) {
	let envelopeObject = JSON.parse(envelopeJson);

	const envelopesParent = document.getElementById('main');
	var envelopesDiv = document.createElement('div');
	envelopesParent.appendChild(envelopesDiv);

	const tableHeader = createTableHeader();
	const tableBody = createTableBody(envelopeObject);
	var table = document.createElement('table');
	table.className = "table table-dark";
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

export { getEnvelopes };