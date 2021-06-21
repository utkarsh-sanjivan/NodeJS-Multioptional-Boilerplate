/**
 * Create an object composed of the picked object properties
 * @param object - {Object} object from which the keys are to be picked
 * @param keys - {Array} keys that are to be picked
 * @returns {Object} object with keys that are picked
 */
const pick = (object: any, keys: any) => {
	return keys.reduce((obj: any, key: any) => {
		const originalKey = Array.isArray(key) ? key[0] : key;
		const newKey = Array.isArray(key) ? key[1] : key;
		if (object && Object.prototype.hasOwnProperty.call(object, originalKey)) {
			// eslint-disable-next-line no-param-reassign
			obj[newKey] = object[originalKey];
		}
		return obj;
	}, {});
};

export default pick;
