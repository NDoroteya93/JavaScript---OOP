'use strict';

function solve() {
    const uploadOrderGenerator = (function() {
        let count = 0;
        return function() {
            ++count;
            return count;
        }
    })();

    const VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error('Not valid string!');
            }
        },
        validateStringLength: function(str, min, max) {
            this.isString(str);
            if (str.length < min || str.length > max || !(/^[a-zA-Z0-9|\s]*$/.test(str))) {
                throw new Error('Invalid string length!');
            }
        },
        validateVersionPositiveNumber: function(value) {
            if (typeof value !== 'number' || isNaN(value) || value <= 0) {
                throw new Error('Invalid version');
            }
        },
        validateRatingBetweenOneAndTen: function(value, min, max) {
            if (typeof value !== 'number' || isNaN(value) || value < min || value > max) {
                throw new Error('Invalid rating!');
            }
        },
        validateReleaseVersion: function(oldVersin, newVersion) {
            this.validateVersionPositiveNumber(newVersion);
            if (newVersion < oldVersin) {
                throw new Error('Invalid new version!');
            }
        },
        validateOptionReleaseVersion: function(value, oldVersion) {
            if (!value.hasOwnProperty('version')) {
                throw new Error('Invalid options!');
            }
            this.validateReleaseVersion(oldVersion, value.version);
            if (value.hasOwnProperty('description')) {
                this.isString(value.description);
            }

            if (value.hasOwnProperty('rating')) {
                this.validateRatingBetweenOneAndTen(value.rating, 1, 10);
            }
        },
        validateAppInstance: function(app) {
            if (!(app instanceof App)) {
                throw new Error('Invalid instance of App');
            }
        },
        validateArrayApps: function(apps) {
            apps.forEach(app => VALIDATION.validateAppInstance(app));
        }
    }

    class App {
        constructor(name, description, version, rating) {
            this._order = 0;
            this.name = name;
            this.description = description;
            this.version = version;
            this.rating = rating;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            VALIDATION.validateStringLength(value, 1, 24);
            this._name = value;
        }

        get description() {
            return this._description;
        }

        set description(value) {
            VALIDATION.isString(value);
            this._description = value;
        }

        get version() {
            return this._version;
        }

        set version(value) {
            VALIDATION.validateVersionPositiveNumber(value);
            this._version = value;
        }

        get rating() {
            return this._rating;
        }

        set rating(value) {
            VALIDATION.validateRatingBetweenOneAndTen(value, 1, 10);
            this._rating = value;
        }

        get order() {
            return this._order;
        }



        release(version) {

            if (typeof version === 'object') {
                VALIDATION.validateOptionReleaseVersion(version, this.version);
                this.version = version.version;
                if (version.hasOwnProperty('description')) {
                    this.description = version.description;
                }
                if (version.hasOwnProperty('rating')) {
                    this.rating = version.rating;
                }
                return this;
            }
            VALIDATION.validateReleaseVersion(this.version, version);
            this.version = version;

            return this;
        }

    }

    class Store extends App {
        constructor(name, description, version, rating) {
            super(name, description, version, rating);
            this._apps = [];
        }

        get apps() {
            return this._apps;
        }

        uploadApp(app) {
            VALIDATION.validateAppInstance(app);
            let findApp = this.apps.find(x => x.name === app.name);

            if (findApp === undefined) {
                let newApp = new App(app.name, app.description, app.version, app.rating);
                newApp._order = uploadOrderGenerator();
                this.apps.push(newApp);
                return this;
            }
            VALIDATION.validateReleaseVersion(findApp.version, app.version);
            findApp.version = app.version;
            findApp.description = app.description;
            findApp.rating = app.rating;

            return this;
        }

        takedownApp(name) {

            let indexToRemove = this.apps.findIndex(app => app.name === name);
            if (indexToRemove === -1) {
                throw new Error('Invalid name in apps!');
            }

            this.apps.splice(indexToRemove, 1);


            return this;
        }



        search(pattern) {
            VALIDATION.isString(pattern);
            return this.apps.filter(app => app.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0)
                .sort(function(a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }

                    if (b.name > a.name) {
                        return -1;
                    }

                    return 0;
                });
        }

        listMostRecentApps(count) {

            try {
                VALIDATION.validateVersionPositiveNumber(count);
            } catch (e) {
                count = 10;
            }

            return this.apps
                .slice()
                .sort((a, b) => b.order - a.order)
                .slice(0, count);
        }

        listMostPopularApps(count) {
            try {
                VALIDATION.validateVersionPositiveNumber(count);
            } catch (e) {
                count = 10;
            }

            return this.apps
                .slice()
                .sort(function(a, b) {
                    let tmp = b.rating - a.rating;
                    if (tmp === 0) {
                        return b.order - a.order;
                    }
                    return tmp;
                })
                .slice(0, count);
        }
    }


    class Device {

        constructor(hostname, apps) {
            this.hostname = hostname;
            this.apps = apps;
        }

        get hostname() {
            return this._hostname;
        }

        set hostname(value) {
            VALIDATION.validateStringLength(value, 1, 32);
            this._hostname = value;
        }

        get apps() {
            return this._apps;
        }

        set apps(value) {
            VALIDATION.validateArrayApps(value);
            this._apps = value;
        }

        search(pattern) {
                let foundApps = [];

                let stores = this.apps.filter(app => app.hasOwnProperty('_apps'));
                stores.forEach(function(store) {
                    store.apps.forEach(function(app) {
                        if (app.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) { // okay
                            foundApps.push(app);
                        }
                    })
                });

                foundApps.sort(function(a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }

                        if (b.name > a.name) {
                            return -1;
                        }

                        return 0;
                    })
                    // okay
                let result = [];
                let isAdded = -1;
                for (let i = 0; i < foundApps.length; i++) {
                    isAdded = result.findIndex(x => x.name === foundApps[i].name);
                    if (isAdded === -1) {
                        result.push(foundApps[i]);
                    } else {
                        if (result[isAdded].version < foundApps[i].version) {
                            result[isAdded].version = foundApps[i].version;
                        }
                    }
                }

                return result;
            } // 


    }

    return {
        createApp(name, description, version, rating) {
            return new App(name, description, version, rating);
        },
        createStore(name, description, version, rating) {
            return new Store(name, description, version, rating);
        },
        createDevice(hostname, apps) {
            return new Device(hostname, apps);
        }
    };
}

let stores = solve();

let app1 = stores.createApp('Dory1', 'description0', 1, 2);
let app2 = stores.createApp('Dory2', 'description1', 2, 1);
let app3 = stores.createApp('Kalin', 'Nqma opisanie', 7, 2);

let store = stores.createStore('Store', 'Store za Dory', 2, 1);
store.uploadApp(app1);
store.uploadApp(app2);
store.uploadApp(app3);

// console.log(store);

// console.log(store.listMostRecentApps(2));
// console.log(store.listMostPopularApps(''));

let device = stores.createDevice('Iphone', [app1, app2, app3, 42]);

console.log(device);


// store.takedownApp('Dory1');

// console.log(store.search('NqmaDory')); // ok

// console.log(store); 
module.exports = solve;