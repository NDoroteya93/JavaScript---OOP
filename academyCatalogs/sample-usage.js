'use strict';

function solve() {
    // poznai :D
    /////////////////////////////////////////// // пусни си филм през това време!!!!!!!!!!!! ////////////////////////////////////////////
    const getUniqueId = (function() {
        let id = 0;

        return function() {
            ++id;
            return id;
        }
    })();

    const VALIDATION = {
        isEmptyString: function(str) {
            if (typeof str !== 'string' || str.length === 0 || str === '' || str === undefined) {
                throw new Error('Invalid Empry string!');
            }
        },
        validateStringRange: function(str, min, max) {
            this.isEmptyString(str);
            if (str.length < min || str.length > max) {
                throw new Error('Invalid Range string!');
            }
        },
        validateIsbnDigits: function(value) {
            this.isEmptyString(value);
            if (!(/^[0-9]{10}|[0-9]{13}$/g.test(value))) {
                throw new Error(`Invalis isbn length!`);
            }
        },
        numberGreaterThanZero: function(n) {
            if (typeof n !== 'number' || isNaN(n) || n < 0) {
                throw new Error('Invalid Number'); //
            }
        },
        validateRating: function(n, min, max) {
            this.numberGreaterThanZero(n);
            if (n < min || n > max) {
                throw new Error('Invalid Rating number!');
            }
        },
        validateAddItemsLength: function(value) {
            if (value.length === 0) {
                throw new Error('The array is empty!');
            }
        },
        validateItemLikeObject: function(value) {
            try {
                this.isEmptyString(value);
                this.validateStringRange(value, 2, 40); //
            } catch (e) {
                throw new Error('Invalid item object');
            }
        }
    }

    class Item {
        constructor(name, description) {
            this._id = getUniqueId();
            this.description = description;
            this.name = name;
        }

        get id() {
            return this._id;
        }

        get description() {
            return this._description;
        }

        set description(value) {
            VALIDATION.isEmptyString(value);
            this._description = value;
        }

        get name() {
            return this._name;
        }

        set name(value) {
                VALIDATION.validateStringRange(value, 2, 40);
                this._name = value;
            } //test
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
                super(name, description);
                this.isbn = isbn;
                this.genre = genre;
            }
            // ahhaha eiii varvi da qdesh .. :D Kkak stigaa az qdoh 3 pati do sega :D
            // :D: D::D:D:D::D stiga me razsmiva!!!!

        get isbn() {
            return this._isbn;
        }

        set isbn(value) {
            VALIDATION.validateIsbnDigits(value);
            this._isbn = value;
        }

        get genre() {
            return this._genre;
        }

        set genre(value) {
            VALIDATION.validateStringRange(value, 2, 20); // yes
            this._genre = value;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);
            this.rating = rating;
            this.duration = duration;
        }

        get rating() {
            return this._rating;
        }

        set rating(value) {
            VALIDATION.validateRating(value, 1, 5);
            this._rating = value;
        }

        get duration() {
            return this._duration;
        }

        set duration(value) {
                VALIDATION.numberGreaterThanZero(value); // |( - NESHTASTNO CHOVECHE
                this._duration = value;
            } // da
    }

    class Catalog { // ok nqma nujda ot items
        constructor(name) {
            this._id = getUniqueId();
            this.name = name;
            this._items = [];
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            VALIDATION.validateStringRange(value, 2, 40);
            this._name = value;
        }

        get items() {
            return this._items;
        }

        add(...items) {
            VALIDATION.validateAddItemsLength(...items);
            items.forEach(item => VALIDATION.validateItemLikeObject(item));

            this.items.push(...items);

            return this;
        }
    }

    return {
        getBook: function(name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function(name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getCatalog: function(name) {
            return new Catalog(name);
        },

        getBookCatalog: function(name) {
            //return a book catalog instance
        },
        getMediaCatalog: function(name) {
            //return a media catalog instance
        }
    };
}

var module = solve();
// mnogo pozdraviii :D neee ne mu vikai ////////////////////////////////////// lelellelellelelelelelle a taka!
// var item = module.getItem('Dory', 'no description'); // be 2 - 40
// console.log(item); //

let book1 = module.getBook('The secrets of the JavaScript Ninja', '1234567891234', 'IT', 'A book about JavaScript');

let media = module.getMedia('Dory', 5, 2, 'description'); // nee ne mu davai da gleda
console.log(media); //

let catalog = module.getCatalog('Dory');
console.log(catalog);

console.log(catalog.add(book1, media)); // razbra te, dokato ne sbarkam pak ;d
// var book2 = module.getBook('JavaScript: The Good Parts', '0123456789', 'IT', 'A good book about JS');
// catalog.add(book1);
// catalog.add(book2);

// console.log(catalog.find(book1.id));
// //returns book1

// console.log(catalog.find({ id: book2.id, genre: 'IT' }));
// //returns book2

// console.log(catalog.search('js'));
// // returns book2

// console.log(catalog.search('javascript'));
// //returns book1 and book2

// console.log(catalog.search('Te sa zeleni'))
//returns []