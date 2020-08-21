import { ViewHandler } from "./view_handler";
import { SourceCategoryComposite } from "../data_container/source_category_composite";
import { TransactionFormViewHandler } from "./transaction_form_view_handler";

enum ActiveLinks {
    TRANSACTION = "TRANSACTION",
    CATEGORY = "CATEGORY",
    METHOD = "METHOD"
}

interface ActiveLinkState {
    readonly link: ActiveLinks;
    readonly sourceCategoryState: SourceCategoryComposite;
}

class FormTabsCompositeViewHandler implements ViewHandler<ActiveLinkState> {

    private static TRANSACTION_LINK_ID: string = "transaction-form-sublink";
    private static CATEGORY_LINK_ID: string = "category-form-sublink";
    private static METHOD_LINK_ID: string = "method-form-sublink";
    private static ACTIVE_CLASS: string = "nav-link active";
    private static INACTIVE_CLASS: string = "nav-link";

    private transactionFormViewHandler: TransactionFormViewHandler;

    constructor() {

        this.transactionFormViewHandler = new TransactionFormViewHandler();
    }

    handle(state: ActiveLinkState): boolean {

        let isLinkSet: boolean = this.executeLinkStrategy(state);
        let isContentDisplayed: boolean = this.executeDisplayStrategy(state);

        return isLinkSet && isContentDisplayed;
    }

    private executeLinkStrategy(state: ActiveLinkState): boolean {

        switch(state.link) {
            case ActiveLinks.TRANSACTION: {
                let transactionLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.TRANSACTION_LINK_ID);
                let methodLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.METHOD_LINK_ID);
                let categoryLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.CATEGORY_LINK_ID);

                transactionLinkElement.className = FormTabsCompositeViewHandler.ACTIVE_CLASS;
                methodLinkElement.className = FormTabsCompositeViewHandler.INACTIVE_CLASS;
                categoryLinkElement.className = FormTabsCompositeViewHandler.INACTIVE_CLASS;
                return true;
            }
            case ActiveLinks.CATEGORY: {
                let transactionLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.TRANSACTION_LINK_ID);
                let methodLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.METHOD_LINK_ID);
                let categoryLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.CATEGORY_LINK_ID);

                transactionLinkElement.className = FormTabsCompositeViewHandler.INACTIVE_CLASS;
                methodLinkElement.className = FormTabsCompositeViewHandler.INACTIVE_CLASS;
                categoryLinkElement.className = FormTabsCompositeViewHandler.ACTIVE_CLASS;
                return true;
            }
            case ActiveLinks.METHOD: {
                let transactionLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.TRANSACTION_LINK_ID);
                let methodLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.METHOD_LINK_ID);
                let categoryLinkElement: HTMLElement = document.getElementById(FormTabsCompositeViewHandler.CATEGORY_LINK_ID);

                transactionLinkElement.className = FormTabsCompositeViewHandler.INACTIVE_CLASS;
                methodLinkElement.className = FormTabsCompositeViewHandler.ACTIVE_CLASS;
                categoryLinkElement.className = FormTabsCompositeViewHandler.INACTIVE_CLASS;
                return true;
            }
            default: {
                throw new Error("Display Not Implemented: " + state.link);
            }
        }
    }

    private executeDisplayStrategy(state: ActiveLinkState): boolean {

        switch(state.link) {
            case ActiveLinks.TRANSACTION: {
                return this.transactionFormViewHandler.handle(state.sourceCategoryState);
            }
            case ActiveLinks.CATEGORY: {

            }
            case ActiveLinks.METHOD: {

            }
            default: {
                throw new Error("Display Not Implemented: " + state.link);
            }
        }
    }
}

export { FormTabsCompositeViewHandler, ActiveLinks, ActiveLinkState };