/**
 * @file main.mjs
 * @authors Nemanja Gajicic, Pietro Milanese, Jacopo Trompeo, Davide Murroni
 * Main file used to run the program
 *
 * This file imports functions and variables from the other files in the project
 * and uses them to run the main program.
 */

import { config as cnf } from "./config.mjs"; //configuration object
import * as fn from "./functions.mjs"; //main functions used to run the program
import * as fng from "./functionGUI.mjs"; //main functions used to for the GUI
import * as set from "./setting.mjs"; //main functions used to for the GUI
import { itemNames } from "./itemsNames.mjs"; //array with a list of all possible item names
import * as global from "./globals.mjs";

let init = () => {
  let runtime = cnf.weeksRuntime;
  //startDate and endDate define the range of the generated items' expiry dates
  let startDate = new Date();
  let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);

  let currentDate = fn.addDays(startDate, cnf.startingOffset);
  let weeks = []; // aray wich will hold the items divided by week
  let items = []; //	array which will hold the items
  let filteredWeek = [];
  let currentWeek = 0; // the index of the current week in the week array

  let hasReachedLimit = false;

  let startConfig = {
    itemNames,
    startDate,
    endDate,
    currentDate,
    shelfLife: cnf.shelfLife,
  };

  // the unfiltered table
  let mainTable = document.getElementById("table-content");

  // the fitered table
  let tableFiltered = document.getElementById("table-content-filtered");

  let addTableOfItems = () => {
    // Add new items
    items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));

    weeks.push(items);
    console.log(currentWeek);
    fng.printItems(mainTable, weeks[currentWeek]);

    items = items.filter(fn.checkItem);
    filteredWeek.push(items);
    fng.printItems(tableFiltered, filteredWeek[currentWeek]);

    // Add days to the current date
    currentDate = fn.addDays(currentDate, cnf.daysInWeek);

    items.forEach((item) => {
      fn.updateChecks(item);
      fn.updateState(item, currentDate, cnf.shelfLife);
    });
  };

  addTableOfItems();

  let toggleButton = () => {
    if (currentWeek === 0) {
      global.backButton.style.visibility = "hidden";
    }
    else if (currentWeek === runtime) {
      global.forwardButton.style.visibility = "hidden";
    }
    else if (currentWeek > 0 && currentWeek < runtime) {
      global.backButton.style.visibility = "visible";
      global.forwardButton.style.visibility = "visible";
    }
  }

  let tableMove = (direction) => {

    if (currentWeek === runtime) {
      hasReachedLimit = true;
    }

    if (direction === "++" && !global.hasReachedLimit) {
      fng.clearTable(mainTable);
      fng.clearTable(tableFiltered);
      currentWeek++;
      addTableOfItems();
    } else if (direction === "--" && currentWeek > 0) {
      fng.clearTable(mainTable);
      fng.clearTable(tableFiltered);
      currentWeek--;
      addTableOfItems();
    }
  };

  global.backButton.addEventListener("click", () => {
    tableMove("--");
    toggleButton();
  });
  global.forwardButton.addEventListener("mousedown", () => {
    tableMove("++");
    toggleButton();
  });
};

init();
