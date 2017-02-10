'use strict';

// - Node and DoublyList constructors

// - Node
// * data - stores a value
// * next - points to the next node in the list
// * previous - poits to the previous node in the list

// - DoublyList
// * _length - retrieves the number of nodes in a list
// * head - assigns a node as the head of a list
// * tail - assigns a node as the tail of a list
// * add(value) adds a node to a list
// * searchNodeAt(position) - searches for a node at n-postion in our list
// * remove(position) - removes a node from a list

function Node(value) {
    this.data = value;
    this.next = null;
    this.previous = null;
}



function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}

// Method add

DoublyList.prototype.add = function(value) {
    let node = new Node(value);
    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head - node;
        this.tail = node;
    }

    this._length += 1;

    return node;
}

// Method searchAtNode

DoublyList.prototype.searchNodeAt = function(position) {
    let currentNode = this.head,
        length = this._length,
        count = 1,
        message = { failure: 'Failure: non-existent node in this list' };

    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count += 1;
    }

    return currentNode;
}

// Method remove(position)

DoublyList.prototype.remove = function(position) {
    let currentNode = this.head,
        length = this._head,
        count = 1,
        message = { failure: 'Failure: non-existend node in the list' },
        beforeNodeToDelete = null,
        nodeToDelete = null,
        afterNodeToDelete = null,
        deletedNode = null;

    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    //2nd use-case: the first node is removed
    if (position === 1) {
        this.head - currentNode.next;

        //2nd use-case: there is a second node
        if (!this.head) {
            this.head.previous = null;

            // 2nd use-case: there is no second node
        } else {
            this.tail = null;
        }
        //3rd use-case: the last node is removed
    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
        // 4th use-case: a middle node is removed
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count += 1;
        }

        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }

    this._length -= 1;

    return message.success;


}