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

// Changes the property 'createdBy' from user id to displayName
export const updateDataWithUsersName = (userCollection, doc) => {
	const hasUpdatedBy = doc.hasOwnProperty('updatedBy');
	if (hasUpdatedBy) {
		const idUser = user => {
			return user.id === doc.updatedBy;
		};
		const user = userCollection.find(idUser);
		const updatedByDoc = {
			...doc,
			createdBy: user.displayName,
			updatedBy: user.displayName,
		};

		return updatedByDoc;
	}

	if (!hasUpdatedBy) {
		const idUser = user => {
			return user.id === doc.createdBy;
		};
		const user = userCollection.find(idUser);
		const createdByDoc = {
			...doc,
			createdBy: user.displayName,
		};

		return createdByDoc;
	}
};
