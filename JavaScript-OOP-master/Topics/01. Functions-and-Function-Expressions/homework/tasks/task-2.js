/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/
'use strict';

function solve() {
    return function findPrimes() {
        function isPrime(num) {
            if (num === 0 || num === 1) {
                return false;
            }
            for (let j = 2; j < num; j += 1) {
                if (num % j === 0) {
                    return false;
                }
            }
            return true;
        }
        let start = +arguments[0];
        let end = +arguments[1];
        let result = [];
        if (isNaN(start) || isNaN(end)) {
            throw new Error();
        } else {
            for (let i = start; i <= end; i += 1) {
                if (isPrime(i)) {
                    result.push(i);
                }
            }
        }
        return result;
    }
}



module.exports = solve;