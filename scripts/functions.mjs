/**
 * @file functions.mjs
 * @authors Gabriele Bovolenta, Raul Bercea, Dario Di Maria, Pietro Milanese, Joele Melchiorre
 * File with our main utility functions.
 *
 * This file is used to:
 * - generate items of a supermarket
 * - update those items based on various characteristics
 */

//#region ITEM GENERATION

let id = 1;

/**
 * Returns a global id variable and increments it by 1
 * @returns {number} the global id variable before incrementing it
 */
let uniqueId = () => id++;

/**
 * Picks a random item name from an array of item names and returns it
 * @param {object} itemNames - names of various possible items
 * @returns {string} the randomly selected item name
 */
let generateName = itemNames => {
	let randomIndex = Math.floor(Math.random() * itemNames.length);
	return itemNames[randomIndex];
};

/**
 * Generates a random date betweeen two date parameters
 * @param {Date} start - starting point for the generation of the date (no dates before)
 * @param {Date} end - ending point for the generation of the date (no dates after)
 * @returns {Date} a random date bewteen start and end
 */
let generateExpiry = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//new Date(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).setHours(0, 0, 0, 0));
//If comparing timestamps when checking if a product is expired, this could be considered a possible bugfix

/**
 * Generates an item with random data and returns it
 * The item structure is as follows: { id, name, expiry, checks, state }
 * @param {number} numberOfItems - the number of new item objects to generate
 * @param {object} startConfig - an object containing all the parameters necessary for the generation of an item
 * @param {object} startConfig.itemNames - a list of item names to be selected from randomly
 * @param {Date} startConfig.startDate - the date that starts the range for a random date generation (item.expiry)
 * @param {Date} startConfig.endDate - the date that ends the range for a random date generation (item.expiry)
 * @param {Date} startConfig.currentDate - the current date to be used when updating the state of the item
 * @param {number} startConfig.shelfLife - the number of weeks an item can be on a shelf before it is considered old
 * @returns {object} an array of item objects filled with data as per defined by its structure
 */
export let generateItems = (numberOfItems, startConfig) => {
	let weeklyItems = [];

	for (let i = 0; i < numberOfItems; i++) {
		let item = {
			id: uniqueId(),
			name: generateName(startConfig.itemNames),
			expiry: generateExpiry(startConfig.startDate, startConfig.endDate),
			checks: 0,
			state: "",
		};
		updateState(item, startConfig.currentDate, startConfig.shelfLife);
		weeklyItems.push(item);
	}

	return weeklyItems;
};

//#endregion

//#region ITEM MANIPULATION

/**
 * Updates the state of an item object based on its expiry date and shelf life
 * It's new if it's not expired and has 0 checks (checks happen once a week)
 * It's expired if its expiry date is less than the current date
 * It's old if its checks are greater than the shelf life of an item
 * Otherwise it's considered valid
 * @param {object} item - the item object to update
 * @param {Date} currentDate - the current date used to check if an item is expired
 * @param {number} shelfLife - the shelf life of an item used to check if it's old
 */
export let updateState = (item, currentDate, shelfLife) => {
	if (item.checks === 0 && item.expiry > currentDate) {
		item.state = "New";
		return;
	}

	if (item.expiry < currentDate) {
		item.state = "Expired";
		return;
	}

	if (item.checks > shelfLife) {
		item.state = "Old";
		return;
	}

	item.state = "Valid";
};

/**
 * Updates the checks property of an item object incrementing it by one (should be called every week)
 * @param {object} item - the item object to update
 * @param {number} item.checks - the number of checks (number of weeks on a shelf) an item has
 */
export let updateChecks = item => {
	item.checks++;
};

//#endregion

//#region VARIABLE FORMATTING

/**
 * Formats any date into a user defined format (eg. 02-APR-2022)
 * @param {Date} date - the date object to format
 * @param {object} cnf - the config object containing the properties used to format the date
 * @param {string} cnf.dayFormat - used to format the day ("2-digit", "numeric")
 * @param {string} cnf.monthFormat - used to format the month ("long" "narrow" "numeric" "short")
 * @param {string} cnf.yearFormat - used to format the year ("2-digit", "numeric")
 * @param {string} cnf.locale - the locale used for the date: https://www.venea.net/web/culture_code
 * @returns {string} the string representation of the formatted date
 */
export let formatDate = (date, cnf) => {
	let day = date.toLocaleDateString(cnf.locale, { day: cnf.dayFormat });
	let month = date.toLocaleDateString(cnf.locale, { month: cnf.monthFormat });
	let year = date.toLocaleDateString(cnf.locale, { year: cnf.yearFormat });

	let formattedDate = `${day}-${month.toUpperCase()}-${year}`;

	return formattedDate;
};


//#endregion

//#region UTILITIES

/**
 * Checks if an item has a state of either "New" or "Valid"
 * @param {object} item - the item object to check
 * @returns {boolean} true if item.state is "New" or "Valid", false otherwise
 */
export let checkItem = item => item.state === "New" || item.state === "Valid";

/**
 * Adds any amount of days to a date object and returns the result
 * @param {Date} - the date object to increment
 * @param {number} - the number of days to increment the date by
 * @returns {Date} the date after the days have been added
 */
export let addDays = (date, days) => {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

//#endregion
