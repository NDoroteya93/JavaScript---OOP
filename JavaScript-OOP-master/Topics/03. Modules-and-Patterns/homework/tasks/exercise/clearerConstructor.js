'use strict';

function Book(title, author, numPages) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.currentPage = 0;
}

let newBook = new Book('JavaScript', 'Marijn Haverbeke', 10);

// Versus:

function Books(config) {
    this.title = config.title;
    this.author = config.author;
    this.numPages = config.numPages;
    this.currentPage = 0;
}

// Optional Arguments

let book = new Book({
    title: 'Robot Dreams',
    author: 'Isaac Asimov',
    numPages: 320
});

// versus

function optionBook(config) {
    this.title = config.title || 'Untitled',
        this.author = config.author || 'Unknown',
        this.numPages = config.numPages || 100,
        this.currentPage = 0;
}