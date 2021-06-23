let MONTHS = {
		0: "JAN/JAN",
		1: "FEV/FEB",
		2: "MAR/MAR",
		3: "ABR/APR",
		4: "MAI/MAY",
		5: "JUN/JUN",
		6: "JUL/JUL",
		7: "AGO/AUG",
		8: "SET/SEP",
		9: "OUT/OCT",
		10: "NOV/NOV",
		11: "DEZ/DEC"
	};

export function passportdate(date) {
	let dateobj = new Date(date);
	return ((dateobj.getUTCDate()) + "").padStart(2, "0") + " " + MONTHS[dateobj.getUTCMonth()] + " " + dateobj.getUTCFullYear();
}

export function isodate(date) {
	let dateobj = new Date(date);
	return dateobj.getUTCFullYear() + "" + ((dateobj.getUTCMonth() + 1) + "").padStart(2, "0") + "" + "" + (dateobj.getUTCDate() + "").padStart(2, "0")
}
