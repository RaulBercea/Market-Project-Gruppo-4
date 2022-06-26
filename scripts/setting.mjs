/**
 * @file: setting.js
 *
 * validate-form
 */

/**
 * @file main.mjs
 * @authors Gabriele Bovolenta, Pietro Milanese, Dario Di Maria, Raul Bercea
 * Setting file for validation's form
 *
 * This file imports config to edit it through the form.
 */

import { config as cnf } from "./config.mjs"; //configuration object
import * as global from "./globals.mjs";

/**
 * Function validation form
 * @param {element}
 * @param {minore}
 * @param {maggiore}
 */

function controlNumber(element, min, max) {
    if ((/\D|^0/gi.test(element.value))) {
        document.querySelector(`#${element.getAttribute('id')} + h5`).textContent = 'Devi inserire un numero compreso tra ' + min + ' e ' + max;
        return false;
    }
    else if (element.value < min) {
        document.querySelector(`#${element.getAttribute('id')} + h5`).textContent = 'Devi inserire un numero compreso tra ' + min + ' e ' + max;
        return false;
    }
    else if (element.value > max) {
        document.querySelector(`#${element.getAttribute('id')} + h5`).textContent = 'Devi inserire un numero minore di ' + max;
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
    let title = document.querySelectorAll('h5');

    title.forEach(element => {
        element.innerText = "";
    });
};

/**
 * Function validation
 */
export function validation() {
    cancel();

    let valid = false;

    controlNumber(global.daysInWeek, 0, 10);
    controlNumber(global.startingOffset, 1, 5);
    controlNumber(global.shelfLife, 1, 10);
    controlNumber(global.itemsPerWeek, 1, 10);
    controlNumber(global.runtime, 1, 10);

    if (controlNumber(global.daysInWeek, 1, 10)
        && controlNumber(global.startingOffset, 1, 5)
        && controlNumber(global.shelfLife, 1, 10)
        && controlNumber(global.itemsPerWeek, 1, 10)
        && controlNumber(global.runtime, 1, 10)) {
        cnf.daysInWeek = parseInt(global.daysInWeek.value);
        cnf.startingOffset = parseInt(global.startingOffset.value);
        cnf.shelfLife = parseInt(global.shelfLife.value);
        cnf.newItemsPerWeek = parseInt(global.itemsPerWeek.value);
        cnf.weeksRuntime = parseInt(global.runtime.value);

        valid = true;
    };

    return valid;
};