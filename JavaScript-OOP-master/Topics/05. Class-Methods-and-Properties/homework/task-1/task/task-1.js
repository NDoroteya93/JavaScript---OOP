'use strict';

class listNode {
    constructor(value) {
        this.value = value;
        this._next = null;
    }
    get next() {
        return this._next;
    }

    set next(next) {
        return this._next = next;
    }

}

class LinkedList {
    constructor() {
        this._first = null;
        this._last = null;

        // numbers of items
        this._length = 0;
        // each item firs to the node
        this._head = null;


    }

    get first() {
        return this.at(0);
    }

    get last() {
        return this.at(this._length - 1);
    }

    get length() {
        return this._length;
    }

    append(...values) {
        // traverse structure
        let current;
        for (let value of values) {

            //create a new node, place data in

            let node = new listNode(value);

            // no items in the list
            if (this._head === null) {
                this._head = node;
            } else {
                current = this._head;
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
            }
            this._length += 1;
        }
        return this;
    }
    prepend(...values) {
        let arr = values.reverse();
        for (let value of arr) {
            // create new node
            let node = new listNode(value);

            // save the first node
            const temp = this._head;

            // point head to the new node
            this._head = node;

            // add the rest node before next
            this._head.next = temp;

            this._length += 1;
        }
        return this;
    }

    [Symbol.iterator]() {
        let current = this._head;
        return {
            i: 0,
            next() {
                if (current) {
                    this.i += 1;
                    let getCurrent = current;
                    current = current.next;
                    return { value: getCurrent.value, done: false };

                } else {
                    return { value: undefined, done: true };

                }
            }
        }
    }


    insert(index, ...values) {
        if (index === 0) {
            this.prepend(...values)
        } else {
            let current = this._head,
                previous;
            // seach index in the list
            for (let i = 0; i < index; i += 1) {
                previous = current;
                current = current.next;
            }

            // insert values after index
            for (let value of values) {
                let node = new listNode(value);
                previous.next = node;
                node.next = current;

                previous = node;
                this._length += 1;
            }
        }
        return this;
    }


    removeAt(index) {
        if (index > -1 && this._length > 0) {
            let previous = this._head,
                current = previous.next,
                i = 1;

            if (index === 0) {
                current = this._head;
                this._head = current.next;
            } else {
                if (i !== index) {
                    for (i; i < index; i += 1) {

                        previous = current;
                        current = current.next;
                        if (previous === null) {
                            previous = 'null'
                        }
                        if (current === null) {
                            current = 'null';
                        }
                    }
                }
                // skip over the item to remove
                previous.next = current.next;
            }

            this._length -= 1;

            return current.value;
        } else {
            return null;
        }
    }
    at(index, value) {
        if (value !== undefined) {
            this.insert(index, value);
            index += 1;
            this.removeAt(index);
        } else {
            if (index > -1 && this._length > 0) {
                let current = this._head;
                for (let i = 0; i < index; i += 1) {
                    current = current.next;
                }
                return current.value;
            } else {
                return null;
            }
        }
    }

    toArray() {
        let arr = [];

        let current = this._head;

        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    toString() {
        let current = this._head;
        let str = '';
        while (current) {
            if (current === this._head) {
                str += current.value;

            } else {
                str += ' -> ' + current.value;
            }
            current = current.next;
        }
        return str;
    }
}
const values = 'babel src --presets es2015 --out-dir ./build -s -w'.split(' '),
    list = new LinkedList().append(...values),
    listLength = list.length;

for (let i = 0, length = values.length; i < length; i += 1) {
    list.at(i, i);
}

console.log(list.first); // 1
console.log(list.last); //theObj
console.log(list.length);

module.exports = LinkedList;