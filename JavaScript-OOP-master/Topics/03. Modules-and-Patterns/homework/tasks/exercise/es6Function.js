'use strict';

// Functions 

var getProduct = function(productId = 1000) {
    console.log(productId);
};

getProduct();

let getNewProduct = function(productId = 1000, type = 'software') {
    console.log(productId + ' ' + type);
}

// output 1000, hardware
getNewProduct(undefined, 'hardware');

let getTotal = function(price, tax = price * 0.07) {
    console.log(price + tax);
}

// output 5.35
getTotal(5.00);

let baseTax = 0.07;
let getTotalBase = function(price, tax = price * baseTax) {
    console.log(price + tax);
}

// output 5.35
getTotalBase(5.00)

// best practice 

let getTotal2 = function(price, tax = 0.07) {
    console.log(arguments.length);
}



getTotal2(4.00)

// create Function 

let getTotal3 = new Function('price = 20.00', 'return price;');
console.log(getTotal3);