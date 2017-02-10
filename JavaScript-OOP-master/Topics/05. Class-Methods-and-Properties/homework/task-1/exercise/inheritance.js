'use strict';

// Inheritance with Derived Classes
// -  required multiple steps - For instance, consider this example

// Square inherits from Rectangle

function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};

let rectangle = new Rectangle(3, 5);

console.log(rectangle.getArea()); // 15

// overwrite Square.prototype with a new object created from Rectangle.prototype as well as call the Rectangle.call() method
function Square(length) {
    Rectangle.call(this, length, length);
}

Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value: Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});

let square = new Square(3);

console.log(square.getArea()); // 9
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true

// extends keyword  - the function from which the class should inherit. The prototypes are automatically adjusted, and you can access tha base class constructor by calling the super() method

class Rectangle2 {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.width * this.length;
    }

}

class Square2 extends Rectangle2 {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);

    }
}

let square2 = new Square2(4);

console.log(square2.getArea()); // 16
console.log(square2 instanceof Square2); // true
console.log(square2 instanceof Rectangle2); // true

// Classes that inherit from other classes are referred to as derived classes

// class Square3 extends Rectangle {
//     // no constructor
// }

// is equivalent to

// class Square extends Rectangle {
//     constructor(...args){
//         super(...args);
//     }
// }


//////////////////////////////////// super() //////////////////////////////////

// 1. You can only use super() in a derived class.
// 2. You must call super() before accessing this in the constructor
// 3. The only way to avoid calling super() is to return object from the class constructor

//////////////////////////// SHADOWING METHODS ////////////////////////////////////////////

// class Square extends Rectangle {
//     constructor(length) {
//         super(length, length);
//     }

//     // override, shadow, and call Rectangle.prototype.getArea()
//     getArea() {
//         return super.getArea();
//     }
// }

//////////////////////////// INherit Static Members  ////////////////////////////////////////////

class Rectangle4 {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    static create(length, width) {
        return new Rectangle4(length, width);
    }
}

class Square4 extends Rectangle4 {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}

let rect = Square4.create(3, 4);

console.log(rect instanceof Rectangle4); // true
console.log(rect.getArea()); // 12
console.log(rect instanceof Square4);