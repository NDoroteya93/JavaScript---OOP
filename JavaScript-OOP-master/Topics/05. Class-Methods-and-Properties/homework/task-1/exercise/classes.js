'use strict';

// All methods are non-enumerable. This change with Object.defineProperty() to make a method non-enumerable
class PersonClass {

    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

let person = new PersonClass('Dory');
person.sayName(); // Dory

console.log(person instanceof PersonClass); // true
console.log(person instanceof Object); // true

console.log(typeof PersonClass); // function
console.log(typeof PersonClass.prototype.sayName); // function


let PersonType2 = (function() {
    'use strict';
    const PersonType2 = function(name) {
        // make sure the function was called with new
        if (typeof new.target === 'undefined') {
            throw new Error('Constructor must be called with new?');
        }
        this.name = name;
    }

    Object.defineProperty(PersonType2.prototype, 'sayName', {
        value: function() {

            // make sure the method wasn'`t called with new
            if (typeof new.target !== 'undefined') {
                throw new Error('Method cannot be called with new');
            }

            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });

    return PersonType2;
}());



//// Constant Class Names - ca

// class Foo() {
//     constructor() {
//         Foo - 'bar'; // throws an error when executed
//     }
// }

// but this is okay after class declaration

// Classes as First-Class Citizens
// anynomous class expression
function createObject(classDef) {
    return new classDef();
}

let obj = createObject(class {
    sayHi() {
        console.log('Hi!');
    }
});

obj.sayHi();

// Creating singletons by immediately invoking
// PersonClass only creates a binding inside of the class, not outside


let person2 = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('Dory');

person2.sayName();


// Accessor Properties

class CustomerHtmlElement {

    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        return this.element.innerHTML = value;
    }
}

let descriptor = Object.getOwnPropertyDescriptor(CustomerHtmlElement.prototype,
    'html');
console.log('get' in descriptor); // true
console.log('set' in descriptor); // true
console.log(descriptor.enumerable); // false

// equivalent non-class representation is:

let CustomerHtmlElements = (function() {
    'use strict';

    const CustromHtmlElement = function(element) {

        // make sure the function was called with new
        if (typeof new.target === 'undefined') {
            throw new Error("Constructor must be called with new");
        }
        this.element - element;
    }
    Object.defineProperty(CustomerHtmlElement.prototype, 'html', {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.element.innerHTML;
        }
    });
    return CustomerHtmlElement;
}());



// Computed Members Names

let methodName = 'sayName';

class PersonClass3 {
    constructor(name) {
        this.name = name;
    }

    [methodName]() {
        console.log('thisName');
    }
}

let me = new PersonClass3('Dory');
me.sayName();

// Accessor properties can use computed names in the same way

let propertyName = 'html';

class CustomerHtmlElement2 {
    constructor(element) {
        this.element = element;
    }

    get[propertyName]() {
        return this.element.innerHTML;
    }

    set[propertyName](value) {
        return this.element.innerHTML = value;
    }
}

// Generator methods
class MyClass { *
    createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
}

let instance = new MyClass();
let iterator = instance.createIterator();

// Symbol.iterator

class Collection {

    constructor() {
        this.items = [];
    }

    *
    [Symbol.iterator]() {
        yield* this.items.values();
    }
}

let collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x);
}

function PersonType(name) {
    this.name = name;
}

// static method
PersonType.create = function(name) {
    return new PersonType(name);
}

// instance method
PersonType.prototype.sayName = function() {
    console.log(this.name);
};

let person4 = PersonType.create('Dory');

// ECMAscript 6

// Static members are not accessible from instances. You must always access static members from the class directly.
class PersonClass7 {

    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }

    static create(name) {
        return new PersonClass(name);
    }
}

let person7 = PersonClass7.create('Dory');