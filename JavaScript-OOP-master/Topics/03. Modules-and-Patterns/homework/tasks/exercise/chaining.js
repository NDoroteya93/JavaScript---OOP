'use strict';

// Custom class with a few methods to call

let Kitten = function() {
    this.name = 'Garfield';
    this.color = 'brown';
    this.gender = 'male';
}

Kitten.prototype.setName = function(name) {
    this.name = name;
    return this;
}

Kitten.prototype.setColor = function(color) {
    this.color = color;
    return this;
}

Kitten.prototype.setGender = function(gender) {
    this.gender = gender;
    return this;
}

Kitten.prototype.save = function() {
    console.log(
        'saving ' + this.name + ', the ' + this.color + ' ' + this.gender + ' kitten..'
    );
    return this;
}

// Instantiate a kitten object
// Without CHAINING
let bob = new Kitten();

bob.setName('Bob');
bob.setColor('black');
bob.setGender('male');

bob.save();

// Better
bob.setName('Bob').setColor('Black');

///////////////////////
// WITH CHAINING

new Kitten()
    .setName('Dori')
    .setColor('pink')
    .setGender('female')
    .save();