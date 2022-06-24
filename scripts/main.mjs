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
   console.log(startDate)
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
 
     // add unfiltered items to the weeks array
     weeks.push(items);
     // printing the unfiltered items on the table in the dom
     fng.printItems(mainTable, weeks[currentWeek]);
 
     // filtering items
     items = items.filter(fn.checkItem);
 
     // adding the filtered items to the filter array
     filteredWeek.push(items);
 
     // printing the filtered items to the filtered table in the dom
     fng.printItems(tableFiltered, filteredWeek[currentWeek]);
 
     // Add days to the current date
     currentDate = fn.addDays(currentDate, cnf.daysInWeek);
 
     // checking the status of the item and changing it if necessary
     items.forEach((item) => {
       fn.updateChecks(item);
       fn.updateState(item, currentDate, cnf.shelfLife);
     });
   };
 
   // first creation of the table
   addTableOfItems();
 
   /**
    * function that toggles the left and right buttons based on the position of
    * the array
    */
   let toggleButton = () => {
     // hide the back button when the array is at 0
     if (currentWeek === 0) {
       global.backButton.style.visibility = "hidden";
     }
     // hiding the forward button when the array reaches the max
     else if (currentWeek === runtime) {
       global.forwardButton.style.visibility = "hidden";
     }
     // when the array is between 0 and the max runtime both buttons are visible
     else if (currentWeek > 0 && currentWeek < runtime) {
       global.backButton.style.visibility = "visible";
       global.forwardButton.style.visibility = "visible";
     }
   }
 
   /**
    * Function that prints the next or previous week of items
    * @param {String} direction - weather to print the next or previous week
    */
   let tableMove = (direction) => {
     // check if the maximum number of weeks has been printed
     if (currentWeek === runtime) {
       hasReachedLimit = true;
     }
     // printing the next week if there is still weeks to be printed
     if (direction === "++" && !global.hasReachedLimit) {
       // remove the content of the table
       fng.clearTable(mainTable);
       fng.clearTable(tableFiltered);
       // increase the week counter
       currentWeek++;
       // print the week
       addTableOfItems();
     }
     // if above the starting week print the previous week
     else if (direction === "--" && currentWeek > 0) {
       // clear the table
       fng.clearTable(mainTable);
       fng.clearTable(tableFiltered);
       // decrease the week count
       currentWeek--;
       // print the week
       addTableOfItems();
     }
   };
 
   // event listener for the click of the back button
   global.backButton.addEventListener("mousedown", () => {
     tableMove("--");// make the week go back
     toggleButton();// toggle the button if at the minimum
   });
   global.forwardButton.addEventListener("mousedown", () => {
     tableMove("++");// make the week go back
     toggleButton();// toggle the button if at the minimum
   });
 };
 
 init();
 