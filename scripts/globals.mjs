/**
 * @file: globals.js
 * @author: Raul Bercea, Pietro Milanese, Gabriele Bovolenta, Dario Di Maria, Joele Melchiorre
 * holds all the global variables in the project
 *
 * By storing the global variables in a separate module it makes accesing them from another
 * file easyer
 */

// back button for the table
export let backButton = document.getElementById("back-button");
// forward button for the table
export let forwardButton = document.getElementById("forward-button");
// table that holds the items
export let mainTable = document.getElementById("main-table");
// table that holds the filtered items
export let tableFiltered = document.getElementById("table-content-filtered");

// the week text in the separator
export let weekText = document.getElementById("week");

// the form fields
export let daysInWeek = document.getElementById("days-in-week-setting");
export let startingOffset = document.getElementById("starting-offset-setting");
export let shelfLife = document.getElementById("shelf-life-setting");
export let itemsPerWeek = document.getElementById("items-per-week-setting");
export let runtime = document.getElementById("runtime-setting");

// the save button for the setting
export let settingsSubmit = document.getElementById("submit");
