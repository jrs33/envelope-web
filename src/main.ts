import { initializeNavigation } from './navigation/navigation_main';

initializePage();

function initializePage() {
    var navDiv = document.getElementById("navigation");
    navDiv.appendChild(initializeNavigation());
}