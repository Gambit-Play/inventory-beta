// Convert an array to an object
export const convertArrayToObject = (array, key) => {
	const initialValue = {};

	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

// Converts a string to a number with 2 decimals
export const convertToFloat = input => {
	const formattedNumber = parseFloat(parseFloat(input).toFixed(2));

	if (isNaN(formattedNumber)) {
		return 0;
	}

	return formattedNumber;
};
