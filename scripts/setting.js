/**
 * @file: setting.js
 * 
 * validate-form
 */

// SETTING FORM

/**
 * Function setting form
 */
function settingForm() {
    let setting = document.getElementById("target");
    let form = document.getElementById("hidden-setting");

    setting.addEventListener("click", function () {
    form.classList.toggle("hidden");
    });    
};

settingForm();

// Variable of the html
const weeks = document.getElementById('weeks-setting');
const weeklyProduction = document.getElementById('weekly-production-setting');
const weeklyDuration = document.getElementById('weekly-duration-setting');
const checkThreshold= document.getElementById('check-threshold-setting');
const dateOffset = document.getElementById('date-offset-setting');

/**
 * Function validation form
 * @param {element}  
 * @param {minore}  
 * @param {maggiore } 
 * @param {child} 
 */
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
};

/**
 * Function cancel
 * Reset all the h5 in the form
 */
function cancel () {
    let title = document.querySelectorAll('h5');
    title.forEach(element => {
        element.textContent = "";
    });
};


/**
 * Function validation
 */
function validation() {
    cancel();

    controlNumber(weeks, 1, 10, 1);
    controlNumber(weeklyProduction, 1, 5, 2);
    controlNumber(weeklyDuration, 1, 10, 3);
    controlNumber(checkThreshold, 1, 10, 4);
    controlNumber(dateOffset, 1, 10, 6);

};

const button = document.getElementById('submit');

button.addEventListener('click', validation);