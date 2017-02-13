'use strict';

// single node
let firstNode = {
    data: 12,
    next: null
};

// attach to first node to create list
firstNode.next = {
    data: 99,
    next: null
};

function LinkedList() {
    this._length = 0; // number of items in the list
    this._head = null; // points to the first item in the list

}

LinkedList.prototype = {

    add: function(data) {

        // create a new node, place data in
        let node = {
                data: data,
                next: null
            },
            // used to traverse the structure

            current;

        // spacial case: no items in the list yet

        if (this._head === null) {
            this._head - node;
        } else {
            current = this._head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }

        // update the count
        this._length += 1;

    }
}

// Retrieving a value from the list involves the same type of traversal
// item() metdoh check to ensure that index beinff specified is within a valid range before traversing the list. The while loop is used to figure out of
// the correct place to stop in the list to find the data
LinkedList.prototype = {
    item: function(index) {

        // check for out-of-bounds values
        if (index > -1 && index < this._length) {
            let current = this._head,
                i = 0;

            while (i++ < index) {
                current = current.next;
            }

            return current.data;
        } else {
            return null;
        }
    },

}

LinkedList.prototype = {

    remove: function(index) {

        // check for out-of-bounds values
        if (index > -1 && index < this._length) {
            let current = this._head,
                previous,
                i = 0;

            // special case: removing first item
            if (index === 0) {
                this._head = current.next;
            } else {

                // find the right location
                while (i++ < index) {
                    previous = current;
                    current = current.next;
                }

                // skip over the item to remove
                previous.next = current.next;
            }

            // decrement the _length
            this._length--;

            return curent.data;
        } else {
            return null;
        }
    }
}

let list = new LinkedList();
// list.add('');
// list.add('red');
// list.add('yellow');
// list.add('orange');
// list.add('green');

console.log(list.item(1)); //

list.remove(1);

console.log(list.item(1));