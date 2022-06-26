/**
 * @file: globals.js
 * holds all the global variables in the project
 *
 */

// back button for the table
export let backButton = document.getElementById("back-button");
// forward button for the table
export let forwardButton = document.getElementById("forward-button");
// table that holds the items
export let table = document.getElementById("main-table");
// table that holds the filtered items
export let filteredTable = document.getElementById("table-content-filtered");

// the week text in the separator
export let weekText = document.getElementById("week");
export let weekDate = document.getElementById("date");

// the form fields
export let daysInWeek = document.getElementById("days-in-week-setting");
export let startingOffset = document.getElementById("starting-offset-setting");
export let shelfLife = document.getElementById("shelf-life-setting");
export let itemsPerWeek = document.getElementById("items-per-week-setting");
export let runtime = document.getElementById("runtime-setting");

// the save button for the setting
export let settingsSubmit = document.getElementById("submit");
