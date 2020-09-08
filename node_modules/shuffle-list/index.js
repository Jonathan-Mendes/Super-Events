"use strict";

function shuffleList(array) {
    if (!Array.isArray(array)) {
        return;
    }
    var clone = array.slice(0);
    var result = [];
    while (clone.length) {
        var i = randomInt(clone.length);
        result.push(clone.splice(i, 1)[0]);
    }
    return result;
}

function randomInt(length) {
    return Math.floor(Math.random() * length);
}

module.exports = shuffleList;
