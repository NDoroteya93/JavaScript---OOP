'use strict';

class listNode {
    constructor(value) {
        this.value = value;
        this.next = null;
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
        for (let i = 0; i < value.length; i += 1) {
            let node = new listNode(value[i]);
            if (this._length === 0) {
                this._first = node;
            } else {
                this._last.next = node;
            }

            this._last = node;
            this._length += 1;
        }
        return this;
    }

    prepend(...value) {
        for (let i = 0; i < value.length; i += 1) {
            let node = new listNode(value[i]);
            this._first.next = node;
            this._first = node;
            this._length += 1;
        }
        return this;
    }


}

const list = new LinkedList();
list.append(1, 2, 3).append(4);
module.exports = LinkedList;