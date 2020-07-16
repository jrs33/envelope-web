import { EnvelopeCreator } from './envelope_create';
import { EnvelopeFetcher } from './envelope_get';

class Envelopes {

    _envelopeCreator : EnvelopeCreator;
    _envelopeFetcher : EnvelopeFetcher;

    constructor() {

        this._envelopeCreator = new EnvelopeCreator();
        this._envelopeFetcher = new EnvelopeFetcher();
    }

    getEnvelopeForm() : HTMLDivElement {

        let envelopeCol = document.createElement('div');

        let formHeader = document.createElement('h2');
        formHeader.textContent = 'Category';
        let createEnvelopeForm = this._envelopeCreator.renderCreateEnvelopeForm();
        createEnvelopeForm.id = 'createEnvelopeForm';
        envelopeCol.appendChild(formHeader);
        envelopeCol.appendChild(createEnvelopeForm);

        createEnvelopeForm.addEventListener('submit', event => {
            this._envelopeCreator.createEnvelope(event, () => {
                //TODO add confirmation notif
            });
        });

        return envelopeCol;
    }
}

export { Envelopes };