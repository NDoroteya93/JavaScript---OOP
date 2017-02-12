'use strict';

// Duck Typung 

function outerFunction() {
    // store arguments into a separated variable
    let argsOuter = arguments;

    function innerFunction() {
        // args is an array-like object
        let even = Array.prototype.map.call(argsOuter, function(item) {
            // do something with argsOuter
        });
    }
}

/// II . push(item1, item2,... itemN)
// In ES5 it's solved with .apply()

let fruits = ['banana'];
let moreFruits = ['apple', 'orange'];

Array.prototype.push.apply(fruits, moreFruits);
console.log(fruits); // => ['banana', 'apple', 'orange']

// Three dots ( The rest Operators)

function countArguments(...args) {
    return this.length;
}

// get the number of argumennts
countArguments('welcome', 'to', 'Earth'); // => 3  
// destructure an array
let otherSeasons, autumun;
[autumun, ...otherSeasons] = cold;
otherSeasons // =>['winter']