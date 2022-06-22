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

let isRunning = false;

let init = () => {
  let runtime = cnf.weeksRuntime;
  //startDate and endDate define the range of the generated items' expiry dates
  let startDate = new Date();
  let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);

  // the unfiltered table
  let mainTable = document.getElementById("table-content");

  // the fitered table
  let tableFiltered = document.getElementById("table-content-filtered");

  let currentDate = fn.addDays(startDate, cnf.startingOffset);
  let weeks = [];// aray wich will hold the items divided by week
  let items = [];//	array which will hold the items
  let filteredWeek = [];
  let currentWeek = 0;// the index of the current week in the week array

  let startConfig = {
    itemNames,
    startDate,
    endDate,
    currentDate,
    shelfLife: cnf.shelfLife,
  };

  // 1) Add new items
  items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));

  weeks.push(items);
  fng.printItems(mainTable, weeks[currentWeek]);
  // 2) Filter the items and print the filtered list
  items = items.filter(fn.checkItem);

  // 4) adding the items to the filtered array
  filteredWeek.push(items);
  fng.printItems(tableFiltered, filteredWeek[currentWeek]);
  // 4) Add days to the current date
  currentDate = fn.addDays(currentDate, cnf.daysInWeek);

  // 5) Update the items (state and checks)
  items.forEach((item) => {
    fn.updateChecks(item);
    fn.updateState(item, currentDate, cnf.shelfLife);
  });




}

init();
