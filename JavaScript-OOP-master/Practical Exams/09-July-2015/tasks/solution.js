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
        if (+number < 0) {
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
        if (id === null || id === undefined) {
            throw new Error('Id is missing');
        }

        if (typeof id !== 'number') {
            throw new Error('Id is not a number')
        }
    }

    function notNumberValidation(number) {
        if (typeof number !== 'number' || isNaN(number)) {
            throw new Error('Not valid number');
        }

        if (number < 1) {
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

        set duration(newDuration) {
            valudateGreaterNumber(newDuration);
            this._duration = newDuration;
        }

        get rating() {
            return this._rating;
        }

        set rating(rating) {
            validateRating(newRating, 1, 5);
            this._rating = rating;
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
        constructor(name) {
            super(name);
        }
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
            for (let media of medias) {
                if (typeof media !== 'object') {
                    throw new Error();
                }

                valudateGreaterNumber(media.id);
                nonEmptyStr(media.description);
                strLength(media.name, 2, 40);
            }
            return super.add(medias);
        }

        getTop(count) {
            let rating = [];
            notNumberValidation(count);
            this._items.sort((a, b) => a.rating + b.rating);
            for (let i = 0; i < +count; i += 1) {
                rating.push(this._items[i].rating);
            }

            return this._items
                .slice()
                .sort((a, b) => a.rating + b.rating)
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

        find(options) {
            if (typeof options === 'object') {
                const medias = super.find(options);
                if (options.hasOwnProperty('rating')) {
                    return medias.filter((media) => media.rating === options.media);
                }
                return medias;
            }

            return super.find(options);
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

// let book = solve().getBook('Fifty Shades', '3245435498', '423sacfsrrgthtrshr6jmksrgres5dsfa353', 'description');

// let book1 = solve().getBook('Fifty Shades 2', '3245254354', '4235dsfa353', 'description');

// console.log(book);
// console.log(book1);

module.exports = solve;