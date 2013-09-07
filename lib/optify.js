/*!
 * optify
 * Copyright (c) 2013 Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */

'use strict';

var optify = function(options, undefValue, callback) {
	var powerMap = [],
		matrix,
		matrixLength,
		opt, i = 0;

	// arguments jungling
	if ('function' == typeof undefValue) {
		callback = undefValue;
		undefValue = undefined;
	}

	// invalid options
	if (null == options) throw new Error('options is null or undefined');

	// here we will use some binary math
	// we will consider each option as a bit, either to the given value or the null value
	// so we need to give it a position in our bitstream
	for (opt in options) {
		if (!options.hasOwnProperty(opt)) continue;
		powerMap[opt] = Math.pow(2, i++);
	}

	// no properties, do nothing
	if (0 === i) return options;

	// there is 2^length-1 possibilities
	matrixLength = Math.pow(2, i);
	matrix = new Array(matrixLength);

	// produce the matrix of all possibilities by, again using binary math
	// we iterate through each possibility counting from 0 to 2^length
	// we toggle each bit following its position
	for (i = 0; i < matrixLength; i++) {
		matrix[i] = {};
		for (opt in options) {
			if (!options.hasOwnProperty(opt)) continue;
			var off = ((i / powerMap[opt]) << 0) % 2;
			matrix[i][opt] = off ? undefValue : options[opt];
		}
		if (callback) callback(matrix[i], i);
	}

	return matrix;
};

module.exports = optify;