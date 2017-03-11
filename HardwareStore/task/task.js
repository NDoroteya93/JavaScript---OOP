function solve() {

    const getUniqueId = (function() {
        let id = 0;
        return function() {
            ++id;
            return id;
        }
    })();


    const VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error();
            }
        },
        stringLengthValidate: function(str, min, max) {
            this.isString(str);
            if (str.length < min || str.length > max) {
                throw new Error();
            }
        },
        positiveNonZeroNumber: function(n) {
            if (typeof n !== 'number' || isNaN(n) || n <= 0) {
                throw new Error();
            }
        },
        validateNumberRange: function(n, min, max) {

            if (typeof n !== 'number' || isNaN(n) || n < min || n > max) {
                throw new Error();
            }
        },
        lanPortsIntegerValidation: function(n) {
            this.positiveNonZeroNumber(n);
            if (n !== parseInt(n, 10)) {
                throw new Error();
            }
        },
        qualityValidation: function(str) {
            this.isString(str);
            if (str !== 'high' && str !== 'mid' && str !== 'low') {
                throw new Error();
            }
        },
        productInstanceValidation: function(value) {
            if (value.hasOwnProperty('screenSize') || value.hasOwnProperty('operatingSystem')) {
                if (!(value instanceof SmartPhone)) {
                    throw new Error();
                }
            }

            if (value.hasOwnProperty('outputVoltage') || value.hasOwnProperty('outputCurrent')) {
                if (!(value instanceof Charger)) {
                    throw new Error();
                }
            }

            if (value.hasOwnProperty('wifiRange') || value.hasOwnProperty('lanPorts')) {
                if (!(value instanceof Router)) {
                    throw new Error();
                }
            }

            if (value.hasOwnProperty('quality') || value.hasOwnProperty('hasMicrophone')) {
                if (!(value instanceof Headphones)) {
                    throw new Error();
                }
            }
        },
        quantityInStoreValidation: function(storeQuantity, quantity) {
            if (storeQuantity < quantity) {
                throw new Error();
            }
        }
    }

    function convertObect(value) {
        let isTrueSet = (value.toString() == 'true');
        return isTrueSet;
    }

    function isInstance(obj) {
        if (obj instanceof SmartPhone) {
            return 'SmartPhone';
        }
        if (obj instanceof Charger) {
            return 'Charger';
        }

        if (obj instanceof Router) {
            return 'Router';
        }

        if (obj instanceof Headphones) {
            return 'Headphones';
        }

    }
    // Your classes
    class Product {
        constructor(manufacturer, model, price) {
            this._id = getUniqueId();
            this.manufacturer = manufacturer;
            this.model = model;
            this.price = price;
        }
        get id() {
            return this._id;
        }
        get manufacturer() {
            return this._manufacturer;
        }

        set manufacturer(value) {
            VALIDATION.stringLengthValidate(value, 1, 20);
            this._manufacturer = value;
        }

        get model() {
            return this._model;
        }

        set model(value) {
            VALIDATION.stringLengthValidate(value, 1, 20);
            this._model = value;
        }

        get price() {
            return this._price;
        }

        set price(value) {
            VALIDATION.positiveNonZeroNumber(value);
            this._price = value;
        }


        getLabel() {
            let label = this.manufacturer + ' ' + this.model + ' - **' + this.price + '**';
            return label;
        }

    }

    class SmartPhone extends Product {
        constructor(manufacturer, model, price, screenSize, operatingSystem) {
            super(manufacturer, model, price);
            this.screenSize = screenSize;
            this.operatingSystem = operatingSystem;
        }

        get screenSize() {
            return this._screenSize;
        }

        set screenSize(value) {
            VALIDATION.positiveNonZeroNumber(value);
            this._screenSize = value;
        }

        get operatingSystem() {
            return this._operatingSystem;
        }

        set operatingSystem(value) {
            VALIDATION.stringLengthValidate(value, 1, 10);
            this._operatingSystem = value;
        }


        getLabel() {
            const label = super.getLabel();
            return 'SmartPhone - ' + label;
        }
    }

    class Charger extends Product {
        constructor(manufacturer, model, price, outputVoltage, outputCurrent) {
            super(manufacturer, model, price);
            this.outputVoltage = outputVoltage;
            this.outputCurrent = outputCurrent;
        }

        get outputVoltage() {
            return this._outputVoltage;
        }

        set outputVoltage(value) {
            VALIDATION.validateNumberRange(value, 5, 20);
            this._outputVoltage = value;
        }

        get outputCurrent() {
            return this._outputCurrent;
        }

        set outputCurrent(value) {
            VALIDATION.validateNumberRange(value, 100, 3000)
            this._outputCurrent = value;
        }

        getLabel() {
            const label = super.getLabel();

            return 'Charger - ' + label;
        }
    }

    class Router extends Product {
        constructor(manufacturer, model, price, wifiRange, lanPorts) {
            super(manufacturer, model, price);
            this.wifiRange = wifiRange;
            this.lanPorts = lanPorts;
        }

        get wifiRange() {
            return this._wifiRange;
        }

        set wifiRange(value) {
            VALIDATION.positiveNonZeroNumber(value);
            this._wifiRange = value;
        }

        get lanPorts() {
            return this._lanPorts;
        }

        set lanPorts(value) {
            VALIDATION.lanPortsIntegerValidation(value);
            this._lanPorts = value;
        }

        getLabel() {
            const label = super.getLabel();
            return 'Router - ' + label;
        }

    }

    class Headphones extends Product {
        constructor(manufacturer, model, price, quality, hasMicrophone) {
            super(manufacturer, model, price);
            this.quality = quality;
            this.hasMicrophone = hasMicrophone;
        }

        get quality() {
            return this._quality;
        }

        set quality(value) {
            VALIDATION.qualityValidation(value);
            this._quality = value;
        }

        get hasMicrophone() {
            return this._hasMicrophone;
        }

        set hasMicrophone(value) {
            this._hasMicrophone = convertObect(value);
        }

        getLabel() {
            const label = super.getLabel();
            return 'Headphones - ' + label;
        }
    }

    class HardwareStore {
        constructor(name) {
            this.name = name;
            this._products = [];
            this._quantityObj = {};
            this._sum = 0;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            VALIDATION.stringLengthValidate(value, 1, 20);
            this._name = value;
        }

        get products() {
            return this._products;
        }

        get quantityObj() {
            return this._quantityObj;
        }

        get sum() {
            return this._sum;
        }

        set sum(value) {
            this._sum = value;
        }

        stock(product, quantity) {
            VALIDATION.productInstanceValidation(product);
            VALIDATION.lanPortsIntegerValidation(quantity);
            let isAdded = this.products.findIndex(x => x.id === product.id);
            if (isAdded !== -1) {
                throw new Error();
            }
            this.quantityObj[product.id] = quantity;
            this.products.push(product);

            return this;
        }

        sell(productId, quantity) {
            let self = this;

            VALIDATION.lanPortsIntegerValidation(quantity);
            if (self.quantityObj[productId] === undefined) {
                throw new Error();
            }
            VALIDATION.quantityInStoreValidation(self.quantityObj[productId], quantity);

            self.quantityObj[productId] -= quantity;
            let currentProduct = self.products.find(x => x.id === productId);
            self.sum += currentProduct.price * quantity;

            return this;
        }

        getSold() {
            return this.sum;
        }

        search(query) {
            let self = this;
            let result = {}; // product, quantity
            let findProducts = [];

            if (typeof query === 'object') {
                let advancedSearch = self.products
                    .filter(function(x) {
                        return (!query.hasOwnProperty('manufacturerPattern') || x.manufacturer === query.manufacturerPattern) &&
                            (!query.hasOwnProperty('modelPattern') || x.model === query.modelPattern) &&
                            (!query.hasOwnProperty('type') || query.type === isInstance(x)) &&
                            (!query.hasOwnProperty('minPrice') || query.minPrice < x.price) &&
                            (!query.hasOwnProperty('maxPrice') || query.maxPrice > x.price)
                    });

                advancedSearch.forEach(function(x) {
                    result.product = x;
                    result.quantity = self.quantityObj[x.id];
                    findProducts.push(result);
                });

                return findProducts;
            }

            let seachProducts = self.products.filter(function(item) {
                return item.manufacturer.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
                    item.model.toLowerCase().indexOf(query.toLowerCase()) >= 0;
            });
            seachProducts.forEach(function(x) {
                result.product = x;
                result.quantity = self.quantityObj[x.id];
                findProducts.push(result);
            });
            return findProducts;
        }

    }

    return {
        getSmartPhone(manufacturer, model, price, screenSize, operatingSystem) {
            return new SmartPhone(manufacturer, model, price, screenSize, operatingSystem);
        },
        getCharger(manufacturer, model, price, outputVoltage, outputCurrent) {
            return new Charger(manufacturer, model, price, outputVoltage, outputCurrent);
        },
        getRouter(manufacturer, model, price, wifiRange, lanPorts) {
            return new Router(manufacturer, model, price, wifiRange, lanPorts);
        },
        getHeadphones(manufacturer, model, price, quality, hasMicrophone) {
            return new Headphones(manufacturer, model, price, quality, hasMicrophone);
        },
        getHardwareStore(name) {
            return new HardwareStore(name);
        }
    };
}



