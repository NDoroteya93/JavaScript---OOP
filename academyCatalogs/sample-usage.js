'use strict';

function solve() {
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
            if (!(/^([0-9]{10}|[0-9]{13})$/g.test(value))) {
                throw new Error(`Invalis isbn length!`);
            }
        },
        numberGreaterThanZero: function(n, min) {
            if (typeof n !== 'number' || isNaN(n) || n < min) {
                throw new Error('Invalid Number'); //
            }
        },
        validateRating: function(n, min, max) {
            this.numberGreaterThanZero(n, 0);
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
                this.isEmptyString(value.description);
                this.validateStringRange(value.name, 2, 40); //
            } catch (e) {
                throw new Error('Invalid item object');
            }
        },
        validateBookLikeObject: function(value) {
            try {
                this.validateIsbnDigits(value.isbn);
                this.validateStringRange(value.genre, 2, 20);
            } catch (e) {
                throw new Error('Invalid Book object!');
            }
        },
        validateMediaLikeObject: function(value) {
            try {
                this.validateRating(value.rating, 1, 5);
                this.numberGreaterThanZero(value.duration, 0);
            } catch (e) {
                throw new Error('Invalid Media object!');
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
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(name, description);
            this.isbn = isbn;
            this.genre = genre;
        }

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
            VALIDATION.validateStringRange(value, 2, 20);
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
            VALIDATION.numberGreaterThanZero(value, 1);
            this._duration = value;
        }
    }

    class Catalog {
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
            if (Array.isArray(items[0])) {
                items = items[0];
            }
            VALIDATION.validateAddItemsLength(...items);
            items.forEach(item => VALIDATION.validateItemLikeObject(item));

            this.items.push(...items);

            return this;
        }

        find(query) {

            if (typeof query === 'object') {

                return this.items.filter(function(x) {
                    return (!query.hasOwnProperty('id') || query.id === x.id) &&
                        (!query.hasOwnProperty('name') || query.name === x.name);

                });
            }

            VALIDATION.numberGreaterThanZero(query, 0);
            let item = this.items.find(x => x.id === query);
            if (item === undefined) {
                return null;
            }
            return item;

        }

        search(pattern) {
            VALIDATION.isEmptyString(pattern);
            return this.items.filter(function(item) {
                return item.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0 ||
                    item.description.toLowerCase().indexOf(pattern.toLowerCase()) >= 0;
            });
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }
        add(...books) {

            if (Array.isArray(books[0])) {
                books = books[0];
            }
            books.forEach(book => VALIDATION.validateBookLikeObject(book));

            return super.add(books);
        }

        getGenres() {
            return this.items
                .map(x => x.genre.toLowerCase())
                .sort()
                .filter((genre, index, genres) => genre !== genres[index - 1]);
        }

        find(query) {
            if (typeof query === 'object') {
                let books = super.find(query);
                if (query.hasOwnProperty('genre')) {
                    return books.filter(x => x.genre === query.genre);
                }
            }

            return super.find(query);
        }
    }
    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }
        add(...medias) {
            if (Array.isArray(medias[0])) {
                medias = medias[0];
            }
            medias.forEach(media => VALIDATION.validateMediaLikeObject(media));
            return super.add(medias);
        }

        getTop(count) {
            VALIDATION.numberGreaterThanZero(count, 1)
            return this.items
                .slice()
                .sort((a, b) => a.rating + b.rating)
                .slice(0, count)
                .map(function(x) {
                    return {
                        id: x.id,
                        name: x.name
                    }
                });
        }

        getSortedByDuration() {
            return this.items
                .slice()
                .sort((a, b) => b.duration - a.duration);
        }

        find(query) {
            if (typeof query === 'object') {
                let medias = super.find(query);
                if (query.hasOwnProperty('rating')) {
                    return medias.filter(media => media.rating === query.rating);
                }
            }
            return super.find(query);
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
            return new BookCatalog(name);
        },
        getMediaCatalog: function(name) {
            return new MediaCatalog(name);
        }
    };
}


var module = solve();

let book1 = module.getBook('The secrets of the JavaScript Ninja', '1234567891234', 'IT', 'A book about JavaScript');

let book2 = module.getBook(' JavaScript Ninja', '1234567891234', 'neshto si', 'JavaScript');
let book3 = module.getBook('Ninja', '1234567891234', 'neshto si', 'JavaScript');

let media = module.getMedia('dory', 5, 26, 'description'); // 
let media1 = module.getMedia('dory1', 2, 100, 'description1'); // 
let media2 = module.getMedia('dory2', 1, 83, 'description2'); // 
let media3 = module.getMedia('dory4', 4, 98, 'description3'); // 
let media4 = module.getMedia('dory5', 3, 36, 'description4'); // 
let media5 = module.getMedia('dory6', 2, 2, 'description5'); // 

let catalog = module.getCatalog('Dory');
let bookCatalog = module.getBookCatalog('Kalin'); // :D precakan si 
console.log(catalog); //
let arr = [book1, book2, book3]; // hmmm
console.log(catalog.add(arr)); // OK
console.log(bookCatalog.add(arr)); //hahhaha 
console.log(bookCatalog.getGenres());
console.log(bookCatalog.find({ genre: 'neshto si' })); // ok

let mediaCatalog = module.getMediaCatalog('Dory2');
let mediaArr = [media, media1, media2, media3, media4, media5];
mediaCatalog.add(mediaArr); // ok
console.log(mediaCatalog.getTop(3));
console.log(mediaCatalog.getSortedByDuration());

// console.log(catalog.find()); // da gospodine :D

// console.log(catalog.search('Dory')); // ahhaha ne ne iskam :D
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