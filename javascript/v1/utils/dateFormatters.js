function getDateString() {
	const dateObject = new Date();
	const month = dateObject.getMonth();
	const date = dateObject.getDate();
	return `${dateObject.getFullYear()}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`;
}

module.exports = {
	getDateString,
};
