'use strict';
let month = function() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return {
        number: function(name) { return months.indexOf(name) },
        name: function(number) { return months[number] }
    }
}();

(function(exports) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    exports.number = function(name) { return months.indexOf(name) };
    exports.name = function(number) { return months[number] }
})(this.month = {})

console.log(month.name(2));

console.log(month.number("November"));