'use strict';
// duck typing 

function outerFunction() {
    // store arguments into a separated variable 
    let argsOuter = arguments;

    function innerFunction() {
        // args in array-like object

        let even = Array.prototype.map.call(argsOuter, function(item) {
            // do something with argsOuter
        })
    }
}

// for instance .push(item1, item2, .... itemN)
// with ES5 it's solved with .apply()

let fruits = ['banana', 'orange'];
let moreFruits = ['apple', 'strawberry'];
Array.prototype.push.apply(fruits, moreFruits);
console.log(fruits); // output ==>[ 'banana', 'orange', 'apple', 'strawberry' ]

// Three dots

function countArguments(...args) {
    return args.length;
}

// get the number of arguments
console.log(countArguments('welcome', 'to', 'Earth')); // 3
// destructure an array

// let otherSeasons, autumn;
// [autumn, ...otherSeasons] = cold;
// console.log(otherSeasons);

// Thre spread operator 
let cold = ['autumn', 'winter'];
let warm = ['spring', 'summer'];
// constructor an array 
console.log([...cold, ...warm]); // => [ 'autumn', 'winter', 'spring', 'summer' ]
// function arguments from array 
cold.push(...warm);
console.log(cold); // => [ 'autumn', 'winter', 'spring', 'summer' ]

// Rest operators 
// inner function filertNumbers() wants to access arguments from its outer function sumOnlyNumbers()

// to access arguments of sumOnlyNumbers() inside filterNumbers(), create temporary variable args

function sumOnlyNumbers() {
    let args = arguments;
    let numbers = filterNumbers();
    return numbers.reduce((sum, element) => sum + element);

    function filterNumbers() {
        return Array.prototype.filter.call(args,
            element => typeof element === 'number'
        );
    }
}

console.log(sumOnlyNumbers(1, 'Hello', 5, false)); // => 6   

// Rest parameters ...args 

function sumOnlyNumbers2(...args) {
    let numbers = filterNumbers();
    return numbers.reduce((sum, element) => sum + element);

    function filertNumbers() {
        return args.filter(element => typeof element === 'number');
    }
}

console.log(sumOnlyNumbers(10, 'Hello', 15, false)); // => 25

// Selective rest parameters

function filter(type, ...items) {
    return items.filter(item => typeof item === type);
}

console.log(filter('boolean', true, 0, false)); // => [ true, false ]
console.log(filter('number', false, 4, 'Welcome', 7)); // => [4,7]

// Arrow function case
// does not define arguments object in its body, but access the one from the enclosing scope

(function() {
    let outerArguments = arguments;
    const concat = (...items) => {
        console.log(arguments === outerArguments); // => true
        return items.reduce((result, item) => result + item, '');
    }; // => 15nine
    console.log(concat(1, 5, 'nine'));
})();


// Spread operator configures the constructor invocationa arguments from an array, which is not possible directly when using .apply()

class King {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }

    getDescription() {
        return `${this.name} leads ${this.country}`;
    }
}

let details = ['Alexander the Great', 'Greece'];
let Alexander = new King(...details);
console.log(Alexander.getDescription()); // => Alexander the Great leads Greece

// removing from array existing elements

let numbers = [1, 2];
let evenNumbers = [4, 8];
const zero = 0;
numbers.splice(0, 2, ...evenNumbers, zero);
console.log(numbers); // => [ 4, 8, 0 ]                                                                                                                                                                                                                                                                                                                    

// Improved array manipulation
//  1. Array construction

// Create an array from another array
let initial = [0, 1];
let numbers1 = [...initial, 5, 7];
console.log(numbers1); // => [ 0, 1, 5, 7 ]
let numbers2 = [4, 8, ...initial];
console.log(numbers2); // => [ 4, 8, 0, 1 ]

// Concatenate 2 or more arrays 

let odds = [1, 5, 7];
let evens = [4, 6, 8];
let all = [...odds, ...evens];
console.log(all); // => [ 1, 5, 7, 4, 6, 8 ]

// Clone an array instance:
let words = ['Hi', 'Hello', 'Good day'];
let otherWords = [...words];
console.log(otherWords); //= > [ 'Hi', 'Hello', 'Good day' ]
console.log(otherWords === words); // => false

// Array destructure
let seasons = ['winter', 'spring', 'summer', 'autumn'];
let coldSeason, otherSeasons;
[coldSeason, ...otherSeasons] = seasons;

// extract the first element 'winter' into coldSeason and the rest of elements into otherSeasons array
console.log(coldSeason); // => winter
console.log(otherSeasons); // [ 'spring', 'summer', 'autumn' ]