function createTableHeader(nameList) {

	var tableHead = document.createElement('thead');
	var tableHeadRow = document.createElement('tr');
	tableHead.appendChild(tableHeadRow);

	for(const name of nameList) {
        var column = document.createElement('th');
        column.scope = "col";
        column.textContent = name;
        tableHeadRow.appendChild(column);
    }

	return tableHead;
}

function createTableBody(valueLists) {

	var tableBody = document.createElement('tbody');
	for(const valueList of valueLists) {

        var tableRow = document.createElement('tr');
        
        for(const value of valueList) {
            var data = document.createElement('td');
            data.textContent = value;
            tableRow.appendChild(data);
        }
        
		tableBody.appendChild(tableRow);
	}

	return tableBody;
}

export { createTableHeader, createTableBody };