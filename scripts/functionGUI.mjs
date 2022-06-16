import * as fn from "./functions.mjs";
import { config as cnf } from "./config.mjs"; //configuration object

//print full product in a raw
export let printItems = (table, items) => {
  items.forEach((element) => {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("table-body");
    table.appendChild(tableRow);

    let tdIdEl = document.createElement("td");
    let tdIdText = document.createTextNode(element.id);
    tdIdEl.appendChild(tdIdText);
    tdIdEl.classList.add("id-body");
    tableRow.appendChild(tdIdEl);

    let tdNameEl = document.createElement("td");
    let tdNameText = document.createTextNode(element.name);
    tdNameEl.appendChild(tdNameText);
    tdNameEl.classList.add("name-body");
    tableRow.appendChild(tdNameEl);

    let tdExpiryEl = document.createElement("td");
    let tdExpiryText = document.createTextNode(
      fn.formatDate(element.expiry, cnf)
    );
    tdExpiryEl.appendChild(tdExpiryText);
    tdExpiryEl.classList.add("exp-date-body");
    tableRow.appendChild(tdExpiryEl);

    let tdStateEl = document.createElement("td");
    let tdStateText = document.createTextNode(element.state);
    tdStateEl.appendChild(tdStateText);
    tdStateEl.classList.add("status-body");
    tableRow.appendChild(tdStateEl);

    let tdChecksEl = document.createElement("td");
    let tdChecksText = document.createTextNode(element.checks);
    tdChecksEl.appendChild(tdChecksText);
    tdChecksEl.classList.add("checks-body");
    tableRow.appendChild(tdChecksEl);
  });
};

//print separator Filtered elements
export let printSeparator = (table, index) => {
  let separatorRow = document.createElement("tr");
  separatorRow.classList.add("separator-container");
  separatorRow.setAttribute("id", "title-filter-week-" + index);
  let separatorRowTd = document.createElement("td");
  let separatorRowTdText = document.createTextNode("Filtered");
  separatorRowTd.appendChild(separatorRowTdText);
  separatorRow.appendChild(separatorRowTd);

  table.appendChild(separatorRow);
};

//printfulltable
export let printTable = (tablesContainer, items, index) => {
  let weekTable = document.createElement("table");
  tablesContainer.appendChild(weekTable);
  weekTable.setAttribute("id", "week-" + index);
  weekTable.classList.add("main-table");

  let weekTableHeader = document.createElement("thead");
  weekTableHeader.setAttribute("id", "id-thead-" + index);
  weekTable.appendChild(weekTableHeader);

  let weekTableHeadTr = document.createElement("tr");
  weekTableHeader.appendChild(weekTableHeadTr);
  weekTableHeadTr.classList.add("table-header");

  let weekTableHeadId = document.createElement("th");
  let weekTableHeadIdText = document.createTextNode("ID");
  weekTableHeadId.appendChild(weekTableHeadIdText);
  weekTableHeadId.classList.add("id-header");
  weekTableHeadTr.appendChild(weekTableHeadId);

  let weekTableHeadName = document.createElement("th");
  let weekTableHeadNameText = document.createTextNode("Name");
  weekTableHeadName.appendChild(weekTableHeadNameText);
  weekTableHeadName.classList.add("name-header");
  weekTableHeadTr.appendChild(weekTableHeadName);

  let weekTableHeadExp = document.createElement("th");
  let weekTableHeadExpText = document.createTextNode("Expiry Date");
  weekTableHeadExp.appendChild(weekTableHeadExpText);
  weekTableHeadExp.classList.add("exp-date-header");
  weekTableHeadTr.appendChild(weekTableHeadExp);

  let weekTableHeadStatus = document.createElement("th");
  let weekTableHeadStatusText = document.createTextNode("Status");
  weekTableHeadStatus.appendChild(weekTableHeadStatusText);
  weekTableHeadStatus.classList.add("status-header");
  weekTableHeadTr.appendChild(weekTableHeadStatus);

  let weekTableHeadChecks = document.createElement("th");
  let weekTableHeadChecksText = document.createTextNode("Checks");
  weekTableHeadChecks.appendChild(weekTableHeadChecksText);
  weekTableHeadChecks.classList.add("checks-header");
  weekTableHeadTr.appendChild(weekTableHeadChecks);

  printItems(weekTable, items);
  printSeparator(tablesContainer, index);
};

//print filtered element
export let printTableFilter = (tablesContainer, items, index) => {
  let weekTable = document.createElement("table");
  tablesContainer.appendChild(weekTable);
  weekTable.setAttribute("id", "filter-week-" + index);
  weekTable.classList.add("main-table");

  let weekTableHeader = document.createElement("thead");
  weekTable.appendChild(weekTableHeader);

  let weekTableHeadTr = document.createElement("tr");
  weekTableHeader.appendChild(weekTableHeadTr);
  weekTableHeadTr.classList.add("table-header");

  let weekTableHeadId = document.createElement("th");
  let weekTableHeadIdText = document.createTextNode("ID");
  weekTableHeadId.appendChild(weekTableHeadIdText);
  weekTableHeadId.classList.add("id-header");
  weekTableHeadTr.appendChild(weekTableHeadId);

  let weekTableHeadName = document.createElement("th");
  let weekTableHeadNameText = document.createTextNode("Name");
  weekTableHeadName.appendChild(weekTableHeadNameText);
  weekTableHeadName.classList.add("name-header");
  weekTableHeadTr.appendChild(weekTableHeadName);

  let weekTableHeadExp = document.createElement("th");
  let weekTableHeadExpText = document.createTextNode("Expiry Date");
  weekTableHeadExp.appendChild(weekTableHeadExpText);
  weekTableHeadExp.classList.add("exp-date-header");
  weekTableHeadTr.appendChild(weekTableHeadExp);

  let weekTableHeadStatus = document.createElement("th");
  let weekTableHeadStatusText = document.createTextNode("Status");
  weekTableHeadStatus.appendChild(weekTableHeadStatusText);
  weekTableHeadStatus.classList.add("status-header");
  weekTableHeadTr.appendChild(weekTableHeadStatus);

  let weekTableHeadChecks = document.createElement("th");
  let weekTableHeadChecksText = document.createTextNode("Checks");
  weekTableHeadChecks.appendChild(weekTableHeadChecksText);
  weekTableHeadChecks.classList.add("checks-header");
  weekTableHeadTr.appendChild(weekTableHeadChecks);

  printItems(weekTable, items);
};

//printweek
export let printWeek = (week, index) => {
  let weekTableHeader = document.getElementById("id-thead-" + index);

  let weekDiv = document.createElement("div");
  weekDiv.classList.add("separator-container");
  let weekDivText = document.createElement("p");
  let weekDivTextContent = document.createTextNode(week);
  weekDivText.appendChild(weekDivTextContent);
  weekDiv.appendChild(weekDivText);
  weekTableHeader.prepend(weekDiv);
}

