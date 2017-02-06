'use strict';

// function solve() {
function getProduct(productType, name, price) {
    this.productType = productType;
    this.name = name;
    this.price = price;

    return this;
}

function getShoppingCart() {
    let products = [];
    let cart = {
        add: function(product) {
            let self = this,
                addProduct = {};
            addProduct = {
                productType: product[0],
                name: product[1],
                price: product[2],
            }

            products.push(addProduct);
        },
        remove: function(product) {},
        showCost: function() {
            return this.price;
        },
        showProductType: function() {},
        getInfo: function() {},

    }

    return products;

}

//     return {
//         getProduct: getProduct,
//         getShoppingCart: getShoppingCart
//     };
// }

module.exports = solve();