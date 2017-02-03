'use strict';

function Person(name, street) {
    this.name = name;
    this.street = street;

    this.info = function() {
        return 'My name is ' + this.name + ' and I live on ' + this.street;
    }
}

let BobSmith = new Person('Bob Smith', '324 main st');

// return true
console.log(BobSmith instanceof Person);

function changeName(person) {
    person.name = 'Sue Smith';
}

////////////////////////////////////////// PROTOTYPES ///////////////////////////////////////////////////

function getSum(num1, num2) {
    return num1 + num2;
}
console.log('Num of arguments is ' + getSum.length);

function Mammal(name) {
    this.name = name;
    this.getInfo = function() {
        return 'The mammals name is ' + this.name;
    }
}

Mammal.prototype.sound = 'Grr';

Mammal.prototype.makeSound = function() {
    return this.name + ' says ' + this.sound;
}

let grover = new Mammal('Grover');

console.log(grover.makeSound());

for (var prop in grover) {
    console.log(prop + ' : ' + grover[prop]);
}

// Check if is has name property in object - true
console.log('name Property of grover ' + grover.hasOwnProperty('name'));

// Check the same for sound - false, because is prototype
console.log('sound Property of grover ' + grover.hasOwnProperty('sound'));

Array.prototype.inArray = function inArray(value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return true;
        }
    }

    return false;
}

let sampArray = [1, 2, 3, 4, 6];

console.log('3 in array ' + sampArray.inArray(3));

/////////////////////////////// Private methods ///////////////////////////////////////

function SecretCode() {
    let secretNum = 78;

    this.guessNum = function(num) {
        if (num > 78) {
            return 'Lower';
        } else if (num < 78) {
            return 'Higher';
        } else {
            return 'You guessed it';
        }
    }
}

var secret = new SecretCode();

// undefined
console.log('Value of secretNum : ' + secret.secretNum);

console.log('Is 70 the number : ' + secret.guessNum(70));

SecretCode.prototype.getSecret = function() {
    return this.secretNum;
}

console.log('The secret number is ' + secret.getSecret());

// GET, Set data from object
let address = {
    street: 'No Street',
    city: 'No City',
    state: 'No State',

    get getAddress() {
        return this.street + ',' + this.city + ', ' + this.state;
    },

    set setAddress(theAddress) {
        let parts = theAddress.toString().split(', ');
        this.street = parts[0] || '';
        this.city = parts[1] || '';
        this.state = parts[2] || '';
    }
}

address.setAddress = '123 main St, Piitsburgh, PA';

console.log('Address : ' + address.getAddress);

// Create constructor

function Point() {
    this.xPos = 0;
    this.yPos = 0;
}

// Attach new function
Object.defineProperty(Point.prototype, 'pointPos', {
    get: function() {
        return 'X : ' + this.xPos + ' Y : ' + this.yPos
    },
    set: function(thePoint) {
        var parts = thePoint.toString().split(', ');
        this.xPos = parts[0] || '';
        this.yPos = parts[1] || '';
    }
});

var aPoint = new Point();

aPoint.pointPos = '100, 200';

console.log('Point Position ' + aPoint.pointPos);


////////////////////////////////////////////////////

var Circle = function(radius) {
    this._radius = radius;
}

Circle.prototype = {
    set radius(radius) { this._radius - radius },
    get radius() { return this._radius; },
    get area() { return Math.PI * (this._radius * this._radius) }
}

let circ = new Circle(10);

circ.radius = 15;

console.log('A circle with radius ' + circ.radius + ' has a area of ' + circ.area.toFixed(2));

////////////////////////////////////////////////////

function Animal() {
    this.name = 'Animal';

    this.toString = function() {
        return 'My name is ' + this.name;
    };
}

function Canine() {
    this.name = 'Canine';
}

function Wolf() {
    this.name = 'Wolf';
}

Canine.prototype = new Animal();
Wolf.prototype = new Canine();

Canine.prototype.constructor = Canine;
Wolf.prototype.constructor = Wolf;

var actiolWolf = new Wolf();

console.log(actiolWolf.toString());
console.log('Wolf instance of Animal : ' + (actiolWolf instanceof Animal));

Animal.prototype.sound = 'Grr';
Animal.prototype.getSound = function() {
    return this.name + ' says ' + this.sound;
}

Canine.prototype.sound = 'Woof';
Wolf.prototype.sound = 'Grrr Wolf';

console.log(actiolWolf.getSound());

// extend function ///////////////////////////////////////////

function extend(Child, Parent) {
    let Temp = function() {}
    Temp.prototype = Parent.prototype;

    Child.prototype = new Temp();

    Child.prototype.constructor = Child;
}
extend(Deer, Animal);

function Deer() {
    this.name = 'Deer';
    this.sound = 'Short';
}

let elk = new Deer();

console.log(elk.getSound());

/////////////////////////////////////////////////////////

var dayName = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    return function(number) {
        return names[number];
    };
}();

console.log(dayName(3));

///////////////////////////////

// If an expression starts with the keyword function, it is a function expression
// if a statement starts with function, it is a function declaration, which requires a name and, not being an expression, cannot be called by writing parentheses after it
(function() {
    function square(x) { return x * x; }
    var hundred = 100;

    console.log(square(hundred));
})();

///////////////////

var weekDay = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name); }
    };
}();


console.log(weekDay.name(weekDay.number("Sunday")));


////////////////////////////////////////////////
// Outside of a function, this refers to the global scope object
// This pattern is commonly used by JavaScript modules intended for the browser

(function(exports) {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    exports.name = function(number) {
        return names[number];
    };
    exports.number = function(name) {
        return names.indexOf(name);
    };
})(this.weekDay = {});

console.log(weekDay.name(weekDay.number("Saturday")));