const get = require("./get.js");
const defaultToObject = require("./defaultToObject.js");

/**
 * Get value at {@link path} in {@link source} and ensure it's a plain old object.
 * @param {Object|Array} source Where to get the value from.
 * @param {String} path The path of the value.
 * @return {Object} The value at {@link path} if it is a plain old object; {} otherwise.
 */
function getAsObject (source, path) {
	return defaultToObject(get(source, path));
}

module.exports = getAsObject;