const result = solve();

const phone = result.getSmartPhone('HTC', 'One', 903, 5, 'Android');
const phone1 = result.getSmartPhone('HTC', 'two', 500, 5, 'Android');
const phone2 = result.getSmartPhone('HTC', 'three', 700, 5, 'Android');
const phone3 = result.getSmartPhone('HTC', 'One', 800, 5, 'Android');


console.log(phone.getLabel()); // SmartPhone - HTC One - **903**

const headphones = result.getHeadphones('Sennheiser', 'PXC 550 Wireless', 340, 'high', false);
const store = result.getHardwareStore('Magazin');

store.stock(phone, 1)
    .stock(phone, 4)
    .stock(headphones, 15)
    .stock(phone1, 1)
    .stock(phone2, 1)
    .stock(phone3, 1);



console.log(store.search('senn'));

store.search('')
    /*
    [ { product:
         Headphones { ... },
        quantity: 15 } ]
    */
    // console.log((Object.getPrototypeOf(phone));
console.log(store.search({ type: 'Headphones', maxPrice: 1000 }));
/*
[ { product:
     SmartPhone { ... },
    quantity: 1 } ]
*/
// console.log(store.search({ type: 'SmartPhone', maxPrice: 900 }));

/* [] */

store.sell(headphones.id, 2);
console.log(store.getSold()); // 680

// let result = solve();

// // let product = result.getProduct('Intel', 'imd10', 10);
// let smartphone = result.getSmartPhone('Neshto si', 'imd', 100, 7.1, 'Android');
// // console.log(smartphone.getLabel());
// // console.log(product.getLabel());
// let charger = result.getCharger('Neshto si2', 'imd3', 500, 15, 2500);

// // console.log(charger.getLabel());
// let router = result.getRouter('Neshto si7', 'imd6', 100, 10.1, 76);


// let headphones = result.getHeadphones('Neshto si84', 'imd39', 50, 'mid', true);
// // console.log(headphones.getLabel());
// // console.log(router.getLabel());


// let store = result.getHardwareStore('New Store');
// let obj = { manufacturer: 'try some', model: 'neshto', price: 100, outputVoltage: 12, outputCurrent: 100 };
// store.stock(headphones, 10);
// store.stock(router, 7);

// store.sell(4, 6);
// // console.log(store.getSold());

// console.log(store.search('39'));

// console.log(headphones instanceof Product);
// Submit the code above this line in bgcoder.com
module.exports = solve; // DO NOT SUBMIT THIS LINE