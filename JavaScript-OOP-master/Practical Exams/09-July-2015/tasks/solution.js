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
        if (typeof str !== 'string') {
            throw new Error();
        }
        if (str === '' || str.length === 0 || str === null) {
            throw new Error('Empty string!');
        }
    }

    function strLength(str, min, max) {
        if (str.length < min || str.length > max) {
            throw new Error('String is not valid!')
        }
        nonEmptyStr(str);

    }

    function validateIsbn(isbn) {

        if (typeof isbn !== 'string' || !isbn.match(/^([0-9]{10}|[0-9]{13})$/)) {
            throw 'Isbn is not valid';
        }
    }

    function valudateGreaterNumber(number) {
        let num = Number(number);
        if (isNaN(num) || typeof num !== 'number' || number === null) {
            throw new Error('Number is not a valid');
        }
        if (num < 1) {
            throw new Error('Number is not a valid');
        }
    }

    function validateRating(number, min, max) {
        if (isNaN(number)) {
            throw new Error('Not valid number');
        }
        if (+number < min || +number > max) {
            throw new Error('Not valid number');
        }
    }

    function validateToFindId(id) {
        if (typeof id !== 'number') {
            throw new Error('Id is not a number')
        }
        if (id === null || id === undefined) {
            throw new Error('Id is missing');
        }

    }

    function notNumberValidation(number, min) {

        // var num = Number(number);
        if (typeof number !== 'number' || isNaN(number)) {
            throw new Error('Not valid number');
        }

        if (number < min) {
            throw new Error('Not valid number');
        }
    }


    class Item {
        constructor(name, description) {
            this._id = getUniqueId();
            this.description = description;
            this.name = name;
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

        get id() {
            return this._id;
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

        set isbn(isbn) {
            validateIsbn(isbn);
            this._isbn = isbn;
        }

        get genre() {
            return this._genre;
        }

        set genre(genre) {
            strLength(genre, 2, 20);
            this._genre = genre;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);
            this.duration = duration;
            this.rating = rating;
        }

        get duration() {
            return this._duration;
        }

        set duration(duration) {
            valudateGreaterNumber(duration);
            this._duration = duration;
        }

        get rating() {
            return this._rating;
        }

        set rating(rating) {
            validateRating(rating, 1, 5);
            this._rating = rating;
        }
    }

    class Catalog {
        constructor(name) {
            this._id = getUniqueId();
            this.name = name;
            this._items = [];
        }

        get name() {
            return this._name;
        }

        set name(name) {
            strLength(name, 2, 40);
            this._name = name;
        }

        get items() {
            return this._items;
        }

        get id() {
            return this._id;
        }

        add(...items) {

            if (Array.isArray(items[0])) {
                items = items[0];
            }

            if (items.length === 0) {
                throw new Error('Not valid items')
            }

            items.forEach(item => {
                if (typeof item !== 'object') {
                    throw new Error();
                }

                valudateGreaterNumber(item.id);
                nonEmptyStr(item.description);
                strLength(item.name, 2, 40);
            });

            this._items.push(...items);
            return this;
        }

        find(arg) {
            function findById(id) {
                if (typeof id !== 'number') {
                    throw 'Invalid id';
                }

                return this._items.find(item => item.id === id) || null;
                /*
                const item = this._items.find(item => item.id === id);
                if(typeof item === 'undefined') {
                	item = null;
                }
                return item;
                */
            }

            function findByOptions(options) {
                return this._items.filter(item => {
                    return (
                        (!options.hasOwnProperty('name') || item.name === options.name) &&
                        (!options.hasOwnProperty('id') || item.id === options.id));
                });
            }

            if (typeof arg === 'object') {
                return findByOptions.call(this, arg);
            }
            return findById.call(this, arg);
        }

        search(pattern) {
            nonEmptyStr(pattern);
            return this._items.filter(item => {
                return (
                    item.name.indexOf(pattern) >= 0 ||
                    item.description.indexOf(pattern) >= 0);
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

            books.forEach(book => {
                if (typeof book !== 'object') {
                    throw new Error('Invalid book');
                }

                validateIsbn(book.isbn);
                strLength(book.genre, 2, 20);
            });

            return super.add(books);
        }

        getGenres() {
            return this._items
                .map(book => book.genre.toLowerCase())
                .sort()
                .filter((genre, index, genres) => genre !== genres[index - 1]);
        }

        find(options) {

            if (typeof options === 'object') {
                const books = super.find(options);

                // found by genre
                if (options.hasOwnProperty('genre')) {
                    return books.filter(book => book.genre === options.genre);
                }
                return books;
            }
            return super.find(options);
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

            medias.forEach(media => {
                if (typeof media !== 'object') {
                    throw new Error();
                }

                valudateGreaterNumber(media.id);
                nonEmptyStr(media.description);
                strLength(media.name, 2, 40);
            });

            return super.add(medias);
        }

        getTop(count) {
            notNumberValidation(count, 1);
            return this._items
                .slice()
                .sort((a, b) => b.rating - a.rating)
                .slice(0, count)
                .map(x => {
                    return {
                        name: x.name,
                        id: x.id
                    }
                });
        }

        getSortedByDuration() {
            return this._items
                .slice()
                .sort((a, b) => b.duration - a.duration);
        }

        find(arg) {
            if (typeof arg === 'object') {
                const medias = super.find(arg);
                if (arg.hasOwnProperty('rating')) {
                    return medias.filter(media => media.rating === arg.rating);
                }
                return medias;
            }

            return super.find(arg);
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
            return new BookCatalog(name);
        },
        getMediaCatalog: function(name) {
            // return a media catalog instance
            return new MediaCatalog(name);
        }
    };
}


module.exports = solve;