/**
 * @file: setting.js
 * 
 * validate-form
 */

import { config as cnf } from "./config.mjs";

// SETTING FORM
let settingsSubmit = document.getElementById("submit");



let pattern = /^[0-9]{1,2}$/;// regex for numbers

// Form fields
let daysInWeek = document.getElementById("days-in-week-setting")
let startingOfset = document.getElementById("starting-offset-setting");
let shelfLife = document.getElementById("shelf-life-setting");
let itemsPerWeek = document.getElementById("items-per-week-setting");
let runtime = document.getElementById("runtime-setting");

function controlNumber(element, minore, maggiore, child) {
    if ((/\D|^0/gi.test(element.value))) {
        document.querySelector(`#form div:nth-of-type(${child}) h5`).textContent = 'Devi inserire un numero compreso tra ' + minore + ' e ' + maggiore;
    }
    else if (element.value <= minore) {
        document.querySelector(`#form div:nth-of-type(${child}) h5`).textContent = 'Devi inserire un numero compreso tra ' + minore + ' e ' + maggiore;
    }
    else if (element.value > maggiore) {
        document.querySelector(`#form div:nth-of-type(${child}) h5`).textContent = 'Devi inserire un numero minore di ' + maggiore;
    }
    else {
        alert('your imput is ok');
    }
}

/**
 * Function that checks all inputs for a valid input and returns true
 * if all inputs are valid otherwise notifies the user with text in the dom
 */
let validate = () => {
    let valid = false;
    // hide all output texts in the form on submit
    document.querySelector("input + h5").style.visibility = "hidden";
    // check for the days in a week
    if (!/^[1-7]{1}$/.test(daysInWeek.value) || daysInWeek.value == "") {
        let ouputText = document.querySelector("#days-in-week-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 1 and 7)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the starting offset
    if (!/^[0-9]{1,2}$/.test(startingOfset.value) || startingOfset.value > 30 || startingOfset.value == "") {
        let ouputText = document.querySelector("#starting-offset-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 0 and 30)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the shelf life
    if (!/^[1-9]{1,2}$/.test(shelfLife.value) || shelfLife.value > 30 || shelfLife.value == "") {
        let ouputText = document.querySelector("#shelf-life-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 0 and 30)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the items per week
    if (!/^[1-9]{1,2}$/.test(itemsPerWeek.value) || itemsPerWeek.value > 10 || itemsPerWeek.value == "") {
        let ouputText = document.querySelector("#items-per-week-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 1 and 10)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
    // check for the runtime
    if (!/^[1-9]{1,2}$/.test(runtime.value) || runtime.value > 20 || runtime.value == "") {
        let ouputText = document.querySelector("#runtime-setting + h5");
        ouputText.innerText = "Not a valid number (must be betwen 1 and 20)";
        ouputText.style.visibility = "visible";
        valid = false;
    }
}


settingsSubmit.addEventListener("click", validate);

// button.addEventListener('click', validation);