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
        }

    };

    let players = [];


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
            //having player with name `Batman's playlist` with:
            //playlist1 with id `1` and title `Cool` with playables:
            //  'They are green' and 'I am Batman'
            //playlist2 with id `2` and title `Green` with playables:
            //  `Green they are`, `Green is beautiful` and `To the green and beyond`

        //player.search('green') returns:
        //  [{name: 'Cool', id: 1}, {name: 'Green', id: 2}]

        //player.search('batman') returns:
        //  [{name: 'Cool', id: 1}]

        //player.search('John') returns:
        //  []
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
            const { id, title, author } = playable;
            this.playable.push(new Playable(id, title, author));
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
                        this.playable.slice(i, 1);
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
                        this.playable.slice(i, 1);
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
                if (pageSize > this.playable.length) {
                    break;
                }
            }

            return newArr
                .sort((a, b) => a.name.localeCompare(b.name))
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
    }

    class Video extends Playable {}

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
        },
        getVideo: function(title, author, imdbRating) {
            //returns a new video instance with the provided title, author and imdbRating
        }
    };

    return module;
}

module.exports = solve;