import { getEnvelopesAsync } from './envelopes_service';

function getEnvelopes() {
	getEnvelopesAsync(parseEnvelopes);
}

function parseEnvelopes(envelopeJson) {
	let envelopeObject = JSON.parse(envelopeJson);

	const envelopesParent = document.getElementById('envelopes');
	var envelopesDiv = document.createElement('div');
	envelopesParent.appendChild(envelopesDiv);

	var envelopeNameList = document.createElement('ul');
	var envelopeAllocatedList = document.createElement('ul');
	var envelopeSpentList = document.createElement('ul');
	var envelopeRemainingList = document.createElement('ul');

	envelopesDiv.appendChild(envelopeNameList);
	envelopesDiv.appendChild(envelopeAllocatedList);
	envelopesDiv.appendChild(envelopeSpentList);
	envelopesDiv.appendChild(envelopeRemainingList);
	for(const envelope of envelopeObject) {

		let remaining = envelope.allocatedMoney - envelope.spentMoney;

		appendList(envelope.name, envelopeNameList);
		appendList(envelope.allocatedMoney, envelopeAllocatedList);
		appendList(envelope.spentMoney, envelopeSpentList);
		appendList(remaining, envelopeRemainingList);
	}
}

function appendList(value, list) {
	let newListEntry = document.createElement('li');
	newListEntry.innerHTML = value;
	list.appendChild(newListEntry);
}

export { getEnvelopes };