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

export 