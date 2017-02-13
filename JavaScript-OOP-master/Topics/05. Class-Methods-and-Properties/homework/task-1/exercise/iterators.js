'use strict';

// [Symbolo.iterator]

// Used- defined iterables
let myIterable = {};
myIterable[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};

console.log([...myIterable]); // => [ 1, 2, 3 ]

// Non-well-formated iterables 
// let nonWellFormatedIterable = {};
// nonWellFormatedIterable[Symbol.iterator] = () => 1;
// [...nonWellFormatedIterable]; // TypeError: [] is not a function

// Iterables 
// Data structure can be iterated over are called iteables

// class MySpeacialTree  { 
//     ...
//     [Symbol.iterator](){ 
//         ...
//         return theIterator;
//     }
// }

// The for-of loop 

function createArrayIterator(arr) {
    let index = 0;
    return {
        [Symbol.iterator]() { // protocol: iterable
            return this; // an iterator
        },
        next() { // protocol: iterator

        }
    }
}

// Method iterate returns an iterator, the object itself
const arr = ['red', 'green', 'blue'];
// for (let x of createArrayIterator(arr)) {
//     console.log(x);
// }

// ES6 - Array.prototype.entries() for iterating over [index,element] pairs: 

for (let [index, element] of arr.entries()) {
    console.log(index + ' ' + element);
}
// => 0 red
// 1 green
// 2 blue


// Generator function (shor: generator), but with function* instead of function
function* generatorFunction() {
    yield 1;
    yield 2;
}
let genObj = generatorFunction();
console.log(genObj.next()); // => { value: 1, done: false }
console.log(genObj.next()); // => { value: 2, done: false }
console.log(genObj.next()); // => { value: undefined, done: true }

// Some iterators are in turn iterables 

let someArray = [1, 5, 7];
let someArrayEntries = someArray.entries();

console.log(someArrayEntries.toString()); // => [object Array Iterator]
console.log(someArrayEntries === someArrayEntries[Symbol.iterator]()); // true

//////////////////////////////////////// ITERATION example /////////////////////////////

// Using the iteration protocols
let someString = 'hi';
console.log(typeof someString[Symbol.iterator]); // function

// String`s default iterator returns the string`s character one by one 
let iterator = someString[Symbol.iterator]();
iterator + '';

console.log(iterator.next()); // { value: 'h', done: false }
console.log(iterator.next()); // { value: 'i', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

console.log([...someString]); // [ 'h', 'i' ]

// own @@iterator

let someNewString = new String('hello'); // construct a string

someNewString[Symbol.iterator] = function() {
    return { // this is the iterator object, returning a single element, the string 'bye'
        next: function() {
            if (this._first) {
                this._first = false;
                return { value: 'bye', done: false };
            } else {
                return { done: true }
            }
        },
        _first: true

    }
}

console.log([...someNewString]); // [ 'bye' ]
console.log(someNewString + ''); // hello


//////////////////////////////////////// ITERABLE example /////////////////////////////// 

// Built-in iterables - String, Array, TypedArray, Map and Set - implements @@@iterator Method

// User-defined iterables 
let myIterable2 = {};
myIterable2[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};

console.log([...myIterable2]); // [ 1, 2, 3 ]

// Built-in APIs accepting iterables 

let myObj = {};
let map = new Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c']
]).get(2);
let weakMap = new WeakMap([
    [{}, 'a'],
    [myObj, 'b'],
    [{}, 'c']
]).get(myObj);
let set1 = new Set([1, 2, 3]).has(2);
let set2 = new Set('123').has('2');
let weakSet = new WeakSet(function*() {
    yield {};
    yield myObj;
    yield {};
}()).has(myObj);

console.log(map); // b
console.log(weakMap); // b
console.log(set1); // true
console.log(set2); // true
console.log(weakSet); // true

// Syntaxes expecting iterables 
// for-of loops, spread operator, yield* and desctructuring assigment

for (let value of['a', 'b', 'c']) {
    console.log(value);
}
// a
// b
// c

console.log([...
    'abc'
]); // => [ 'a', 'b', 'c' ]

function* gen() {
    yield*['a', 'b', 'c'];
}

console.log(gen().next()); // { value: 'a', done: false }

// Simple iterator

function makeIterator(array) {
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { done: true }
        }
    }
}

let it = makeIterator(['yo', 'ya']);

console.log(it.next().value); // yo
console.log(it.next().value); // ya
console.log(it.next().done); // true

// Infinite iterator 

function idMaker() {
    let index = 0;

    return {
        next: function() {
            return { value: index++, done: false };
        }
    }
}
let id = idMaker();

console.log(id.next().value); // 0
console.log(id.next().value); // 1
console.log(id.next().value); // 2
console.log(id.next().value); // 3
console.log(id.next().value); // 4

/// With a Generator 

// function* makeSimpleGenerator(array) {
//     let nextIndex = 0;

//     while (nextIndex < array.length) {
//         yield array[nextIndex];
//         nextIndex++;
//     }
// }

// let gen = makeSimpleGenerator(someArray);

// console.log(gen.next());

function* idMaker2() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

let gen2 = idMaker2();

console.log(gen2.next().value);

// Generator object is both, iterator and iterable
let aGeneratorObject = function*() {
    yield 1;
    yield 2;
    yield 3;
}();

console.log(typeof aGeneratorObject.next); // function

console.log(typeof aGeneratorObject[Symbol.iterator]); // function

console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject); // true

console.log([...aGeneratorObject]) // [ 1, 2, 3 ]


// Using generators for iteration 
// Traverse tree that is encoded as nested arrays. Use callback

function traverseTree(tree, visitor) {
    if (Array.isArray(tree)) {
        // inner node 
        for (let i = 0; i < tree.length; i++) {
            traverseTree(tree[i], visitor); // (*) recursion
        }
    } else {
        // leaf
        visitor(tree);
    }
}

const tree = ['a', ['b', 'c'],
    ['d', 'e']
];
traverseTree(tree, function(x) { console.log(x) })

// a
// b
// c
// d
// e

// ES6 traverseTree

function* iterTree(tree) {
    if (Array.isArray(tree)) {
        // inner node
        for (let i = 0; i < tree.length; i++) {
            yield iterTree(tree[i]); // (*) recursion
        }
    } else {
        // leaf
        yield tree;
    }
}

for (let x of iterTree(tree)) {
    console.log(x);
}