import * as fn from "./functions.mjs";
import { config as cnf } from "./config.mjs"; //configuration object
import * as global from "./globals.mjs";

//print full product in a raw
export let printItems = (table, items) => {
    items.forEach((items) => {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("table-body");

        let tdIdEl = document.createElement("td");
        let tdIdText = document.createTextNode(items.id);
        tdIdEl.appendChild(tdIdText);
        tdIdEl.classList.add("id-body");
        tableRow.appendChild(tdIdEl);

        let tdNameEl = document.createElement("td");
        let tdNameText = document.createTextNode(items.name);
        tdNameEl.appendChild(tdNameText);
        tdNameEl.classList.add("name-body");
        tableRow.appendChild(tdNameEl);

        let tdExpiryEl = document.createElement("td");
        let tdExpiryText = document.createTextNode(
            fn.formatDate(items.expiry, cnf)
        );

        tdExpiryEl.appendChild(tdExpiryText);
        tdExpiryEl.classList.add("exp-date-body");
        tableRow.appendChild(tdExpiryEl);

        let tdStateEl = document.createElement("td");
        let tdStateText = document.createTextNode(items.state);

        tdStateEl.appendChild(tdStateText);
        tdStateEl.classList.add("status-body");


        tableRow.appendChild(tdStateEl);

        let tdChecksEl = document.createElement("td");
        let tdChecksText = document.createTextNode(items.checks);
        tdChecksEl.appendChild(tdChecksText);
        tdChecksEl.classList.add("checks-body");
        tableRow.appendChild(tdChecksEl);


        table.appendChild(tableRow);
    });
};

/**
 * Print a table in the dom starting from an object
 * @param {HTMLElement} table - the table in the dom to print to
 * @param {Object} tableItems - the object containing the items
 */
export let printTableItems = (table, tableItems) => {
    for (const key in tableItems) {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("table-body");

        let tdIdEl = document.createElement("td");
        let tdIdText = document.createTextNode(tableItems[key][0]);
        tdIdEl.appendChild(tdIdText);
        tdIdEl.classList.add("id-body");
        tableRow.appendChild(tdIdEl);

        let tdNameEl = document.createElement("td");
        let tdNameText = document.createTextNode(tableItems[key][1]);
        tdNameEl.appendChild(tdNameText);
        tdNameEl.classList.add("name-body");
        tableRow.appendChild(tdNameEl);

        let tdExpiryEl = document.createElement("td");
        let tdExpiryText = document.createTextNode(tableItems[key][2]);

        tdExpiryEl.appendChild(tdExpiryText);
        tdExpiryEl.classList.add("exp-date-body");
        tableRow.appendChild(tdExpiryEl);

        let tdStateEl = document.createElement("td");
        let tdStateText = document.createTextNode(tableItems[key][3]);
        tdStateEl.appendChild(tdStateText);

        // color for the expiry status
        if (tableItems[key][3] === "New") {
            tdStateEl.classList.add("new");
        }
        if (tableItems[key][3] === "Valid") {
            tdStateEl.classList.add("valid");
        }
        if (tableItems[key][3] === "Old") {
            tdStateEl.classList.add("old");
        }
        if (tableItems[key][3] === "Expired") {
            tdStateEl.classList.add("expired");
        }
        tableRow.appendChild(tdStateEl);

        let tdChecksEl = document.createElement("td");
        let tdChecksText = document.createTextNode(tableItems[key][4]);
        tdChecksEl.appendChild(tdChecksText);
        tdChecksEl.classList.add("checks-body");
        tableRow.appendChild(tdChecksEl);

        table.appendChild(tableRow);
    }
};

/**
 * Function that will clear the content of a table
 * @param {Object} tableBody - the table to be cleared
 */
export let clearTable = (tableBody) => {
    while (tableBody.firstChild) {
        // This will remove all children within tbody
        tableBody.removeChild(tableBody.firstChild);
    }
};

/**
 * Function that turns a table from the dom into an array
 * @param {Object} table - the table from the dom
 * @returns the table as a bi-dimensional array
 */
export let getTableData = (table) => {
    let tableData = [];
    let tableRows = table.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        let tableRow = tableRows[i];
        let tableDataRow = {};
        let tableCells = tableRow.getElementsByTagName("td");
        for (let j = 0; j < tableCells.length; j++) {
            let tableCell = tableCells[j];
            if (tableCell.innerText !== "undefined") {
                tableDataRow[j] = tableCell.innerText;
            }
        }
        // checks if the row is empty
        if (Object.entries(tableDataRow).length !== 0) {
            tableData.push(tableDataRow);
        }
    }
    return tableData;
};

/**
 * Function that changes the week count in the dom
 * @param {Number} week - the current value of the week
 */
export let weekText = (week, date) => {
    global.weekText.innerText = `Week ${week}`;
    global.weekDate.innerText = `${date}`;
};
