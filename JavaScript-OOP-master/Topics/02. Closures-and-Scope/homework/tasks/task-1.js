/* Task Description */
/*
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */

'use strict';

function solve() {
    var library = (function() {
        var books = [];
        var categories = [];

        function listBooks() {
            var object = arguments[0];
            if (object) {
                var filterObj = books.filter((book) => book.category === object.category);

                return filterObj;
            }

            return books;
        }

        function addBook(book) {

            if (!book.title || !book.author || !book.isbn) {
                throw new Error('Missing title, author or isbn');
            }
            // Check if title is 2 and 100 characters
            if (book.title.length < 2 || book.title.length > 100) {
                throw new Error('Invalid title (short)');
            }
            // Check if title or isbn already exist
            var foundTitle = books.some(function(titleBook) {
                return titleBook.title === book.title;
            });
            var foundIsbn = books.some(function(isbnBook) {
                return isbnBook.isbn === book.isbn;
            });
            if (foundTitle || foundIsbn) {
                throw new Error('Already exist!');
            }

            // Check if Author exist
            if (typeof book.author === 'undefined') {
                throw new Error('Author is missing!');
            }
            // Check if isbn is Number and the length is 10 or 13
            var isDigit = /^\d+$/.test(book.isbn);
            if (!isDigit || !(book.isbn.length === 10 || book.isbn.length === 13)) {
                throw new Error('Invalid isbn');
            }

            book.ID = books.length + 1;

            // Create automatically category, if is missing
            var existCategory = categories.includes(book.category);
            if (!existCategory) {
                categories.push(book.category);
            }

            books.push(book);
            return book;
        }

        function listCategories() {
            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}
module.exports = solve;