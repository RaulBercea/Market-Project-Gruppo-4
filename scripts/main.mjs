/**
 * @file main.mjs
 * @authors Raul Bercea, Gabriele Bovolenta, Pietro Milanese, Joele Melchiorre, Dario DiMaria
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

let isRunning = false;

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

  // Add new items
  items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));

  // add the items to the array containing all the items
  weeks.push(items);
  fng.printItems(mainTable, weeks[currentWeek]);

  // Filter the items
  items = items.filter(fn.checkItem);

  // adding the filtered items to the filtered array
  filteredWeek.push(items);
  fng.printItems(tableFiltered, filteredWeek[currentWeek]);

  // Add days to the current date
  currentDate = fn.addDays(currentDate, cnf.daysInWeek);

  // Update the items (state and checks)
  items.forEach((item) => {
    fn.updateChecks(item);
    fn.updateState(item, currentDate, cnf.shelfLife);
  });

  let tableMove = () => {
    fng.clearTable(mainTable);
    fng.clearTable(tableFiltered);
    if (currentWeek < runtime) {
      currentWeek++;
      init();
    }
    console.log(currentWeek);
  };

  global.backButton.addEventListener("mousedown", tableMove);
  global.forwardButton.addEventListener("mousedown", tableMove);
};

init();
