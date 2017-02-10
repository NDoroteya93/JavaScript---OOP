'use strict';

// Outline:

//     * Outline and Queque
//     * Singly-Linked List and Doubly-Linked ListeningStateChangedEvent
//     * Tree (Depth-First Search and Breadth-First Search)

/////////////////////////////// STACK //////////////////////////////

function Stack() {
    this._size = 0; // enabled each instance of Stack to have its own container for storing data
    this._storage = 0; // reflects the number of times data was pushed to current version  - increase to 1. If data is removed from the Stack, than will decrease with 1.
}

// Method: (push data)

Stack.prototype.push = function(data) {
    // increase the size pf our storage
    let size = this._size++;

    // assigns size as a key of storage
    // assigns data as the value of this key
    this._storage[size] = data;
}

// Method pop

Stack.prototype.pop = function() {
    let size = this._size,
        deleteData;

    // executed only when there is data in our storage
    if (size) {

        deleteData = this._storage[size];

        delete this._storage[size];
        this.size -= 1;

        return deleteData;
    }

}

// If we want to remove the oldest data - QUEUE

/////////////////////////////// QUEUE //////////////////////////////

// - enqueue(data) - adds data to a queque
// dequeue - remove the oldest added data to a dequeue

function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}

// Method 1

// return the correct size of queue
// retain the corrext range of keys for a queue
Queue.prototype.suize = function() {
    return this._newestIndex = this._oldestIndex;
}

// 1. _newestIndex represents a ticket from a customer ticketing system
// 2. _oldestIndex represents a ticket from an employee ticketing system

// 1. A customer takes a ticket. The customer's ticket number, which is retrieved from _newestIndex, is. The next ticket available in the customer ticket system is 2.
// 2. An emplyee does not take a tiket, and the curren ticket in the employee ticket system is 1.
// 3. We takce the current ticket number in the customer system (2) and subtract the number in the empliyee system (1) to get the number 1. The number 1 represents the number of tickets still in the queue that have not been removed/
// 4. Employee takes a ticket from their ticketin system. Their  ticket represents the customer ticket being serverd. The ticket that was served is retrieved from _oldestIndex, which displays the number 1.
// 5  We repeat step 4, and now the difference is zero - there are no more tickets in the dequeue

// _newestIndex property that can tell us the largest number (key) assigned in the queue and a property _oldestIndex that tell us theolder index number (key) in the queue


// Method 2

Queue.prototype.enqueque = function(data) {
    this_storage[this._newestIndex] = data; // create a new key to assign data
    this._newestIndex += 1; // update new value
}

// Method 3

// 1. Remove the oldest data in queue
// 2. increment _oldestIndex by one
Queue.prototype.dequeue = function() {
    let oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;

    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex += 1;
    }

    return deletedData;
}