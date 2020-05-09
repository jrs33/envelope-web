import { EnvelopeCreator } from './envelope_create';
import { EnvelopeFetcher } from './envelope_get';
import { Router } from '../routing/router';

class Envelopes {

    static readonly ROUTE_TO_ACTION = 'envelopes';

    _envelopeCreator : EnvelopeCreator;
    _envelopeFetcher : EnvelopeFetcher;

    router: Router;
    route: String;

    constructor() {

        this._envelopeCreator = new EnvelopeCreator();
        this._envelopeFetcher = new EnvelopeFetcher();
        
        this.router = new Router();
        this.route = this.router.getRoute();

        this.router.eventSource.addEventListener("routechange", () => {
            this.route = this.router.getRoute();
            console.log('envelopes!' + this.router.getRoute());
            if(this.route === Envelopes.ROUTE_TO_ACTION) {
                this.connect();
            }
        })
    }

    async connect() {

        const contentDiv = document.getElementById('main');
        contentDiv.innerHTML = '';

        let createEnvelopeForm = this._envelopeCreator.renderCreateEnvelopeForm();
        createEnvelopeForm.id = 'createEnvelopeForm';
        contentDiv.appendChild(createEnvelopeForm);

        this._envelopeFetcher.getEnvelopesAsync(
            envelopeJson => {
                let table = this._envelopeFetcher.parseEnvelopes(envelopeJson);
                table.id = 'envelopeTable';
                contentDiv.appendChild(table);
            }
        );

        createEnvelopeForm.addEventListener('submit', event => {
            this._envelopeCreator.createEnvelope(event, () => {

                document.getElementById('envelopeTable').remove();
                this._envelopeFetcher.getEnvelopesAsync(
                    envelopeJson => {
                        const table = this._envelopeFetcher.parseEnvelopes(envelopeJson);
                        table.id = 'envelopeTable';
                        contentDiv.appendChild(table);
                    }
                );
            });
        });
    }
}

export { Envelopes };