import * as fn from "./functions.mjs";
import { config as cnf } from "./config.mjs"; //configuration object

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

export let clearTable = (tableBody) => {
  while (tableBody.firstChild) {
    // This will remove all children within tbody
    tableBody.removeChild(tableBody.firstChild);
  }
};

// function that gets the data from a table and returns an array of objects
export let getTableData = (table) => {
  let tableData = [];
  let tableRows = table.getElementsByTagName("tr");
  for (let i = 1; i < tableRows.length; i++) {
    let tableRow = tableRows[i];
    let tableDataRow = {};
    let tableCells = tableRow.getElementsByTagName("td");
    for (let j = 0; j < tableCells.length; j++) {
      let tableCell = tableCells[j];
      tableDataRow[j] = tableCell.innerHTML;
    }
    tableData.push(tableDataRow);
  }
  return tableData;
};
