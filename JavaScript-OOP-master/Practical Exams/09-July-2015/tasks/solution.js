'use strict';

function solve() {

    const getUniqueId = (function() {
        let id = 0;

        return function() {
            id += 1;
            return id;
        }
    })();

    ////// Validation////////////////

    function nonEmptyStr(str) {
        if (str === '' || str.length === 0) {
            throw new Error('Empty string!');
        } else {
            return str;
        }
    }

    function strLength(str, min, max) {
        if (str.length < min && str.length > max) {
            throw new Error('String is not valid!')
        }
    }

    function validateIsbn(isbn) {
        if (/\D/.test(isbn)) {
            throw new Error('Not valid isbn!');
        }

        if (isbn.length !== 10 || isbn.length !== 13) {
            throw new Error('Isbn is not valid!');
        } else {
            return isbn;
        }
    }

    function valudateGreaterNumber(number) {
        if (+number < 0) {
            throw new Error('Number is not a valid');
        } else {
            return number;
        }
    }

    function validateRating(number, min, max) {
        if (+number < min && +number > max) {
            throw new Error('Not valid number');
        } else {
            return number;
        }
    }

    function validateToFindId(id) {
        if (id === null || id === undefined) {
            throw new Error('Id is missing');
        }

        if (typeof id !== 'number') {
            throw new Error('Id is not a number')
        }
    }


    class Item {
        constructor(description, name) {
            this.id = getUniqueId();
            this._description = description;
            this._name = name;
        }

        get name() {
            return this._name;
        }

        set name(name) {
            strLength(name, 2, 40);
            this._name = name;
        }

        get description() {
            return this._description;
        }

        set description(newDescr) {
            nonEmptyStr(newDescr);
            this._description = newDescr;
        }
    }

    class Book extends Item {
        constructor(isbn, genre) {
            this._isbn = isbn;
            this._genre = genre;
        }

        get isbn() {
            return this._isbn;
        }

        set isbn(newIsbn) {
            validateIsbn(newIsbn);
            this._isbn = newIsbn;
        }

        get genre() {
            return this._genre;
        }

        set genre(newGenre) {
            strLength(newGenre, 2, 20);
            this._genre = newGenre;
        }
    }

    class Media extends Item {
        constructor(duration, rating) {
            this._duration = duration;
            this._rating = rating;
        }

        get duration() {
            return this._duration;
        }

        set duration(newDuration) {
            valudateGreaterNumber(newDuration);
            this._duration = newDuration;
        }

        get rating() {
            return this._rating;
        }

        set rating(newRating) {
            validateRating(newRating);
            this._rating = newRating;
        }
    }

    class Catalog {
        constructor(name) {
            this.id = getUniqueId();
            this._name = name;
            this._items = [];
        }

        get name() {
            return this._name;
        }

        set name(name) {
            strLength(item.name, 2, 40);
            this._name = name;
        }

        get items() {
            return this._items;
        }

        get id() {
            return this.id;
        }

        add(...items) {

            if (Array.isArray(items[0])) {
                items = items[0];
            }

            if (items.length === 0) {
                throw new Error('Not valid items')
            }

            for (let item of items) {
                if (typeof item !== 'object') {
                    throw new Error();
                }

                valudateGreaterNumber(item.id);
                nonEmptyStr(item.description);
                strLength(item.name, 2, 40);
            }

            this._items.push(items);
            return this;
        }

        find(args) {
            function findById(id) {
                validateToFindId(id);
                for (let item of this._items) {
                    if (item.id === id) {
                        return item;
                    }
                }
                return null;
            }

            function findByOptions(options) {
                let result = [];
                if (options.id) {
                    for (let item of this._items) {
                        if (item.id === options.id) {
                            result.push(item);
                        }
                    }
                } else if (options.name) {
                    for (let item of this._items) {
                        if (item.name === options.name) {
                            result.push(item);
                        }
                    }
                } else if (options.name && options.id) {
                    for (let item of this._items) {
                        if (item.name === options.name && item.id === options.id) {
                            result.push(item);
                        }
                    }
                }

                if (typeof args === 'object') {
                    return findByOptions.call(this, args);
                }
                return findById.call(this, args);
            }
        }

        search(pattern) {}
    }

    class BookCatalog extends Catalog {
        constructor() {}
        add(...books) {
            for (let book of books) {
                validateIsbn(book.isbn);
                strLength(book.genre, 2, 20);

                if (typeof book !== 'object') {
                    throw new Error('Not Valid Book');
                }

            }

            return super.add(books);
        }

        getGenres() {

            return this._items.map((item) =>
                    item.genre.toLoweCase())
                .sort((a, b) => a + b)
                .filter(function(elem, index, self) {
                    return index === self.indexOf(elem)
                });
        }

        find(options) {
            if (options.genr)
                super.find(options).findByOptions(options);
        }
    }

    return {
        getBook: function(name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function(name, rating, duration, description) {
            return new Media(name, rating, duration, description)
        },
        getBookCatalog: function(name) {
            // return a book catalog instance
        },
        getMediaCatalog: function(name) {
            // return a media catalog instance
        }
    };
}

module.exports = solve;