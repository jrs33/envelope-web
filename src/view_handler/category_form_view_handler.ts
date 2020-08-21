import { ViewHandler } from "./view_handler";
import { AuthorizationDecorator } from "../auth/auth_decorator";

const CONFIG = require('../../config.local.json');

class CategoryFormViewHandler implements ViewHandler<void> {

    constructor() {}

    handle(state: void): boolean {

        let formTabContent: HTMLElement = this.getDOMElement();
        let header: HTMLHeadingElement = document.createElement('h4');
        header.textContent = "Create Payment Category";
        formTabContent.appendChild(header);
        formTabContent.appendChild(this.renderCategoryCreationForm());

        return true;
    }

    private getDOMElement(): HTMLElement {
        let tableBody: HTMLElement = document.getElementById('my-tab-content');
        tableBody.innerHTML = ""; // clear current state
        return tableBody;
    }

    private renderCategoryCreationForm() : HTMLFormElement {
    
        var createEnvelopeForm = document.createElement('form');
        createEnvelopeForm.id = "envelopeForm";
    
        // envelope name input
        var envelopeNameFormGroup = document.createElement('div');
        envelopeNameFormGroup.id = "envelopeNameFormGroup";
        envelopeNameFormGroup.className = "form-group";
        createEnvelopeForm.appendChild(envelopeNameFormGroup);
    
        var createEnvelopeName = document.createElement('input');
        createEnvelopeName.id = "envelopeNameInput";
        createEnvelopeName.name = "name";
        createEnvelopeName.className = "form-control";
    
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
    
        var createEnvelopeAmountLabel = document.createElement('label');
        createEnvelopeAmountLabel.setAttribute("for", createEnvelopeAmount.id);
        createEnvelopeAmountLabel.textContent = "Amount";
    
        envelopeAmountFormGroup.appendChild(createEnvelopeAmountLabel);
        envelopeAmountFormGroup.appendChild(createEnvelopeAmount);
    
        // envelope type input
        var envelopeTypeFormGroup = document.createElement('div');
        envelopeTypeFormGroup.id = "envelopeTypeFormGroup";
        envelopeTypeFormGroup.className = "form-group";
        createEnvelopeForm.appendChild(envelopeTypeFormGroup);
    
        var selectEnvelopeTypeElement = document.createElement('select');
        selectEnvelopeTypeElement.id = "envelopeFormTypeSelect";
        selectEnvelopeTypeElement.name = "envelopeType";
        selectEnvelopeTypeElement.className = "form-control";
    
        var createEnvelopeTypeLabel = document.createElement('label');
        createEnvelopeTypeLabel.setAttribute("for", selectEnvelopeTypeElement.id);
        createEnvelopeTypeLabel.textContent = "Type";
    
        envelopeTypeFormGroup.appendChild(createEnvelopeTypeLabel);
        envelopeTypeFormGroup.appendChild(selectEnvelopeTypeElement);
        let transactionTypes = this.getEnvelopeTypes();
        for (const type of transactionTypes) {
    
            var option = document.createElement('option');
            option.textContent = type;
            option.value = type;
            selectEnvelopeTypeElement.appendChild(option);
        }
    
        envelopeAmountFormGroup.appendChild(createEnvelopeTypeLabel);
        envelopeAmountFormGroup.appendChild(selectEnvelopeTypeElement);
    
        var createEnvelopeButton = document.createElement('button');
        createEnvelopeButton.textContent = "Create";
        createEnvelopeButton.className = "btn btn-primary";
        createEnvelopeForm.appendChild(createEnvelopeButton);

        createEnvelopeForm.addEventListener('submit', event => {
            this.createEnvelope(event, () => {
                // TODO: confirmation
            });
            createEnvelopeForm.reset();
        });
    
        return createEnvelopeForm;
    }
    
    private createEnvelope(envelope, callback) {
        envelope.preventDefault();
    
        console.log(envelope.target);
        let envelopeName = envelope.target["name"].value;
        let envelopeAmount = envelope.target["allocation"].value;
        let envelopeType = envelope.target["envelopeFormTypeSelect"].value;
    
        var rawXMLRequest = new XMLHttpRequest();
        rawXMLRequest.open('POST', CONFIG.envelope_api.host + '/envelope/create');
        var xhr = new AuthorizationDecorator(rawXMLRequest).decorate();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback();
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: envelopeName,
            envelopeType: envelopeType,
            allocatedMoney: envelopeAmount,
            spentMoney: 0
        }));
    }
    
    getEnvelopeTypes() {
        let transactionTypes = ["SAVING", "EXPENSE"];
        return transactionTypes;
    }
}

export { CategoryFormViewHandler };