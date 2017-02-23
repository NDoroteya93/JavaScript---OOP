'use strict';

function solve() {

    const VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error('Invalid string!');
            }
        },
        validateAppNameLength: function(str, min, max) {
            this.isString(str);
            if (str.length < min || str.length > max || !(/^[a-zA-Z0-9|\s]*$/.test(str))) {
                throw new Error('Invalid string length!');
            }
        },
        versionIsPositiveNumber: function(n, min) {
            if (typeof n !== 'number' || isNaN(n) || n <= min) {
                throw new Error('Invalid version number!');
            }
        },
        ratingBetweenOneAndTen: function(n, min, max) {
            this.versionIsPositiveNumber(n, 1);
            if (n < min || n > max) {
                throw new Error('Invalid rating number!')
            }
        },
        validateNewVersion: function(oldVersion, newVersion) {
            if (newVersion < oldVersion) {
                throw new Error('New version must above old version');
            }
        },
        validateValidInstaneAppClass: function(value) {
            try {
                this.validateAppNameLength(value.name, 1, 24);
                this.isString(value.description);
                this.versionIsPositiveNumber(value.version, 0);
                this.ratingBetweenOneAndTen(value.rating, 1, 10);
            } catch (e) {
                throw new Error('Invalid instance of the App class');
            }
        },
        validateHostName: function(str, min, max) {
            this.isString(str);
            if (str.length < min || str.length > max) {
                throw new Error('Invalid Host Name');
            }
        },
        validatePreInstalledApps: function(arr) {
            if (!Array.isArray(arr) || !arr instanceof Array) {
                throw new Error('Invalid pre-installed app');
            }

            if (arr.length !== 0) {
                arr.forEach(app => this.validateValidInstaneAppClass(app));
            }
        }
    };

    class App {
        constructor(name, description, version, rating) {
            this.name = name;
            this.description = description;
            this.version = version;
            this.rating = rating;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            VALIDATION.validateAppNameLength(value, 1, 24);
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
            VALIDATION.versionIsPositiveNumber(value, 0);
            this._version = value;
        }

        get rating() {
            return this._rating;
        }

        set rating(value) {
            VALIDATION.ratingBetweenOneAndTen(value, 1, 10);
            this._rating = value;
        }

        release(query) {
            let name = this.name;
            if (typeof query === 'object') {
                if (query.hasOwnProperty('version')) {
                    VALIDATION.versionIsPositiveNumber(query.version);
                    VALIDATION.validateNewVersion(this.version, query.version);
                    this.version = query.version;
                } else {
                    throw new Error('Version property is missing!');
                }
                if (query.hasOwnProperty('description')) {
                    VALIDATION.isString(query.description);
                    this.description = query.description;
                }

                if (query.hasOwnProperty('rating')) {
                    VALIDATION.ratingBetweenOneAndTen(query.rating);
                    this.rating = query.rating;
                }
            } else {
                VALIDATION.validateNewVersion(this.version, query);
                this.version = query;
                releaseAll.version = query;
            }
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

        release(query) {
            super.release(query);
        }

        uploadApp(app) {
            VALIDATION.validateValidInstaneAppClass(app);

            let searchName = this.apps.find(value => value.name === app.name);
            if (searchName === undefined) {
                this.apps.push(app);
            } else {
                VALIDATION.validateNewVersion(searchName.version, app.version);
                searchName.description = app.description;
                searchName.version = app.version;
                searchName.rating = app.rating;
            }
            return this;
        }

        takedownApp(name) {
            let isMissing = true;
            for (let i = 0; i < this.apps.length; i++) {
                if (this.apps[i].name === name) {
                    this.apps.splice(i, 1);
                    isMissing = false;
                    break;
                }
            }
            if (isMissing) {
                throw new Error('Tha name is missing in store!');
            }
            return this;
        }

        search(pattern) {
            return this.apps.filter(function(app) {
                    return app.name.toLowerCase().indexOf(pattern.toString().toLowerCase()) >= 0 ||
                        app.description.toLowerCase().indexOf(pattern.toString().toLowerCase()) >= 0 ||
                        app.version.toString().indexOf(pattern.toString()) >= 0 ||
                        app.rating.toString().indexOf(pattern.toString()) >= 0
                })
                .slice()
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
            if (count === undefined || count === '') {
                count = 10;
            }

            if (count > this.apps.length) {
                return this.apps
                    .slice()
                    .sort((a, b) => b.version - a.version)
            }
            return this.apps
                .slice()
                .sort((a, b) => b.version - a.version)
                .slice(0, count);
        }

        listMostPopularApps(count) {
            if (count === undefined || count === '') {
                count = 10;
            }

            if (count > this.apps.length) {
                return this.apps
                    .slice()
                    .sort(function(a, b) {
                        let tmpRating = b.rating - a.rating;
                        let tmpVersion = b.version - a.version;
                        if (tmpRating === 0) {
                            return tmpVersion;
                        }
                        return tmpRating;
                    });
            }
            return this.apps
                .slice()
                .sort(function(a, b) {
                    let tmpRating = b.rating - a.rating;
                    let tmpVersion = b.version - a.version;
                    if (tmpRating === 0) {
                        return tmpVersion;
                    }
                    return tmpRating;
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
            VALIDATION.validateHostName(value, 1, 32);
            this._hostname = value;
        }

        get apps() {
            return this._apps;
        }

        set apps(array) {
            VALIDATION.validatePreInstalledApps(array);
            this._apps = array;
        }

        search(pattern) {
            return this.apps.filter(function(app) {
                    return app.name.toLowerCase().indexOf(pattern.toString().toLowerCase()) >= 0 ||
                        app.description.toLowerCase().indexOf(pattern.toString().toLowerCase()) >= 0 ||
                        app.version.toString().indexOf(pattern.toString()) >= 0 ||
                        app.rating.toString().indexOf(pattern.toString()) >= 0
                })
                .slice()
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

        install(name) {
            let isInstalled = false;
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
// // App
// let stores = solve();
// let app = stores.createApp('Dory1', 'evil', 6, 6); //ok
// let app1 = stores.createApp('Doroteya2', 'good', 8, 9); //ok
// let app2 = stores.createApp('Doroteya3', 'newDescrtiption', 77, 7); //ok

// let app3 = stores.createApp('Dory4', 'evil', 6, 10); //ok
// let app4 = stores.createApp('Doroteya5', 'good', 8, 9); //ok
// let app5 = stores.createApp('Doroteya6', 'newDescrtiption', 77, 7); //ok

// // app.release(7); // ok
// // console.log(app);
// app1.release({ version: 8, description: 'new description', rating: 8 }); // ok
// // console.log(app);


// // // Store
// // let store = stores.createStore('Doroteya', 'any description', 7, 7)
// // console.log(store); // ok

// // store.release(17);
// // console.log(store);

// // // uploadApp 
// // console.log(store.uploadApp(app));
// // console.log(store.uploadApp(app1));
// // console.log(store.uploadApp(app2)); // ok

// // console.log(store.takedownApp('Dory')); // ok
// // console.log(store.search('7'));

// // console.log(store.listMostRecentApps(2)); // ok

// // console.log(store.listMostPopularApps());

// // // Device
// let device = stores.createDevice('newHost', [app]);
// console.log(device.search('Dory'));
// device.install('Doroteya2');
// console.log(device);
// Submit the code above this line in bgcoder.com
module.exports = solve;