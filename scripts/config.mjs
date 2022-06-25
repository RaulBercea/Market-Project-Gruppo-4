/**
 * @file config.mjs
 * @authors Nemanja Gajicic, Pietro Milanese, Jacopo Trompeo, Davide Murroni
 * File containing an array of all possible item names.
 *
 * This array of item names can be imported in any file and should be used
 * when generating a random item for the market.
 */

/**
 * @property {number} daysInWeek - the number of days in a week
 * @property {number} startingOffset - K - offset of days used at the beginning of the program
 * @property {number} shelfLife - N - number of weeks an item can be on the shelf before it is considered old
 * @property {number} newItemsPerWeek - M - numbr of new items added each week
 * @property {number} weeksRuntime - X - how many weeks the program will run for
 * @property {string} locale - the locale used for the date: https://www.venea.net/web/culture_code
 * @property {string} dayFormat - used to format the day ("2-digit", "numeric")
 * @property {string} monthFormat - used to format the month ("long" "narrow" "numeric" "short")
 * @property {string} yearFormat - used to format the year ("2-digit", "numeric")
 */
export let config = {
	startDate: new Date(),
	daysInWeek: 6,
	startingOffset: 3,
	shelfLife: 2,
	newItemsPerWeek: 3,
	weeksRuntime: 5,
	locale: "en",
	dayFormat: "2-digit",
	monthFormat: "short",
	yearFormat: "numeric",
};
