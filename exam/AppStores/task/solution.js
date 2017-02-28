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
            if (newVersion <= oldVersin) {
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
        },
        appNotAvailableInStore: function(apps) {
            if (apps.length === 0) {
                throw new Error('App name is not available in store!')
            }
        },
        appNotAvailableOnDevice: function(app) {
            if (app === -1) {
                throw new Error('App is not available on device!');
            }
        }
    }

    function compare(a, b) {
        if (a.name > b.name) {
            return 1;
        }

        if (b.name > a.name) {
            return -1;
        }

        return 0;
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
                .sort(compare);
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

            foundApps.sort(compare);
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
        }

        install(name) {
            let installStores = this.apps.filter(app => app.hasOwnProperty('_apps'));
            let installApps = this.apps.filter(app => !app.hasOwnProperty('_apps'));
            let foundApps = [];
            installStores.forEach(function(store) {
                store.apps.forEach(function(app) {
                    if (app.name === name) {
                        foundApps.push(app);
                    }
                })
            });

            VALIDATION.appNotAvailableInStore(foundApps);

            foundApps.sort((a, b) => b.version - a.version);
            let lastVersion = foundApps[0];
            let isAdded = installApps.findIndex(x => x.name === name);
            if (isAdded === -1) {
                this.apps.push(lastVersion); //

            }
            return this;


        }

        uninstall(name) {
            let findApp = this.apps.findIndex(app => app.name === name);

            VALIDATION.appNotAvailableOnDevice(findApp);

            this.apps.splice(findApp, 1);
            return this;
        }

        listInstalled() {
            return this.apps
                .sort(compare);
        }

        update() {
            let allStores = this.apps.filter(app => app.hasOwnProperty('_apps'));
            let appsInStore = allStores.reduce(function(prev, curr) {
                return prev.apps.concat(curr.apps);
            });


            for (let i = 0; i < this.apps.length; i++) {
                for (let j = 0; j < appsInStore.length; j++) {
                    if (this.apps[i].name === appsInStore[j].name && !this.apps[i].hasOwnProperty('_apps')) {
                        if (this.apps[i].version < appsInStore[j].version) {
                            this.apps[i].version = appsInStore[j].version;
                        } else {
                            appsInStore[j].version = this.apps[i].version;
                        }
                    }
                }
            }
            return this;
        }


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

module.exports = solve;


// let result = solve();

// const app1 = result.createApp('app1', 'description', 1, 4);
// const app2 = result.createApp('app2', 'description', 2, 4);
// const app3 = result.createApp('app3', 'description', 3, 4);
// const app4 = result.createApp('app4', 'description', 4, 4);

// const store1 = result.createStore('store1', 'description', 1.1, 7);
// const store2 = result.createStore('store2', 'description', 1.2, 7);

// store1.uploadApp(app1).uploadApp(app3);
// store2.uploadApp(app1).uploadApp(app2);

// app2.release(2.3);

// console.log(store2);

// const device = result.createDevice('Zelka', [store1, store2, app1, app2, app3, app4]);
// // console.log(device);
// app2.release(2.4);

// app1.release(1.7);
// store1.uploadApp(app1);

// app3.release(3.3);
// store1.uploadApp(app3);
// app3.release(3.4);
// store2.uploadApp(app3);

// device.update();

// console.log(device);
// const actualVersions = device.apps.map(x => x.version).sort();
// const expectedVersions = [1.1, 1.2, 1.7, 2.3, 3.4, 4];

// expect(actualVersions).to.eql(expectedVersions);
// const store = result.createStore('store', 'description', 1, 4);
// store.uploadApp(store);

// const device = result.createDevice('Zelka', [store]);
// console.log(device.apps.length) // length(1);

// device.install(store.name);
// device.install(store.name);
// device.install(store.name);

// console.log(device.apps.length) // length(1);

// let app1 = stores.createApp('Dory1', 'description0', 1, 2);
// let app2 = stores.createApp('Dory2', 'description1', 2, 1);
// let app3 = stores.createApp('Dory3', 'Nqma opisanie', 37, 2);

// let app4 = stores.createApp('facebook', 'description0', 8, 2);
// let app5 = stores.createApp('facebook', 'description1', 20, 1);
// let app6 = stores.createApp('googleMaps', 'Nqma opisanie', 27, 2);
// let app7 = stores.createApp('facebook', 'description1', 35, 1);

// let store = stores.createStore('Store', 'Store za Dory', 2, 1);
// let store2 = stores.createStore('Store2', 'Test', 2, 1);

// store2.uploadApp(app1);
// store2.uploadApp(app5);
// store2.uploadApp(app6);
// store.uploadApp(app4);
// store.uploadApp(app2);
// store.uploadApp(app3);
// store2.uploadApp(app7);

// console.log(store);

// console.log(store.listMostRecentApps(2));
// console.log(store.listMostPopularApps(''));


// let device = stores.createDevice('Iphone', [app1, app2, app3, app4, store, store2]);
// console.log(device.install('facebook'));

// console.log(device.apps[0])

// device.uninstall('Dory2');


// console.log(device.listInstalled());

// console.log(device.update());

// все е нещо :D

// store.takedownApp('Dory1');

// console.log(store.search('NqmaDory')); // ok

// console.log(store);