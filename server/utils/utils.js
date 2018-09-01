/**
 * Obtain a time stamp
 * @return {string} Time stamp in this format: '2018-08-15 01:04:35'
 */
function timeStamp() {
	const d = new Date();

	let month = `${(d.getMonth() + 1)}`;
	let day = `${d.getDate()}`;
	let year = d.getFullYear();
	let hours = `${d.getHours()}`;
	let minutes = `${d.getMinutes()}`;
	let seconds = `${d.getSeconds()}`;

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;
	if (hours.length < 2) hours = `0${hours}`;
	if (minutes.length < 2) minutes = `0${minutes}`;
	if (seconds.length < 2) seconds = `0${seconds}`;

	let date = [year, month, day].join('-');
	let time = [hours, minutes, seconds].join(':');

	return `${date} ${time}`;
}


/**
 * Sort array of objects by value of specified property. Return the same array
 *
 * @example
 * let obj = [ { id: 1, name: 'bbbb' }, { id: 2, name: 'dddd' }, { id: 3, name: 'cccc' } ];
 * console.log( sortArrayOfObjectsByValueOfProperty(obj, 'name') ); // [ {id: 1, name: "bbbb"}, {id: 3, name: "cccc"}, {id: 2, name: "dddd"} ]
 *
 * @param  {Array.<Object>} obj      	An array of object
 * @param  {string} 		property 	Property name to sort by value
 * @return {Array.<Object>}          	Array ob ojects
 */
function sortArrayOfObjectsByValueOfProperty(arr, property) {
	return arr.sort( (a, b) => a[property].localeCompare(b[property]) );
}

module.exports = { timeStamp, sortArrayOfObjectsByValueOfProperty };
