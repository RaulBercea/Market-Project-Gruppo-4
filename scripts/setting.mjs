/**
 * @file main.mjs
 * @authors Gabriele Bovolenta, Pietro Milanese, Dario Di Maria, Raul Bercea, Joele Melchiorre
 * Setting file for validation's form
 *
 * This file imports config to edit it through the form and globals to get all the globals variables
 */

import { config as cnf } from "./config.mjs"; //configuration object
import * as global from "./globals.mjs"; //holds all the global variables in the project

/**
 * Function controll the input number, return true if the number is valid
 * @param {string} element // get the global variable the you want to check
 * @param {int} min // input's minimun number 
 * @param {int} max // input's maximum number
 */
function controlNumber(element, min, max) {
    // if the namber value is a character and starts with zero, the input is invalid
    if ((/\D|^0/gi.test(element.value))) {
        document.querySelector(`#${element.getAttribute('id')} + h5`).textContent = 'Devi inserire un numero compreso tra ' + min + ' e ' + max;
        return false;
    }
    // if the input's value is < than the minimun number, the input is invalid
    else if (element.value < min) {
        document.querySelector(`#${element.getAttribute('id')} + h5`).textContent = 'Devi inserire un numero compreso tra ' + min + ' e ' + max;
        return false;
    } // if the input's value is > than the maximum number, the input is invalid
    else if (element.value > max) {
        document.querySelector(`#${element.getAttribute('id')} + h5`).textContent = 'Devi inserire un numero minore di ' + max;
        return false;
    }
    // if the input is valid return true
    else {
        return true;
    }
};

/**
 * Function cancel
 * Reset all the h5 in the form showing an error
 */
function cancel() {
    let title = document.querySelectorAll('h5');

    title.forEach(element => {
        element.innerText = "";
    });
};

/**
 * Function validation that check all the number input and, if they are all true, 
 * changes the config.mjs returnig true
 */
export function validation() {
    cancel();

    let valid = false;

    controlNumber(global.daysInWeek, 1, 7);
    controlNumber(global.startingOffset, 1, 30);
    controlNumber(global.shelfLife, 1, 30);
    controlNumber(global.itemsPerWeek, 1, 20);
    controlNumber(global.runtime, 1, 20);

    if (controlNumber(global.daysInWeek, 1, 7)
        && controlNumber(global.startingOffset, 1, 30)
        && controlNumber(global.shelfLife, 1, 30)
        && controlNumber(global.itemsPerWeek, 1, 20)
        && controlNumber(global.runtime, 1, 20)) {
        cnf.daysInWeek = parseInt(global.daysInWeek.value);
        cnf.startingOffset = parseInt(global.startingOffset.value);
        cnf.shelfLife = parseInt(global.shelfLife.value);
        cnf.newItemsPerWeek = parseInt(global.itemsPerWeek.value);
        cnf.weeksRuntime = parseInt(global.runtime.value);

        valid = true;
    };

    return valid;
};
