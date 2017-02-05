'use strict';
// properties  - title, author, pages
// methods - read(), buy()
//  Book
function Book(title, author, pages) {
    // properties of this object

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = 0;
}

Book.prototype.read = function() {
    this.currentPage = this.pages;
    console.log(`You read ${this.pages} pages!`);
}

let book = new Book('Fifty shades of Grey', 'E. L. James', 10);
book.read();

// Video

function Video(title, uploaded, seconds) {
    this.title = title;
    this.uploaded = uploaded;
    this.seconds = seconds;
    this.currentSeconds = 0;
}

Video.prototype.watch = function() {
    this.currentSeconds = this.seconds;
    console.log(`You watched all ${this.seconds} of ${this.title}`);
}

let video = new Video('Otters Holding Hands!', 'fefrgr', 60);
video.watch();

let video2 = new Video("Harry Potter", "Pesho", 40);
video2.watch();

// Object can inherit properties/methods of other objects
// Object can implement parent methods in different ways

// 1. Creates a new Object
// 2. Creates and binds a new this to that object
// 3. It sets the new object`s prototype property to be the constructor function's property object
// 4. It executes the constructor function
// 5. It returns the newly created object

// The constructor function
function PaperBack(title, author, pages, cover) {
    Book.call(this, title, author, pages);
    this.cover = cover;
}

// Extending the Book object
PaperBack.prototype = Object.create(Book.prototype);

// A new method on this object
// The Objec.create() method create a new object with the specidied prototype object and properties
// Object.create(proto[, propertiesObject]);

// proto - the object which should be the prototype of the newly-created object
PaperBack.prototype.burn = function() {
    console.log(`Omg, you burnt all ${this.pages} pages`);
    this.pages = 0;
}

let paperback = new PaperBack('1984', 'George Orwell', 250, 'cover.jpg');
paperback.read();
paperback.burn();


function MusicVideo(title, uploaded, seconds, artist) {
    Video.call(this, title, uploaded, seconds, artist);
    this.artist = artist;
}
MusicVideo.prototype = Object.create(Video.prototype);
let musicVideo = new MusicVideo('La Bamba', 'dory', 50, 'Ritchie Valens');

musicVideo.watch();

MusicVideo.prototype.rockOut = function() {
    console.log(`You rocked out to ${this.title} by ${this.artist}!`);
}

musicVideo.rockOut();

