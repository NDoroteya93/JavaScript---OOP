'use strict';

function solve() {

    // get unique id
    const getNextId = (function() {
        let id = 0;
        return function() {
            id += 1;
            return id;
        }
    })();

    const VALIDATOR = {
        strLength: function(n) {
            if (typeof n !== 'string' && n < 2 || n > 35) {
                throw new Error('Invalid string length!');
            }
        },

        isInstance: function(list) {
            if (!list instanceof PlayList) {
                throw new Error('List must be instance of ${instance}');
            }
        },
        foundId: function(n) {
            if (!n) {
                throw new Error('PLaylist not contained this id');
            }
        },
        sizePlayList: function(count, page, size) {
            if ((page * size) > count) {
                throw new Error('Invalid size!');
            }

            if (page < 0) {
                throw new Error('Invalid size!');
            }

            if (size <= 0) {
                throw new Error('Invalid size!');
            }
        },
        isGreater: function(n, min) {
            if (n < min) {
                throw new Error('Number must be greater than ${min}');
            }
        },
        rangeNumber: function(n, min, max) {
            if (n < min || n > max) {
                throw new Error('Number is not in this range!');
            }
        }

    };

    function compare(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }


    class Player {
        constructor(name, playlist) {
            this._id = getNextId();
            this.name = name;
            this.playlist = [];
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }

        set name(newName) {
            VALIDATOR.strLength(newName.length);
            this._name = newName;
        }

        get playlist() {
            return this._playlist;
        }

        set playlist(newList) {
            this._playlist = newList;
        }


        // Methods

        addPlaylist(playlistToAdd) {
            VALIDATOR.isInstance(playlistToAdd);
            this.playlist.push(playlistToAdd);
            return this;
        }

        getPlaylistById(id) {
            for (let i = 0; i < this.playlist.length; i += 1) {
                if (this.playlist[i].id === id) {
                    return this.playlist[i];
                }
                return null;
            }
        }
        removePlaylist(args) {
            function removeById(id) {
                let findId = false;
                for (let i = 0; this.playlist.length; i += 1) {
                    if (this.playlist[i].id === id) {
                        this.playlist.splice(i, 1);
                        findId = true;
                    }
                }

                VALIDATOR.foundId(findId);
                return this;
            }

            function removeByPlaylist(playlist) {
                let isFound = false;
                for (let i = 0; i < this.playlist.length; i += 1) {
                    if (this.playlist[i].id === playlist.id) {
                        this.playlist.splice(i, 1);
                        isFound = true;
                    }
                }

                VALIDATOR.foundId(isFound);

                return this;
            }

            if (typeof args === 'number') {
                removeById.call(this, args);
            } else {
                removeByPlaylist.call(this, args);
            }
        }

        listPlaylists(page, size) {
            let listArr = [];
            let pageSize = Number(page) * Number(size);
            VALIDATOR.sizePlayList(this.playlist.length, page, size);

            for (let i = 0; i < size; i += 1) {
                listArr.push(this.playlist[pageSize]);
                pageSize += 1;
                if (pageSize > this.playlist.length) {
                    break;
                }
            }

            listArr.sort((a, b) => {
                    let cmd = a.name.localeCompare(b.name);

                    return cmd;
                })
                .sort((a, b) => a.id + b.id);
            return listArr;
        }

        contains(playable, playlist) {

        }
        search(pattern) {

        }

    }

    class PlayList {
        constructor(name, playable) {
            this._id = getNextId();
            this.name = name;
            this.playable = [];
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }

        set name(newName) {
            VALIDATOR.strLength(newName.length);
            this._name = newName;
        }

        get playable() {
            return this._playable;
        }

        set playable(newPlayable) {
            this._playable = newPlayable;
        }


        addPlayable(playable) {
            this.playable.push(playable);
            return this;
        }

        getPlayableById(id) {
            for (let i = 0; i < this.playable.length; i += 1) {
                if (this.playable[i].id === id) {
                    return this.playable[i];
                }
            }
            return null;
        }

        removePlayable(args) {

            function removeById(id) {
                let isFound = false;
                for (let i = 0; i < this.playable.length; i += 1) {
                    if (this.playable[i].id === id) {
                        this.playable.splice(i, 1);
                        isFound = true;
                    }
                }

                VALIDATOR.foundId(isFound);

                return this;
            }

            function removeByPlayable(playable) {
                let isFound = false;

                for (let i = 0; i < this.playable.length; i += 1) {
                    if (this.playable[i].id === playable.id) {
                        this.playable.splice(i, 1);
                        isFound = true;
                    }
                }
                VALIDATOR.foundId(isFound);
                return this;
            }

            if (typeof args === 'number') {
                removeById.call(this, args);
            } else {
                removeByPlayable.call(this, args);
            }
        }

        listPlayables(page, size) {
            let newArr = [];
            let pageSize = Number(page) * Number(size);

            VALIDATOR.sizePlayList(this.playable.length, page, size);

            for (let i = 0; i < size; i += 1) {
                newArr.push(this.playable[pageSize]);
                pageSize += 1;
                if (pageSize >= this.playable.length) {
                    break;
                }
            }

            return newArr
                .sort(compare)
                .sort((a, b) => a.id + b.id);
        }


    }

    class Playable {
        constructor(title, author) {
            this._id = getNextId();
            this.title = title;
            this.author = author;
        }

        get id() {
            return this._id;
        }

        get title() {
            return this._title;
        }

        set title(newTitle) {
            VALIDATOR.strLength(newTitle.length);
            this._title = newTitle;
        }

        get author() {
            return this._author;
        }

        set author(newAuthor) {
            VALIDATOR.strLength(newAuthor.length);
            this._author = newAuthor;
        }

        play() {
            return `[${this._id}]. [${this.title}] - [${this.author}]`;
        }
    }

    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);
            this.length = length;
        }

        get length() {
            return this._length;
        }

        set length(n) {
            VALIDATOR.isGreater(n, 1);
            this._length = n;
        }

        play() {
            return super.play() + ' - [${this.length}]';
        }
    }

    class Video extends Playable {
        constructor(title, author, imdbRating) {
            supper(title, author);
            this.imdbRating = imdbRating;
        }

        get imdbRating() {
            return this._imdbRating;
        }

        set imdbRating(newRating) {
            VALIDATOR.rangeNumber(newRating, 1, 5);
            this._imdbRating = newRating;
        }

        play() {
            return super.play() + ' - [${this.imdbRating}]';
        }
    }

    let module = {
        getPlayer: function(name) {
            // returns a new player instance with the provided name
            return new Player(name);
        },
        getPlaylist: function(name) {
            //returns a new playlist instance with the provided name
            return new PlayList(name);
        },
        getAudio: function(title, author, length) {
            //returns a new audio instance with the provided title, author and length
            return new Audio(title, author, length);
        },
        getVideo: function(title, author, imdbRating) {
            //returns a new video instance with the provided title, author and imdbRating
            return new Video(title, author, imdbRating);
        }
    };

    return module;
}
var returnedPlayable,
    name = 'Rock and roll',
    playlist = solve().getPlaylist(name),
    playable = { id: 1, title: 'Banana Rock', author: 'Wombles' };


returnedPlayable = playlist.addPlayable(playable).getPlayableById(1);
console.log(returnedPlayable.id);
console.log(returnedPlayable.name);
console.log(returnedPlayable.author);

module.exports = solve;