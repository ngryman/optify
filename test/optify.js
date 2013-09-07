/*!
 * optify
 * Copyright (c) 2013 Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */

'use strict';

var optify = require('..'),
	chai = require('chai');

chai.should();

describe('optify', function() {
	it('should build a combination matrix from a set of options values', function() {
		var matrix = optify({ 1: 1, 2: 1, 3: 1 }), i = 0;
		matrix.should.have.lengthOf(8);
		matrix[i++].should.eql({ 1: 1,         2: 1,         3: 1 });
		matrix[i++].should.eql({ 1: undefined, 2: 1,         3: 1 });
		matrix[i++].should.eql({ 1: 1,         2: undefined, 3: 1 });
		matrix[i++].should.eql({ 1: undefined, 2: undefined, 3: 1 });
		matrix[i++].should.eql({ 1: 1,         2: 1,         3: undefined });
		matrix[i++].should.eql({ 1: undefined, 2: 1,         3: undefined });
		matrix[i++].should.eql({ 1: 1,         2: undefined, 3: undefined });
		matrix[i++].should.eql({ 1: undefined, 2: undefined, 3: undefined });
	});

	it('should substitute undefined value with given one', function() {
		var matrix = optify({ 1: 1, 2: 1, 3: 1 }, 0), i = 0;
		matrix.should.have.lengthOf(8);
		matrix[i++].should.eql({ 1: 1, 2: 1, 3: 1 });
		matrix[i++].should.eql({ 1: 0, 2: 1, 3: 1 });
		matrix[i++].should.eql({ 1: 1, 2: 0, 3: 1 });
		matrix[i++].should.eql({ 1: 0, 2: 0, 3: 1 });
		matrix[i++].should.eql({ 1: 1, 2: 1, 3: 0 });
		matrix[i++].should.eql({ 1: 0, 2: 1, 3: 0 });
		matrix[i++].should.eql({ 1: 1, 2: 0, 3: 0 });
		matrix[i++].should.eql({ 1: 0, 2: 0, 3: 0 });
	});

	it('should map the result to a given function', function() {
		var matrix = [
			{ 1: 1,         2: 1,         3: 1 },
			{ 1: undefined, 2: 1,         3: 1 },
			{ 1: 1,         2: undefined, 3: 1 },
			{ 1: undefined, 2: undefined, 3: 1 },
			{ 1: 1,         2: 1,         3: undefined },
			{ 1: undefined, 2: 1,         3: undefined },
			{ 1: 1,         2: undefined, 3: undefined },
			{ 1: undefined, 2: undefined, 3: undefined }
		], called = 0;
		optify({ 1: 1, 2: 1, 3: 1 }, function(opts, i) {
			called++;
			opts.should.be.an('object');
			opts.should.eql(matrix[i]);
		});
		called.should.equal(8);
	});

	it('should map the result to a given function with a given undefined value', function() {
		var matrix = [
			{ 1: 1, 2: 1, 3: 1 },
			{ 1: 0, 2: 1, 3: 1 },
			{ 1: 1, 2: 0, 3: 1 },
			{ 1: 0, 2: 0, 3: 1 },
			{ 1: 1, 2: 1, 3: 0 },
			{ 1: 0, 2: 1, 3: 0 },
			{ 1: 1, 2: 0, 3: 0 },
			{ 1: 0, 2: 0, 3: 0 }
		], called = 0;
		optify({ 1: 1, 2: 1, 3: 1 }, 0, function(opts, i) {
			called++;
			opts.should.be.an('object');
			opts.should.eql(matrix[i]);
		});
		called.should.equal(8);
	});

	it('should accept a set of undefined values', function() {
		var matrix = optify({ 1: 1, 2: 1, 3: 1 }, { 1: 42, 2: 1337, 3: true }), i = 0;
		matrix.should.have.lengthOf(8);
		matrix[i++].should.eql({ 1: 1,  2: 1,    3: 1    });
		matrix[i++].should.eql({ 1: 42, 2: 1,    3: 1    });
		matrix[i++].should.eql({ 1: 1,  2: 1337, 3: 1    });
		matrix[i++].should.eql({ 1: 42, 2: 1337, 3: 1    });
		matrix[i++].should.eql({ 1: 1,  2: 1,    3: true });
		matrix[i++].should.eql({ 1: 42, 2: 1,    3: true });
		matrix[i++].should.eql({ 1: 1,  2: 1337, 3: true });
		matrix[i++].should.eql({ 1: 42, 2: 1337, 3: true });
	});

	it('should accept a set of undefined values', function() {
		var matrix = optify({ 1: 1, 2: 1, 3: 1 }, { 1: 42, 2: 1337, 3: true }), i = 0;
		matrix.should.have.lengthOf(8);
		matrix[i++].should.eql({ 1: 1,  2: 1,    3: 1    });
		matrix[i++].should.eql({ 1: 42, 2: 1,    3: 1    });
		matrix[i++].should.eql({ 1: 1,  2: 1337, 3: 1    });
		matrix[i++].should.eql({ 1: 42, 2: 1337, 3: 1    });
		matrix[i++].should.eql({ 1: 1,  2: 1,    3: true });
		matrix[i++].should.eql({ 1: 42, 2: 1,    3: true });
		matrix[i++].should.eql({ 1: 1,  2: 1337, 3: true });
		matrix[i++].should.eql({ 1: 42, 2: 1337, 3: true });
	});
});