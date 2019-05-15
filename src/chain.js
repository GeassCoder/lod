const defaultToArray = require("./defaultToArray.js");
const defaultToObject = require("./defaultToObject.js");
const defaultToString = require("./defaultToString.js");
const get = require("./get.js");
const groupBy = require("./groupBy.js");
const pick = require("./pick.js");
const uniqBy = require("./uniqBy.js");

module.exports = function chain (value) {
    let val = value;

    function wrap (fn) {
        return (...args) => {
            val = fn(val, ...args);
            return result;
        };
    }

    let result = {
        defaultToArray: wrap(defaultToArray),
        defaultToObject: wrap(defaultToObject),
        defaultToString: wrap(defaultToString),
        get: wrap(get),
        groupBy: wrap(groupBy),
        pick: wrap(pick),
        uniqBy: wrap(uniqBy),
        invoke: (fn, ...args) => {
            val = fn(...args);
            return result;
        },
        value: () => val
    }

    return result;
};