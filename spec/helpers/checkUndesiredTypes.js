function isEqual (a, b) {
	// if it's a function
	if ("function" === typeof a) {
		if ("function" !== typeof b) {
			return false;
		}

		a = String(a);
		b = String(b);
	}

	// if it's object or array
	if (a instanceof Object) {
		return JSON.stringify(a) === JSON.stringify(b);
	}

	// if it's primitive
	return a === b;
}

/**
 * @param {Object} options
 * @param {String} options.desiredTypes Types that should not be tested by this function.
 * @param {String} options.fn Method function to be tested.
 * @param {String} options.expectedValue Expected value for the undesired types.
 */
beforeAll(function () {
	this.checkUndesiredTypes = function checkUndesiredTypes (options) {
		const types = {
			"number": [0, 1],
			"string": ["a", "ab"],
			"boolean": [true, false],
			"object": [{}, {a: 1}],
			"array": [[], [1]],
			"undefined": [undefined],
			"null": [null],
			// eslint-disable-next-line no-empty-function
			"function": [function () {}, () => {}],
			// "regex",
			// "set",
			// "map",
			// "weakSet",
			// "weakMap",
			// "symbol"
		};

		let errors = {};

		// loop through all types
		Object.entries(types).forEach(([type, values]) => {

			// only care about undesired types
			if (!options.desiredTypes.includes(type)) {

				// for each undesired type, loop through its values array
				values.forEach(value => {

					// run function with value in array and check its return
					let expectedValue = "$self" === options.expectedValue ? value : options.expectedValue;
					if (!isEqual(options.fn(value), expectedValue)) {
						if (!errors[type]) {
							errors[type] = [];
						}

						// if return is different from expected value, store in errors object
						errors[type].push(value);
					}
				});
			}
		});

		// no error
		if (0 === Object.keys(errors).length) {
			return "";
		}

		// has error
		return "these values of undesired types have errors: " + JSON.stringify(errors);
	};
});