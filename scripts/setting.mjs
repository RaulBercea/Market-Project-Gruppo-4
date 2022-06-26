/**
 * @file: setting.js
 *
 * validate-form
 */

import { config as cnf } from "./config.mjs";
import * as global from "./globals.mjs";

/**
 * Function that checks all inputs for a valid input and returns true
 * if all inputs are valid otherwise notifies the user with text in the dom
 */
export let validate = () => {
    let valid = true;// flag for the form validation

    // hide all output texts in the form on submit
    document.querySelector("input + h5").style.visibility = "hidden";
    // check for the days in a week
    if (!/^[1-7]{1}$/.test(global.daysInWeek.value) || global.daysInWeek.value == "") {
        let ouputText = document.querySelector("#days-in-week-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 1 and 7)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the starting offset
    if (
        !/^[0-9]{1,2}$/.test(global.startingOffset.value) ||
        global.startingOffset.value > 30 ||
        global.startingOffset.value == ""
    ) {
        let ouputText = document.querySelector("#starting-offset-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 0 and 30)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the shelf life
    if (
        !/^[1-9]{1,2}$/.test(global.shelfLife.value) ||
        global.shelfLife.value > 30 ||
        global.shelfLife.value == ""
    ) {
        let ouputText = document.querySelector("#shelf-life-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 0 and 30)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the items per week
    if (
        !/^[1-9]{1,2}$/.test(global.itemsPerWeek.value) ||
        global.itemsPerWeek.value > 10 ||
        global.itemsPerWeek.value == ""
    ) {
        let ouputText = document.querySelector("#items-per-week-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 1 and 10)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the runtime
    if (
        !/^[1-9]{1,2}$/.test(global.runtime.value) ||
        global.runtime.value > 20 ||
        global.runtime.value == ""
    ) {
        let ouputText = document.querySelector("#runtime-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 1 and 20)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    return valid;
};

/**
 * Function that updatetes the configuration if the form is valid
 * @param {Boolean} valid - the validity of the form 
 */
export let updateConfig = (valid) => {
    if (valid) {
        cnf.daysInWeek = parseInt(global.daysInWeek.value);
        cnf.startingOffset = parseInt(global.startingOffset.value);
        cnf.shelfLife = parseInt(global.shelfLife.value);
        cnf.itemsPerWeek = parseInt(global.itemsPerWeek.value);
        cnf.weeksRuntime = parseInt(global.runtime.value);
    }
}

