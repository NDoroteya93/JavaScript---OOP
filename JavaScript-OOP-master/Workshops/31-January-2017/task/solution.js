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
                let compressed = [];
                // make a copy of the input array
                let copy = this.products.slice(0);
                let productsInfo = new Object();
                let totalPrice = 0;

                // first loop goes over every element
                for (let i = 0; i < this.products.length; i += 1) {
                    let count = 0;
                    let sum = 0;
                    totalPrice += this.products[i].price;
                    // loop over every element in the copy and see if it's the same
                    for (var j = 0; j < copy.length; j += 1) {
                        if (this.products[i].name === copy[j].name) {
                            // increase amount of times duplicate is found
                            sum += copy[j].price;
                            count += 1;
                            // remove duplicate objects
                            copy.splice(j, 1);

                            j -= 1;
                        }
                    }
                    if (count > 0) {
                        let a = new Object();
                        a.name = this.products[i].name;
                        a.totalPrice = sum;
                        a.quantity = count;
                        compressed.push(a);
                    }


                }
                productsInfo.totalPrice = totalPrice;
                productsInfo.products = compressed;
                return productsInfo;

            },

        }

        return cart;

    }

    return {
        getProduct: getProduct,
        getShoppingCart: getShoppingCart
    };
}


//////////////////////////////////////
const { getProduct, getShoppingCart } = solve();

let cart = getShoppingCart();
cart.add(getProduct("Type 1", "Pr 1", 1));
cart.add(getProduct("Type 1", "Pr 1", 2));
cart.add(getProduct("Type 1", "Pr 1", 2));
cart.add(getProduct("Type 1", "Pr 1", 2));
cart.add(getProduct("Type 1", "Pr 1", 3));


cart.add(getProduct("Type 1", "Pr 2", 5));
cart.add(getProduct("Type 1", "Pr 2", 6));
console.log(cart.getInfo());




module.exports = solve();