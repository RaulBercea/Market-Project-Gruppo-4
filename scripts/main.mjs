/**
 * @file main.mjs
 * @authors Raul Bercea, Pietro Milanese, Gabriele Bovolenta, Dario Di Maria, Joele Melchiorre
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
    // the ammount of time the program runns for
    let runtime = cnf.weeksRuntime - 1;
    //startDate and endDate define the range of the generated items' expiry dates
    let startDate = new Date();
    let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);
    let currentDate = fn.addDays(startDate, cnf.startingOffset);
    let weeks = []; // aray wich will hold the items divided by week
    let items = []; //	array which will hold the items
    let filteredWeek = [];

    let tableArray = [];
    let filteredArray = [];

    let currentWeek = 0; // the index of the current week in the week array

    // the unfiltered table
    let mainTable = document.getElementById("table-content");

    // the fitered table
    let tableFiltered = document.getElementById("table-content-filtered");

    let checkItems = (items) => {
        items.forEach((item) => {
            fn.updateChecks(item);
            fn.updateState(item, currentDate, cnf.shelfLife);
        });
    };

    let startConfig = {
        itemNames,
        startDate,
        endDate,
        currentDate,
        shelfLife: cnf.shelfLife,
    };

    let addTableOfItems = () => {

        if (weeks.length > runtime) {
            fng.printTableItems(mainTable, tableArray[currentWeek]);
            fng.printTableItems(tableFiltered, filteredArray[currentWeek]);
            return;
        }
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

        if (tableArray.length <= currentWeek) {
            tableArray.push(fng.getTableData(global.table));
            filteredArray.push(fng.getTableData(global.filteredTable));
        }

        // Add days to the current date
        if (currentDate != endDate) {
            currentDate = fn.addDays(currentDate, cnf.daysInWeek);
        }

        // checking the status of the items and changing it if necessary
        checkItems(items);
    };

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
    };

    /**
     * Function that prints the next or previous week of items
     * @param {String} direction - weather to print the next or previous week
     */
    let tableMove = (direction) => {
        // printing the next week if there is still weeks to be printed
        if (direction === "++") {
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

    addTableOfItems();

    // event listener for the click of the back button
    global.backButton.addEventListener("click", () => {
        tableMove("--"); // make the week go back
        let daysToAdd = cnf.daysInWeek * currentWeek + 1;
        // print the curent week
        fng.weekText(currentWeek + 1, fn.formatDate(fn.addDays(currentDate, daysToAdd), cnf));
        toggleButton(); // toggle the button if at the minimum
    });

    // event listener for the forward button
    global.forwardButton.addEventListener("click", () => {
        tableMove("++"); // make the week go back
        let daysToAdd = cnf.daysInWeek * currentWeek + 1;
        // print the week
        fng.weekText(currentWeek + 1, fn.formatDate(fn.addDays(currentDate, daysToAdd), cnf));
        toggleButton(); // toggle the button if at the minimum
    });

    // triggering the buttons forwards and backwards to populate the array
    for (let i = 0; i < runtime; i++) {
        global.forwardButton.dispatchEvent(new Event("click"));
    }
    for (let i = runtime; i >= 0; i--) {
        global.backButton.dispatchEvent(new Event("click"));
    }

    // running the functions when the user clicks on the save button
    global.settingsSubmit.addEventListener("click", () => {
        let valid = set.validate(); // validating inputs
        set.updateConfig(valid); // updating the configuration
        if (valid) {
            init(); // reinitializing the program
        }
        console.log(cnf);
    });
};

init();
