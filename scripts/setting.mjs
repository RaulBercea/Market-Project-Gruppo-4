/**
 * @file: setting.js
 * 
 * validate-form
 */

import { config as cnf } from "./config.mjs";
import  * as int  from "./main.mjs";

// SETTING FORM
let setting = document.getElementById("target");
let form = document.getElementById("hidden-setting");

setting.addEventListener("click", function () {
    form.classList.toggle("hidden");
});


const weeks = document.getElementById('weeks-setting');
const weeklyProduction = document.getElementById('weekly-products-setting');

function validation() {
    controlNumber(weeks, 1, 10, 1);
    controlNumber(weeklyProduction, 1, 5, 2);
}

function controlNumber(element, minore, maggiore, child) {
    if((/\D|^0/gi.test(element.value))) {
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

const button = document.getElementById('submit');

function getData(){
    validation();
    let weeklyProducts = document.getElementById("weekly-products-setting").value;
    let weeksDuration = document.getElementById("weekly-duration-setting").value;
    let weeksRuntime = document.getElementById("weeks-setting").value;
    let daysOffset = document.getElementById("date-offset-setting").value;
    let startDate = document.getElementById("start-date-setting").valueAsDate;
    cnf.newItemsPerWeek = weeklyProducts;
    cnf.daysInWeek = weeksDuration;
    cnf.weeksRuntime = weeksRuntime;
    cnf.startingOffset = daysOffset;
    cnf.startDate = startDate;
    console.log(startDate);
    console.log(cnf);
    int.init();
    
}

button.addEventListener('click', getData);
