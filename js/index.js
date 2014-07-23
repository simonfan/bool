//     Bool
//     (c) simonfan
//     Bool is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Bool
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');



	/**
	 * Single condition and single value.
	 *
	 * @param  {[type]} condition [description]
	 * @param  {[type]} value     [description]
	 * @return {[type]}           [description]
	 */
	function boolSingleValue(condition, value) {

		if (_.isRegExp(condition)) {
			// regular expression condition
			return condition.test(value);

		} else if (_.isFunction(condition)) {
			// function condition
			return condition(value);

		} else {
			// string, number, boolean
			return condition === value;
		}

	}


	/**
	 * Defines a boolean evaluator.
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	function defBool(options) {

		var conditionLooper = options.conditions || 'any',
			valueLooper     = options.values     || 'any';

		/**
		 * Single condition, either single value or multiple values.
		 *
		 * @param  {[type]} condition [description]
		 * @param  {[type]} values    [description]
		 * @return {[type]}           [description]
		 */
		function boolSingleCondition(condition, values) {

			if (_.isArray(values)) {

				return _[valueLooper](values, function (v) {
					return boolSingleValue(condition, v);
				});

			} else {
				return boolSingleValue(condition, values);
			}

		}

		/**
		 * Multiple conditions and multiple values.
		 *
		 * @param  {[type]} conditions [description]
		 * @param  {[type]} values     [description]
		 * @return {[type]}            [description]
		 */
		return _.curry(function bool(conditions, values) {

			if (_.isArray(conditions)) {

				// list of possibilities
				return _[conditionLooper](conditions, function (c) {
					return boolSingleCondition(c, values);
				});

			} else {
				// single possibility
				return boolSingleCondition(conditions, values);
			}

		});
	}



	exports = module.exports = defBool({
		conditions: 'any',
		values    : 'any'
	});

	exports.def = defBool;
});
