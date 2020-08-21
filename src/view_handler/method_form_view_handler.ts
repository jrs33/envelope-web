import { ViewHandler } from "./view_handler";
import { AuthorizationDecorator } from "../auth/auth_decorator";

const CONFIG = require('../../config.local.json');

class MethodFormViewHandler implements ViewHandler<void> {

    constructor() {}

    handle(state: void): boolean {

        let formTabContent: HTMLElement = this.getDOMElement();
        let header: HTMLHeadingElement = document.createElement('h4');
        header.textContent = "Create Payment Method";
        formTabContent.appendChild(header);
        formTabContent.appendChild(this.renderMethodCreationForm());

        return true;
    }

    private getDOMElement(): HTMLElement {
        let tableBody: HTMLElement = document.getElementById('my-tab-content');
        tableBody.innerHTML = ""; // clear current state
        return tableBody;
    }

    private renderMethodCreationForm() : HTMLFormElement {
		
        var createSourceForm = document.createElement('form');
        createSourceForm.id = "sourceForm";

        // source name input
        var sourceNameFormGroup = document.createElement('div');
        sourceNameFormGroup.id = "sourceNameFormGroup";
        sourceNameFormGroup.className = "form-group";
        createSourceForm.appendChild(sourceNameFormGroup);

        var createSourceName = document.createElement('input');
        createSourceName.id = "sourceNameInput";
        createSourceName.name = "name";
        createSourceName.className = "form-control";

        var createSourceNameLabel = document.createElement('label');
        createSourceNameLabel.setAttribute("for", createSourceName.id);
        createSourceNameLabel.textContent = "Name";

        sourceNameFormGroup.appendChild(createSourceNameLabel);
        sourceNameFormGroup.appendChild(createSourceName);

        // source description input
        var sourceNameFormGroup = document.createElement('div');
        sourceNameFormGroup.id = "sourceNameFormGroup";
        sourceNameFormGroup.className = "form-group";
        createSourceForm.appendChild(sourceNameFormGroup);

        var createSourceDescription = document.createElement('input');
        createSourceDescription.id = "sourceDescriptionInput";
        createSourceDescription.name = "description";
        createSourceDescription.className = "form-control";

        var createSourceDescriptionLabel = document.createElement('label');
        createSourceDescriptionLabel.setAttribute("for", createSourceDescription.id);
        createSourceDescriptionLabel.textContent = "Description";

        sourceNameFormGroup.appendChild(createSourceDescriptionLabel);
        sourceNameFormGroup.appendChild(createSourceDescription);

        var createSourceButton = document.createElement('button');
        createSourceButton.textContent = "Create";
        createSourceButton.className = "btn btn-primary";
        createSourceForm.appendChild(createSourceButton);

        createSourceForm.addEventListener('submit', event => {
            this.createSource(event, () => {
                // TODO: confirmation
            });
            createSourceForm.reset();
        });

        return createSourceForm;
    }

    private createSource(source, callback) {
        source.preventDefault();

        let description = source.target["description"].value;
        let name = source.target["name"].value;
        
        var rawRequest = new XMLHttpRequest();
        rawRequest.open('POST', CONFIG.envelope_api.host + '/source/create');
        var xhr = new AuthorizationDecorator(rawRequest).decorate();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                callback();
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            id: -1,
            name: name,
            description: description,
            userId: -22
        }));
    };
}

export { MethodFormViewHandler };