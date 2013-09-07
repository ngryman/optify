# optify <sup>0.0.1</sup>

[![Build Status](https://travis-ci.org/ngryman/optify.png)](https://travis-ci.org/ngryman/optify)
[![Dependency Status](https://gemnasium.com/ngryman/optify.png)](https://gemnasium.com/ngryman/optify)

Generates a combination matrix from a set of options key/value pairs.

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

### `optify(options, callback)`

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

### `optify(options, undefValue, callback)`

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
