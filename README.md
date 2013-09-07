# optify <sup>0.0.4</sup>

[![Build Status](https://travis-ci.org/ngryman/optify.png)](https://travis-ci.org/ngryman/optify)
[![Dependency Status](https://gemnasium.com/ngryman/optify.png)](https://gemnasium.com/ngryman/optify)

Generates a combination matrix from a set key/value pairs.

## Motivations

This can be pretty useful for testing all the possible combination of an `options` parameter.<br>
There are probably other usages. Tell me :)

## Installation

```bash
npm install optify
```

You can also install it via Jam or Bower.

## API

### `optify(options)`

Returns a `matrix` of all combinations.

```javascript
var matrix = optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
});

// produces a the following matrix:
matrix = [
	{ firstName: 'Nicolas', lastName: 'Gryman',  birthDate: '1984-01-17' },
	{ firstName: undefined, lastName: 'Gryman',  birthDate: '1984-01-17' },
	{ firstName: 'Nicolas', lastName: undefined, birthDate: '1984-01-17' },
	{ firstName: undefined, lastName: undefined, birthDate: '1984-01-17' },
	{ firstName: 'Nicolas', lastName: 'Gryman',  birthDate: undefined    },
	{ firstName: undefined, lastName: 'Gryman',  birthDate: undefined    },
	{ firstName: 'Nicolas', lastName: undefined, birthDate: undefined    },
	{ firstName: undefined, lastName: undefined, birthDate: undefined    }
];
```

### `optify(options, undefValue)`

Substitute `undefined` by the given value.

With a constant `undefValue`:

```javascript
var matrix = optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
}, 'wombat');

// produces a the following matrix:
matrix = [
	{ firstName: 'Nicolas', lastName: 'Gryman',  birthDate: '1984-01-17' },
	{ firstName: 'wombat',  lastName: 'Gryman',  birthDate: '1984-01-17' },
	{ firstName: 'Nicolas', lastName: 'wombat',  birthDate: '1984-01-17' },
	{ firstName: 'wombat',  lastName: 'wombat',  birthDate: '1984-01-17' },
	{ firstName: 'Nicolas', lastName: 'Gryman',  birthDate: 'wombat'     },
	{ firstName: 'wombat',  lastName: 'Gryman',  birthDate: 'wombat'     },
	{ firstName: 'Nicolas', lastName: 'wombat',  birthDate: 'wombat'     },
	{ firstName: 'wombat',  lastName: 'wombat',  birthDate: 'wombat'     }
];
```

With a set of values:

```javascript
var matrix = optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
}, {
	firstName: 'John',
	lastName: 'Doe',
	birthDate: '1337-42-01'
});

// produces a the following matrix:
matrix = [
	{ firstName: 'Nicolas', lastName: 'Gryman',  birthDate: '1984-01-17' },
	{ firstName: 'John',    lastName: 'Gryman',  birthDate: '1984-01-17' },
	{ firstName: 'Nicolas', lastName: 'Doe',     birthDate: '1984-01-17' },
	{ firstName: 'John',    lastName: 'Doe',     birthDate: '1984-01-17' },
	{ firstName: 'Nicolas', lastName: 'Gryman',  birthDate: '1337-42-01' },
	{ firstName: 'John',    lastName: 'Gryman',  birthDate: '1337-42-01' },
	{ firstName: 'Nicolas', lastName: 'Doe',     birthDate: '1337-42-01' },
	{ firstName: 'John',    lastName: 'Doe',     birthDate: '1337-42-01' }
];
```

### `optify(options, fn)`

Maps `matrix` with the given `fn` function. `fn` is invoked for each combination.

```javascript
optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
}, function(opt, i) {
	console.log('[' + i + '] ' + opt);
});

// outputs:
// [0] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [1] { 'firstName': undefined, 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [2] { 'firstName': 'Nicolas', 'lastName': undefined, 'birthDate': '1984-01-17' }
// [3] { 'firstName': undefined, 'lastName': undefined, 'birthDate': '1984-01-17' }
// [4] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': undefined }
// [5] { 'firstName': undefined, 'lastName': 'Gryman', 'birthDate': undefined }
// [6] { 'firstName': 'Nicolas', 'lastName': undefined, 'birthDate': undefined }
// [7] { 'firstName': undefined, 'lastName': undefined, 'birthDate': undefined }
```

### `optify(options, undefValue, fn)`

Maps `matrix` with the given `fn` function, accepting a `undefined` substitution.

```javascript
optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
}, 'wombat', function(opt, i) {
	console.log('[' + i + '] ' + opt);
});

// outputs:
// [0] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [1] { 'firstName': 'wombat', 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [2] { 'firstName': 'Nicolas', 'lastName': 'wombat', 'birthDate': '1984-01-17' }
// [3] { 'firstName': 'wombat', 'lastName': 'wombat', 'birthDate': '1984-01-17' }
// [4] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': 'wombat' }
// [5] { 'firstName': 'wombat', 'lastName': 'Gryman', 'birthDate': 'wombat' }
// [6] { 'firstName': 'Nicolas', 'lastName': 'wombat', 'birthDate': 'wombat' }
// [7] { 'firstName': 'wombat', 'lastName': 'wombat', 'birthDate': 'wombat' }
```

### `optify(options, fn, done)`

Supports asynchronous `fn`. Parallelize each invocation and invokes `done` when finished.
`done` receives the `matrix`.

```javascript
optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
}, function(opt, i, done) {
	someAsyncJob(function() {
		console.log('[' + i + '] ' + opt);
		done();
	});
}, function() {
	console.log('done!');
});

// outputs (order not guaranteed):
// [0] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [1] { 'firstName': undefined, 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [2] { 'firstName': 'Nicolas', 'lastName': undefined, 'birthDate': '1984-01-17' }
// [3] { 'firstName': undefined, 'lastName': undefined, 'birthDate': '1984-01-17' }
// [4] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': undefined }
// [5] { 'firstName': undefined, 'lastName': 'Gryman', 'birthDate': undefined }
// [6] { 'firstName': 'Nicolas', 'lastName': undefined, 'birthDate': undefined }
// [7] { 'firstName': undefined, 'lastName': undefined, 'birthDate': undefined }
// done!
```

### `optify(options, undefValue, fn, done)`

Supports asynchronous `fn`, accepting a `undefined` substitution.

```javascript
optify({
	firstName: 'Nicolas',
	lastName: 'Gryman',
	birthDate: '1984-01-17'
}, 'wombat', function(opt, i, done) {
	someAsyncJob(function() {
		console.log('[' + i + '] ' + opt);
		done();
	});
}, function() {
	console.log('done!');
});

// outputs (order not guaranteed):
// [0] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [1] { 'firstName': 'wombat', 'lastName': 'Gryman', 'birthDate': '1984-01-17' }
// [2] { 'firstName': 'Nicolas', 'lastName': 'wombat', 'birthDate': '1984-01-17' }
// [3] { 'firstName': 'wombat', 'lastName': 'wombat', 'birthDate': '1984-01-17' }
// [4] { 'firstName': 'Nicolas', 'lastName': 'Gryman', 'birthDate': 'wombat' }
// [5] { 'firstName': 'wombat', 'lastName': 'Gryman', 'birthDate': 'wombat' }
// [6] { 'firstName': 'Nicolas', 'lastName': 'wombat', 'birthDate': 'wombat' }
// [7] { 'firstName': 'wombat', 'lastName': 'wombat', 'birthDate': 'wombat' }
// done!
```
