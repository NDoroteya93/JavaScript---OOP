'use strict';

// object literal
let myModule = {
    name: 'Will',
    age: 34,
    sayName: function() {
        return this.name;
    },
    setName: function(newName) {
        this.name = newName;
    }
}

console.log(myModule.sayName());

// Some ground rules:
//  * self-container module
//  - everything to do with my module is in my module
// - no global variables
// - if a module manages more than one thing it should be split up
// * separation of concerns
// DRY code: Don't repeat Yourself
// - efficient DOM usage
// - very few $(selections)
// - no momery leaks
// - all events can be bound

// Anonymous Closures

// Alll of the code that runs inside the function lives in a closure, which provide privacy and state
(function() {
    //it all vars and functions in this scope only
    // stil maintains access to all globals
}())

// () around the anonymous function. Including () creates a function expression

// Global Import

(function($, YAHOO)) {
    // now have access to global jquery (as $) and YAHOO in this code
}

// Module Export

// Using anonymous function`s return value. Doing so will complete the basic module patter

let MODULE = (function() {
    let my = {},
        privateVariable = 1;

    function privateMethod() {}

    my.moduleProperty = 1;
    my.moduleMethod = {};

    return my;
}());

///////////////////////////////ADVANCED PATTERNS ///////////////////////////////

// Augmentation
// First, we import the module, then we add properties, then we export it

let MODULE = (function(my) {
    my.anotherMethod = function() {
        // added method
    };

    return my;
}(MODULE));

// Loose Augmentation

// flexible multi-part modules that can load themselves in any order with loose Augmentation.
// In this pattern, the var statement is always necessary.

let MODULE = (function(my) {
    // add capabilities..

    return my;
}(MODULE || {}));

// Tight Augmentation

//  implies a set loading  a set loading order, bu allows overrides/

let MODULE = (function(my) {
    let old_moduleMethod = mu.moduleMethod;
    my.ModuleMethod = function() {
        // method override, has access to old through old_moduleMethod...
    };

    return my;
}(MODULE));

// Cloning and Inhnritance

// This pattern is perhaps the least flexible option.

let MODULE_TWO = (function(old) {
    let my = {},
        key;

    for (key in old) {
        if (old.hasOwnProperty(key)) {
            my[key] = old[key];
        }
    }
    let super_moduleMethod = old.moduleMethod;
    my.moduleMethod = function {
        // override method on the clone, access to super through super_moduleMethod
    };

    return my;
}(MODULE));

// Cross-File Private State

// One severe limitation of splitting a module across multiple files is that each file maintains its own private state, and does not get access to the private state  of the other files.
// Example of a loosely augmented module that will maintain private state
let MODULE = (function(my) {
    let _private = my._private || {},
        _seal = my._seal || function() {
            delete my._private;
            delete my._seal;
            delete my._unseal;
        },
        _unseal = my._unseal = my._unseal || function() {
            my._private = _private;
            my._seal = _seal;
            my._unseal = _unseal;
        };

    // permanent access to _private, _seal and _unseal
    return myl
}(MODULE || {}));


// Sub-modules

MODULE.sub = (function() {
    let my = {};


    return my;
}());



// call() and apply() are predefined JavaScript function methods

/////////////////////////////
let Class = function() {
    let klass = function() {
        this.init.apply(this, argument);
    }
    klass.prototype.init = function() {};

    // Shortcust to access prototype
    klass.fn = klass.prototype;

    // Shortcust to access Class
    klass.fn.parent = klass;

    // Adding class properties
    klass.extend = function(obj) {
        let extended = obj.extended;
        for (let i in obj) {
            klass[i] = obj[i];
        }
        if (extended) {
            extended(klass);
        }
    }

    // Adding instance properties
    klass.include = function(obj) {
        let included = obj.included;
        for (let i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included) {
            included(klass);
        }
    };
    return klass;
}

let Person = new Class;

Person.extend({
    find: function(id) {},
    exists: function(id) {}
});

Person.include({
    save: function(id) {},
    destroy: function(id) {}
});

let person = new Person;
person.save();

///////////////////////////

let ORMModule = {
    save: function() {
        // Shared function
    }
};
let Person = new Class;
let Asset = new Class;

Person.include(ORMModule);
Asset.include(ORMModule);