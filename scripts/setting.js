/**
 * @file: setting.js
 * 
 * validate-form
 */

// SETTING FORM
let setting = document.getElementById("target");
let form = document.getElementById("hidden-setting");

setting.addEventListener("click", function () {
    form.classList.toggle("hidden");
});


const weeks = document.getElementById('weeks-setting');
const weeklyProduction = document.getElementById('weekly-production-setting');
const weeklyDuration = document.getElementById('weekly-duration-setting');
const checkThreshold= document.getElementById('check-threshold-setting');
const dateOffset = document.getElementById('date-offset-setting');


function validation() {
    cancel();

    controlNumber(weeks, 1, 10, 1);
    controlNumber(weeklyProduction, 1, 5, 2);
    controlNumber(weeklyDuration, 1, 10, 3);
    controlNumber(checkThreshold, 1, 10, 4);
    controlNumber(dateOffset, 1, 10, 6);

};

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
}

function cancel () {
    let title = document.querySelectorAll('h5');
    title.forEach(element => {
        element.textContent = "";
    });
}

function dateControll(element, mag, min, child) {
    let date = element.date()
    
}

const button = document.getElementById('submit');

button.addEventListener('click', validation);