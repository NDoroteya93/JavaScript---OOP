'use strict';

class listNode {
    constructor(value) {
        this.value = value;
        this.next = next || null;
    }
}

class LinkedList {
    constructor() {
        this._first = null;
        this._last = null;
        this._length = 0;
        this._head = null;
    }

    get first() {
        return this._first;
    }

    get last() {
        return this._last;
    }

    get length() {
        return this._length;
    }

    // iterate(...callback) {
    //     let current = this.first;
    //     while (current !== null) {
    //         callback = calback.next;
    //     }
    // }

    append(...value) {
        let node = new Node(value)
    }
}

module.exports = LinkedList;