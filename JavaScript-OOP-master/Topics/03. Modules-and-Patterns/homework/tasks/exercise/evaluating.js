'use strict';

// EVAL - execute a string of code in the current scope

// function evalAndReturnX(code) {
//     eval(code);
//     return x;
// }

// console.log(evalAndReturnX("var x = 2"));

// Better is with Function constructor
// take two arguments - arguments name and a string containing the function's body

let plusOne = new Function('n', 'return n + 1');

// return 5
console.log(plusOne(4));