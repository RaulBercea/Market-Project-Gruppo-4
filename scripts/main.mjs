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
 import { itemNames } from "./itemsNames.mjs"; //array with a list of all possible item names
 import * as fng from "./functionGUI.mjs";
 
 let isRunning = false;
 let tablesContainer = document.getElementsByClassName("table-container")[0];
 
 let init = () => {
   let runtime = cnf.weeksRuntime;
 
   if (runtime <= 0) {
     console.log(
       "The program runitme is either 0 or less. Please check your configuration file."
     );
     return;
   }
 
   if (isRunning) {
     console.log("The program is already running.");
     return;
   }
 
   isRunning = true;
 
   //startDate and endDate define the range of the generated items' expiry dates
   let startDate = new Date();
   let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);
 
   let interval = Math.floor(
     Math.random() * (cnf.maxIntervalSec - cnf.minIntervalSec + 1) +
       cnf.minIntervalSec
   );
   console.log(
     `Seconds interval: ${interval} (between ${cnf.minIntervalSec} and ${cnf.maxIntervalSec})`
   );
 
   let currentDate = fn.addDays(startDate, cnf.startingOffset);
 
   let items = [];
   let weekIndex = 0;
   let currentTableVisible = 0;
 
  for(let i=0; i<runtime; i++){
     weekIndex = weekIndex + 1;
     currentTableVisible = currentTableVisible + 1;
 
     let startConfig = {
       itemNames,
       startDate,
       endDate,
       currentDate,
       shelfLife: cnf.shelfLife,
     };
 
     // 1) Add new items
     items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));
 
     // 2) Print all of the items
     // console.log(`Week of ${fn.formatDate(currentDate, cnf)}`);
     // console.log("---------------------------------------------------------");
     // fn.printItems(items, cnf);
 
     fng.printTable(tablesContainer, items, weekIndex);
     fng.printWeek(fn.formatDate(currentDate, cnf), weekIndex)
    
  
 
     if (weekIndex > 1) {
       let previousWeek = document.getElementById("week-" + (weekIndex - 1));
       previousWeek.classList.add("hidden");
      
       let previousWeekFilterTitle = document.getElementById("title-filter-week-" + (weekIndex - 1));
       previousWeekFilterTitle.classList.add("hidden");
      
     }
 
     // 3) Filter the items and print the filtered list
     items = items.filter(fn.checkItem);
     // console.log("Filtered");
     // console.log("--------");
     // fn.printItems(items, cnf);
 
     fng.printTableFilter(tablesContainer, items, weekIndex);
     if (weekIndex > 1) {
       let previousWeekFilter = document.getElementById("filter-week-" + (weekIndex - 1));
       previousWeekFilter.classList.add("hidden");
      
     }
    
   
     // console.log("");
 
     // 4) Add days to the current date
     currentDate = fn.addDays(currentDate, cnf.daysInWeek);
 
     // 5) Update the items (state and checks)
     items.forEach((item) => {
       fn.updateChecks(item);
       fn.updateState(item, currentDate, cnf.shelfLife);
     });
 
     // 6) Check if the program should go on
     
   }
       isRunning = false;
       document.getElementById("back-button").addEventListener("click", backFunction);
       function backFunction() {
         if (currentTableVisible <= weekIndex && currentTableVisible > 1) {
           let currentTable = document.getElementById("week-" + currentTableVisible);
           let currentTableFiltered = document.getElementById("filter-week-" + currentTableVisible);
           let currentTableFilterTitle = document.getElementById("title-filter-week-" + currentTableVisible);
 
           currentTable.classList.add("hidden");
           currentTableFiltered.classList.add("hidden");
           currentTableFilterTitle.classList.add("hidden");
 
           currentTableVisible = currentTableVisible - 1;
 
           let previousTable = document.getElementById("week-" + currentTableVisible);
           let previousTableFiltered = document.getElementById("filter-week-" + currentTableVisible);
           let previousTableFilterTitle = document.getElementById("title-filter-week-" + currentTableVisible);
           previousTable.classList.remove("hidden");
           previousTableFiltered.classList.remove("hidden");
           previousTableFilterTitle.classList.remove("hidden");
         }
       }
 
       document.getElementById("forward-button").addEventListener("click", nextFunction);
       function nextFunction() {
         if (currentTableVisible < weekIndex && currentTableVisible >= 1) {
           let currentTable = document.getElementById("week-" + currentTableVisible);
           let currentTableFiltered = document.getElementById("filter-week-" + currentTableVisible);
           let currentTableFilterTitle = document.getElementById("title-filter-week-" + currentTableVisible);
           currentTable.classList.add("hidden");
           currentTableFiltered.classList.add("hidden");
           currentTableFilterTitle.classList.add("hidden");
 
           currentTableVisible = currentTableVisible + 1;
 
           let previousTable = document.getElementById("week-" + currentTableVisible);
           let previousTableFiltered = document.getElementById("filter-week-" + currentTableVisible);
           let previousTableFilterTitle = document.getElementById("title-filter-week-" + currentTableVisible);
           previousTable.classList.remove("hidden");
           previousTableFiltered.classList.remove("hidden");
           previousTableFilterTitle.classList.remove("hidden");
         }
       }
     
 };
 
 init();
 
 