'use strict';

var exports = {};
var LinkedList = (function() {
    function LinkedList(other) {
        this.count = 0;
        this.iterators = new Array();
        if (other == null) {
            this.first = null;
            this.last = null;
        } else {
            if (!other.isEmpty()) {
                var current = other.start();
                while (current.next != null) {
                    current = current.next;
                    this.addLast(current.value);
                }
            }
        }
        this.startnode = new LinkedListNode(null, this);
        this.endnode = new LinkedListNode(null, this);
    }
    /** return a deep copy of this list (maintains references to this lists values)
     */
    LinkedList.prototype.copy = function() {
        return new LinkedList(this);
    };

    /** remove all nodes from this list
     */
    LinkedList.prototype.clear = function() {
        while (!this.isEmpty()) {
            this.removeLast();
        }
    };

    /** return true if this list is empty
     */
    LinkedList.prototype.isEmpty = function() {
        return (this.count === 0);
    };

    /** loop over this collection until node is found
     *	@returns true if found
     */
    LinkedList.prototype.containsNode = function(node) {
        var current = this.start();
        while (current.next != null) {
            current = current.next;
            if (current === node) {
                return true;
            }
        }
        return false;
    };

    /** loop over this collection until first node with value is found
     *	@returns true if found
     */
    LinkedList.prototype.containsValue = function(value) {
        var current = this.start();
        while (current.next != null) {
            current = current.next;
            if (current.value === value) {
                return true;
            }
        }
        return false;
    };

    /** Add value to the list at the front.
     */
    LinkedList.prototype.addFirst = function(value) {
        var node = new LinkedListNode(value, this);
        this.onNodeAdd(node);
        if (this.first == null && this.last == null) {
            this.first = node;
            this.last = node;
            this.count += 1;
        } else {
            this.first.insertBefore(node);
        }
    };

    /** Add value to the list at the end.
     */
    LinkedList.prototype.addLast = function(value) {
        var node = new LinkedListNode(value, this);
        this.onNodeAdd(node);
        if (this.first == null && this.last == null) {
            this.first = node;
            this.last = node;
            this.count += 1;
        } else {
            this.last.insertAfter(node);
        }
    };

    /** Add value before the first instance of list value.
     */
    LinkedList.prototype.insertBefore = function(value, listvalue) {
        var node = new LinkedListNode(value, this);
        if (this.first != null && this.last != null) {
            var current = this.start();
            while (current.next != null) {
                current = current.next;
                if (current.value === listvalue) {
                    this.onNodeAdd(node);
                    current.insertBefore(node);
                    return;
                }
            }
        } else {
            throw new Error("Tried to insert before an item in an empty list.");
        }
    };

    /** Add value after the first instance of list value.
     */
    LinkedList.prototype.insertAfter = function(value, listvalue) {
        var node = new LinkedListNode(value, this);
        if (this.first != null && this.last != null) {
            var current = this.start();
            while (current.next != null) {
                current = current.next;
                if (current.value === listvalue) {
                    this.onNodeAdd(node);
                    current.insertAfter(node);
                    return;
                }
            }
        } else {
            throw new Error("Tried to insert after an item in an empty list.");
        }
    };

    /** Remove the first element from the list.
     */
    LinkedList.prototype.removeFirst = function() {
        if (this.first != null && this.last != null) {
            var temp = this.first;
            if (this.onNodeDrop(temp)) {
                temp.drop();
                this.notifyIteratorsNodeDropped(temp);
                return temp.value;
            }
        } else {
            throw new ReferenceError("Tried to remove first item from an empty list.");
        }
    };

    /** Remove the last element from the list.
     */
    LinkedList.prototype.removeLast = function() {
        if (this.first != null && this.last != null) {
            var temp = this.last;
            if (this.onNodeDrop(temp)) {
                temp.drop();
                this.notifyIteratorsNodeDropped(temp);
                return temp.value;
            }
        } else {
            throw new ReferenceError("Tried to remove last item from an empty list.");
        }
    };

    /**	Removes the first found occurance of the item from this list.
     */
    LinkedList.prototype.removeItem = function(item) {
        var current = null;
        if (this.first != null && this.last != null) {
            current = this.start();
            while (current.next != null) {
                current = current.next;
                if (current.value === item) {
                    if (this.onNodeDrop(current)) {
                        current.drop();
                        this.notifyIteratorsNodeDropped(current);
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
        return false;
    };

    /** Return a LinkedListNode representing the front of the list.
     */
    LinkedList.prototype.start = function() {
        this.startnode.next = this.first;
        return this.startnode;
    };

    /** Return a LinkedListNode representing the end of the list.
     */
    LinkedList.prototype.end = function() {
        this.endnode.previous = this.last;
        return this.endnode;
    };

    /** Notify all iterators that the given node has been dropped.
     *	Exclude calling iterator from the notification
     */
    LinkedList.prototype.notifyIteratorsNodeDropped = function(node, callingIterator) {
        for (var idx = 0; idx < this.iterators.length; idx++) {
            if (typeof callingIterator === "undefined" || this.iterators[idx] !== callingIterator) {
                this.iterators[idx].checkState(node);
            }
        }
    };

    /** Function called when a node is dropped. You can overwrite this function
     *	to intercept a node removal by returning false.
     *	@param node LinkedListNode<T>
     */
    LinkedList.prototype.onNodeDrop = function(node) {
        return true;
    };

    /** Function called when a node is added.
     *	@param node LinkedListNode<T>
     */
    LinkedList.prototype.onNodeAdd = function(node) {};

    /**	Prints all entries in this list.
     */
    LinkedList.prototype.toString = function() {
        var result = "[\n";
        var current = this.start();

        while (current.next != null) {
            current = current.next;
            result += current.value;
            result += "\n";
        }
        result += "]";

        return result;
    };
    return LinkedList;
})();
exports.LinkedList = LinkedList;

/**
LinkedListNode
A Linked List Node represents a position in the list.
*/
var LinkedListNode = (function() {
    function LinkedListNode(value, list) {
        this.value = value;
        this.list = list;
    }
    /**	If callback returns true, drop this node from the list make neccesary
     *	modifcations to surrounding nodes
     */
    LinkedListNode.prototype.drop = function() {
        if (this.onDrop() && this.list != null) {
            this.list.notifyIteratorsNodeDropped(this);
            if (this.previous != null) {
                this.previous.next = this.next;
            }
            if (this.next != null) {
                this.next.previous = this.previous;
            }
            if (this === this.list.first) {
                this.list.first = this.next;
            }
            if (this === this.list.last) {
                this.list.last = this.previous;
            }
            this.list.count -= 1;
        }
    };

    /**	Inserts the given node before this node in the list.
     */
    LinkedListNode.prototype.insertBefore = function(node) {
        node.previous = this.previous;
        node.next = this;
        if (this.previous != null) {
            this.previous.next = node;
        }
        this.previous = node;
        if (this.list != null) {
            if (this === this.list.first) {
                this.list.first = node;
            }
            this.list.count += 1;
        }
    };

    /**	Insert the given node after this node in the list.
     */
    LinkedListNode.prototype.insertAfter = function(node) {
        node.previous = this;
        node.next = this.next;
        if (this.next != null) {
            this.next.previous = node;
        }
        this.next = node;
        if (this.list != null) {
            if (this === this.list.last) {
                this.list.last = node;
            }
            this.list.count += 1;
        }
    };

    /**	This function is called before this node gets removed from the list. You
     *	can overwrite it to return false if it meets some condition you specify.
     *	This will stop the node from being removed.
     */
    LinkedListNode.prototype.onDrop = function() {
        return true;
    };
    return LinkedListNode;
})();
exports.LinkedListNode = LinkedListNode;

/*
LinkedListIterator

A Linked List Iterator is given a reference to a list,
which it then steps through each node in order until the end is
reached.
*/
var LinkedListIterator = (function() {
    function LinkedListIterator(list, reverse) {
        this.list = list;
        if (typeof this.list !== "undefined" && this.list != null) {
            this.list.iterators.push(this);
            this.dirty = false;

            if (typeof reverse === "undefined" || reverse === false) {
                this.current = this.list.start();
            } else {
                this.current = this.list.end();
            }
        } else {
            throw new Error("Cannot instantiate a LinkedListIterator for a null list.");
        }
    }
    /** Iterate towards the start of the list. Returns the node.
     *	Throws an error if you try to iterate past the start node.
     */
    LinkedListIterator.prototype.previous = function() {
        if (this.dirty) {
            throw new ReferenceError("LinkedListIterator: Current node dropped.");
        }
        if (this.current.previous != null) {
            this.current = this.current.previous;
            return this.current;
        } else {
            throw new Error("Reached start of list.");
        }
    };

    /**	Iterate towards the end of the list. Returns the node.
     *	Throws an error if you try to go past the end of the list.
     */
    LinkedListIterator.prototype.next = function() {
        if (this.dirty) {
            throw new ReferenceError("LinkedListIterator: Current node dropped.");
        }
        if (this.current.next != null) {
            this.current = this.current.next;
            return this.current;
        } else {
            throw new Error("Reached end of list.");
        }
    };

    /** Returns true if it can iterate backwards.
     */
    LinkedListIterator.prototype.hasPrevious = function() {
        return (this.current.previous != null);
    };

    /** Returns true if it can iterate forwards.
     */
    LinkedListIterator.prototype.hasNext = function() {
        return (this.current.next != null);
    };

    /**	If the current node has been dropped, iteration cannot continue.
     */
    LinkedListIterator.prototype.checkState = function(node) {
        if (this.current === node) {
            this.dirty = true;
        }
    };

    /**	Call this at the end of this iterators life.
     *	Failure to do so will result in a memory leak.
     */
    LinkedListIterator.prototype.cleanUp = function() {
        this.list.iterators.removeElement(this.list.iterators.indexOf(this));
    };
    return LinkedListIterator;
})();
exports.LinkedListIterator = LinkedListIterator;

var list = new LinkedList();
var array = [];
var map = new Map();
var set = new Set();
var obj = {};

for (var i = 0; i < 1000; i++) {
    array.push(i);
    map.set(i, i);
    set.add(i);
    obj[i] = i;
    list.addLast(i);
}