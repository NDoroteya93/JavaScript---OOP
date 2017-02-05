'use strict';

let showCategories = function(productId, ...categories) {
    console.log(categories instanceof Array);
}

showCategories('123', 'search', 'advertising');