'use strict';

// Singly-Linked List
// data structure that holds a sequence of linked nodes. Each node, in turn, contains data and pointer, which can point the another node

// Node and SinglyList
//  - Node
// - data - stores a value
// - next - points to the next node in the list.

// -SinglyList
// - _length - retrieves the number of nodes in a list
// - head - assign a node as the head of a list
// - add(value) adds a node to a list
// - searchNodeAt(position) searches for a node at n-position in out list
// - remove(position) removes a node from a list.

function Node(data) {
    this.data - data;
    this.next = null;
}

function SinglyList() {
    this._length = 0;
    this.head = null;
}

// Method add
// Adding a node to our list involves many steps.
SinglyList.prototype.add = function(value) {

    // create new instance of a Node
    let node = new Node(value),
        currentNode = this.head;

    // 1st use-case: an empty list
    // if head does not point to a node, than assign node as the head
    if (!currentNode) {
        this.head = node;
        this._length += 1;
        return node;
    }

    // 2nd use-case: a non-empty list
    // if currentNode.next points to another node
    while (currentNode.next) {
        currentNode = currentNode.next;
    }

    currentNode.next = node;
    this._length += 1;

    return node;
}

// Method searchNodeAt(position)


SinglyList.prototype.searchNodeAt = function(position) {
    let currentNode = this._head,
        length = this._length,
        count = 1,
        message = { failure: 'Failure: non-existent node in this list' };

    // 1-st use-case: an invalid position
    //  invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2-nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count += 1;
    }

    return currentNode;
}

// Method remove

SinglyList.prototype.remove = function(position) {
    let currentNode = this._head,
        length = this._length,
        count = 0,
        message = { failure: 'Failure: non existent node in this list' },
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deleteNode = null;

    // 1=st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }

    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deleteNode = currentNode;
        currentNode = null;
        this._length = -1;

        return deleteNode;
    }

    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count += 1;
    }

    beforeNodeToDelete.next = nodeToDelete.next;
    deleteNode = nodeToDelete;
    nodeToDelete = null;
    this._length -= 1;

    return deleteNode;
}