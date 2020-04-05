/*
<ul class="nav nav-tabs" id="navigation" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#envelopes" role="tab" aria-controls="home" aria-selected="true">Envelopes</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#transactions" role="tab" aria-controls="profile" aria-selected="false">Transactions</a>
        <a class="nav-link" id="transaction-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="false" href="#transactions">Transactions</a>
    </li>
</ul>
*/

function initializeNavigation() {

    var navList = document.createElement('ul');
    navList.className = "nav nav-tabs";
    navList.id = "navigation";
    navList.setAttribute("role", "tablist");
    
    var envelopeNavItem = createNavItem("envelope-tab", "#envelopes", "Envelopes");
    var transactionNavItem = createNavItem("transaction-tab", "#transactions", "Transactions");

    envelopeNavItem.firstElementChild.className = "nav-link active";
    envelopeNavItem.firstElementChild.setAttribute("aria-selected", "true");
    envelopeNavItem.firstElementChild.setAttribute("aria-controls", "home");

    navList.appendChild(envelopeNavItem);
    navList.appendChild(transactionNavItem);

    return navList;
}

function createNavItem(id, href, description) {
    var navItem = document.createElement('li');
    navItem.className = "nav-item";

    var linkItem = document.createElement('a');
    linkItem.className = "nav-link";
    linkItem.id = id;
    linkItem.setAttribute("data-toggle", "tab");
    linkItem.setAttribute("role", "tab");
    linkItem.setAttribute("aria-controls", "profile");
    linkItem.setAttribute("aria-selected", "false");
    linkItem.href = href;
    linkItem.textContent = description;

    navItem.appendChild(linkItem);
    return navItem;
}

export { initializeNavigation };