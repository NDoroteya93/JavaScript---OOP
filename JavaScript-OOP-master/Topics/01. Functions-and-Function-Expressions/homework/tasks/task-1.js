/* Task Description */
/*
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number

*/
'use strict';

function solve() {
    let array = arguments[0];

    return function sum(array) {
        if (array === 'undefined') {
            throw new Error();
        }
        if (array.length === 0) {
            return null;
        }
        return array.reduce(function(a, b) {
            b = +b;
            if (isNaN(b)) {
                throw new Error();
            }
            return a + b;
        }, 0);
    }
}

solve();

module.exports = solve;