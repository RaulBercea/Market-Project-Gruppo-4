/**
 * @file functionGUI.mjs
 * @author Raul Bercea, Pietro Milanese, Gabriele Bovolenta, Dario Di Maria, Joele Melchiorre
 * @description File containing all the functions used to generate the GUI.
 * 
 * Contains each function that is used to create the tables inside the page
 */


import * as fn from "./functions.mjs"; // functions
import { config as cnf } from "./config.mjs"; //configuration object
import * as global from "./globals.mjs";// global vars


/**
 * Function that adds the data from an array of items to a table
 * @param {HTMLOListElement} table - the table to add the items to
 * @param {Array} items - the array of items to add to the table
 */
export let printItems = (table, items) => {
    // cicle trough the items
    items.forEach((items) => {
        // create a new row
        let tableRow = document.createElement("tr");
        // create a new cell for each item
        tableRow.classList.add("table-body");

        // add the item id to the row
        let tdIdEl = document.createElement("td");
        let tdIdText = document.createTextNode(items.id);
        tdIdEl.appendChild(tdIdText);
        tdIdEl.classList.add("id-body");
        tableRow.appendChild(tdIdEl);

        // add the item name to the row
        let tdNameEl = document.createElement("td");
        let tdNameText = document.createTextNode(items.name);
        tdNameEl.appendChild(tdNameText);
        tdNameEl.classList.add("name-body");
        tableRow.appendChild(tdNameEl);

        // add the item expiry date to the row
        let tdExpiryEl = document.createElement("td");
        let tdExpiryText = document.createTextNode(
            fn.formatDate(items.expiry, cnf)
        );
        tdExpiryEl.appendChild(tdExpiryText);
        tdExpiryEl.classList.add("exp-date-body");
        tableRow.appendChild(tdExpiryEl);

        // add the item state to the row
        let tdStateEl = document.createElement("td");
        let tdStateText = document.createTextNode(items.state);
        tdStateEl.appendChild(tdStateText);
        tdStateEl.classList.add("status-body");
        tableRow.appendChild(tdStateEl);

        // add the item ammount of checks to the row
        let tdChecksEl = document.createElement("td");
        let tdChecksText = document.createTextNode(items.checks);
        tdChecksEl.appendChild(tdChecksText);
        tdChecksEl.classList.add("checks-body");
        tableRow.appendChild(tdChecksEl);

        // add the row to the table
        table.appendChild(tableRow);
    });
};

/**
 * Print a table in the dom starting from an object
 * @param {HTMLElement} table - the table in the dom to print to
 * @param {Object} tableItems - the object containing the items
 */
export let printTableItems = (table, tableItems) => {
    // loop trough the object
    for (const key in tableItems) {
        // create row
        let tableRow = document.createElement("tr");
        // add class to the row
        tableRow.classList.add("table-body");

        // add it to the table
        let tdIdEl = document.createElement("td");
        let tdIdText = document.createTextNode(tableItems[key][0]);
        tdIdEl.appendChild(tdIdText);
        tdIdEl.classList.add("id-body");
        tableRow.appendChild(tdIdEl);

        // add name to the table
        let tdNameEl = document.createElement("td");
        let tdNameText = document.createTextNode(tableItems[key][1]);
        tdNameEl.appendChild(tdNameText);
        tdNameEl.classList.add("name-body");
        tableRow.appendChild(tdNameEl);

        // add expiry date to the table
        let tdExpiryEl = document.createElement("td");
        let tdExpiryText = document.createTextNode(tableItems[key][2]);
        tdExpiryEl.appendChild(tdExpiryText);
        tdExpiryEl.classList.add("exp-date-body");
        tableRow.appendChild(tdExpiryEl);

        // add expiry status to the table
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

        // add checks to the table
        let tdChecksEl = document.createElement("td");
        let tdChecksText = document.createTextNode(tableItems[key][4]);
        tdChecksEl.appendChild(tdChecksText);
        tdChecksEl.classList.add("checks-body");
        tableRow.appendChild(tdChecksEl);

        // add row to table
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
    let tableData = []; // the table that will be returned

    // get each row
    let tableRows = table.getElementsByTagName("tr");

    // cicle trough the rows
    for (let i = 0; i < tableRows.length; i++) {
        // get the current row
        let tableRow = tableRows[i];
        // crate an empty object to store the row
        let tableDataRow = {};
        // get each cell in the row
        let tableCells = tableRow.getElementsByTagName("td");
        // cicle trough the cells
        for (let j = 0; j < tableCells.length; j++) {
            // get the current cell
            let tableCell = tableCells[j];
            // if cell data exists add its value to the variable
            if (tableCell.innerText !== "undefined") {
                tableDataRow[j] = tableCell.innerText;
            }
        }
        // checks if the row is empty
        if (Object.entries(tableDataRow).length !== 0) {
            // add the extracted row to the table
            tableData.push(tableDataRow);
        }
    }
    return tableData;
};

/**
 * Function that changes the week count in the dom
 * @param {Number} week - the current value of the week
 */
export let weekText = (week) => {
    global.weekText.innerText = `Week ${week}`;
};
