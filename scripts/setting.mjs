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

/**
 * @file main.mjs
 * @authors Gabriele Bovolenta, Pietro Milanese, Dario Di Maria, Raul Bercea
 * Setting file for validation's form
 *
 * This file imports config to edit it through the form.
 */

import { config as cnf } from "./config.mjs"; //configuration object

/**
 * Function setting form hidden
 */
function settingForm() {
    let setting = document.getElementById("target");
    let form = document.getElementById("hidden-setting");

    setting.addEventListener("click", function () {
        form.classList.toggle("hidden");
    });
};

settingForm();

/**
 * Function validation form
 * @param {element}  
 * @param {minore}  
 * @param {maggiore} 
 * @param {child} 
 */
function controlNumber(element, minore, maggiore, child) {
    if ((/\D|^0/gi.test(element.value))) {
        document.querySelector(`#form div:nth-of-type(${child}) h5`).textContent = 'Devi inserire un numero compreso tra ' + minore + ' e ' + maggiore;
        return false;
    }
    else if (element.value < minore) {
        document.querySelector(`#form div:nth-of-type(${child}) h5`).textContent = 'Devi inserire un numero compreso tra ' + minore + ' e ' + maggiore;
        return false;
    }
    else if (element.value > maggiore) {
        document.querySelector(`#form div:nth-of-type(${child}) h5`).textContent = 'Devi inserire un numero minore di ' + maggiore;
        return false;
    }
    else {
        return true;
    }
};

/**
 * Function cancel
 * Reset all the h5 in the form
 */
function cancel() {
    title.forEach(element => {
        element.textContent = "";
    });
};


/**
 * Function validation
 */
function validation() {
    cancel();

    controlNumber(weeks, 0, 10, 1);
    controlNumber(weeklyProduction, 1, 5, 2);
    controlNumber(weeklyDuration, 1, 10, 3);
    controlNumber(checkThreshold, 1, 10, 4);
    controlNumber(dateOffset, 1, 10, 5);

    if (controlNumber(weeks, 1, 10, 1)
        && controlNumber(weeklyProduction, 1, 5, 2)
        && controlNumber(weeklyDuration, 1, 10, 3)
        && controlNumber(checkThreshold, 1, 10, 4)
        && controlNumber(dateOffset, 1, 10, 5)) {
        cnf.weeksRuntime = weeks.value;
        cnf.newItemsPerWeek = weeklyProduction.value;
        cnf.shelfLife = checkThreshold.value;
        cnf.startingOffset = dateOffset.value;
    };
};

const button = document.getElementById('submit');
button.addEventListener('click', validation);