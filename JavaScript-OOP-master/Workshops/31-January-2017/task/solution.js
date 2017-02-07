'use strict';

function solve() {
    function getProduct(productType, name, price) {
        let getProducts = {
            productType: productType,
            name: name,
            price: price,
        }

        return getProducts;
    }

    function getShoppingCart() {
        let cart = {
            products: [],
            add: function(product) {
                this.products.push(product);
                return this;
            },
            remove: function(product) {
                let isMissing = true;
                if (product === 'undefined') {
                    throw new Error();
                }
                for (let i = 0; i < this.products.length; i += 1) {
                    if (product.name === this.products[i].name && product.name === this.products[i].name && product.name === this.products[i].name) {
                        this.products.splice(i, 1);
                        isMissing = false
                        break;
                    }
                }
                if (isMissing) {
                    throw new Error();
                }
                return this;
            },
            showCost: function() {
                let sum = 0;
                for (let i = 0; i < this.products.length; i += 1) {
                    sum += +this.products[i].price;
                }

                return sum;
            },
            showProductTypes: function() {
                let productTypes = [];
                if (this.products.length === 0) {
                    return this.products;
                }
                // this.products= this.products.filter((thing, index, self) => self.findIndex((t) => {return t.productType === thing.productType && t.name === thing.name; }) === index)
                this.products.forEach(function(obj) {
                    productTypes.push(obj.productType);
                })

                productTypes = productTypes.filter((keyword, index) => productTypes.lastIndexOf(keyword) === index)
                    .sort((a, b) => a < b ? -1 : 1);

                return productTypes;
            },
            getInfo: function() {
                let productInfo = {},
                    products = [],
                    count = 1,
                    totalPrice = 0,
                    sum = 0;
                let sortArray = this.products
                    .sort(function(a, b) {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                    });
                sortArray.push(productInfo);
                for (let i = 0; i < sortArray.length - 1; i += 1) {
                    if (sortArray[i].name === sortArray[i + 1].name) {
                        count += 1;
                    } else {
                        let currentProduct = {};
                        sum = (Number(sortArray[i].price)) * count;
                        currentProduct.name = sortArray[i].name;
                        currentProduct.totalPrice = sum;
                        currentProduct.quantity = count;
                        totalPrice += sum;
                        products.push(currentProduct);
                        count = 1;
                    }

                }

                productInfo.totalPrice = totalPrice;
                productInfo.products = products;

                return productInfo;
            },

        }

        return cart;

    }

    return {
        getProduct: getProduct,
        getShoppingCart: getShoppingCart
    };
}

const { getProduct, getShoppingCart } = solve();

let cart = getShoppingCart();

let pr1 = getProduct("Sweets", "Shokolad Milka", 2);
let pr2 = getProduct("Sweets", "Shokolad Milka", 2);
let pr3 = getProduct("Soleno", "Soleti", 2);

let pr4 = getProduct("Domateno pure", "Domat", 10);
let pr5 = getProduct("Sweets", "Shokolad Milka", 2);
let pr6 = getProduct("Soleno", "Soleti", 2);
let pr7 = getProduct("Sweets", "Shokolad Milka", 2);
let pr8 = getProduct("Soleno", "Soleti", 2);
let pr9 = getProduct("Sweets", "Shokolad Milka", 2);
let pr10 = getProduct("Soleno", "Soleti", 2);
let pr11 = getProduct("Sweets", "Shokolad Milka", 2);
let pr12 = getProduct("Soleno", "Soleti", 2);


cart.add(pr1);
cart.add(pr2);
cart.add(pr3);
cart.add(pr4);
cart.add(pr5);
cart.add(pr6);
cart.add(pr7);
cart.add(pr8);
cart.add(pr9);
cart.add(pr10);
cart.add(pr11);
cart.add(pr12);

//////////////////////////////////////


// function getInfo() {
//     let productInfo = {};
//     let products = [];

//     let sortArray = array
//         .sort(function(a, b) {
//             let nameA = a.name.toUpperCase();
//             let nameB = b.name.toUpperCase();
//             return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
//         });
//     sortArray.push(productInfo);
//     let count = 1;
//     let totalPrice = 0;
//     let sum = 0;
//     for (let i = 0; i < sortArray.length - 1; i += 1) {
//         if (sortArray[i].name === sortArray[i + 1].name) {
//             count += 1;
//         } else {
//             let currentProduct = {};
//             sum = (Number(sortArray[i].price)) * count;
//             currentProduct.name = sortArray[i].name;
//             currentProduct.totalPrice = sum;
//             currentProduct.quantity = count;
//             totalPrice += sum;
//             products.push(currentProduct);
//             count = 1;
//         }

//     }

//     productInfo.totalPrice = totalPrice;
//     productInfo.products = products;
//     console.log(productInfo);
//     return productInfo;
// }


// let array = [{ productType: 'Domateno pure', name: 'Domat', price: 10 },
//     { productType: 'Soleno', name: 'Soleti', price: 2 },
//     { productType: 'Soleno', name: 'Soleti', price: 2 },
//     { productType: 'Soleno', name: 'Soleti', price: 2 },
//     { productType: 'Soleno', name: 'Soleti', price: 2 },
//     { productType: 'Soleno', name: 'Soleti', price: 2 },
//     { productType: 'Sweets', name: 'Shokolad Milka', price: 2 },
//     { productType: 'Sweets', name: 'Shokolad Milka', price: 2 },
//     { productType: 'Sweets', name: 'Shokolad Milka', price: 2 },
//     { productType: 'Sweets', name: 'Shokolad Milka', price: 2 },
//     { productType: 'Sweets', name: 'Shokolad Milka', price: 2 },
//     { productType: 'Sweets', name: 'Shokolad Milka', price: 2 }
// ]
// getInfo();
console.log(cart.getInfo());


module.exports = solve();