export class Router {

    eventSource : HTMLDivElement;
    routeChangeEvent: CustomEvent<unknown>;
    currentRoute : String;

    constructor() {

        this.eventSource = document.createElement('div');
        this.routeChangeEvent = new CustomEvent("routechange", {
            bubbles: true,
            cancelable: false
        });
        this.currentRoute = null;

        window.addEventListener("popstate", () => {
            if(this.currentRoute === this.getRoute()) {
                return;
            }
            this.currentRoute = this.getRoute();
            console.log('dispatching_route_change_event');
            this.eventSource.dispatchEvent(this.routeChangeEvent);
        })
    }

    getRoute() {
        let route = window.location.hash.substr(1).replace(/\//ig, "/");
        return route;
    }
}