"use strict";

var test = require('tape');
var shuffleList = require('./');

test('should exist', function(t) {
    t.equal(typeof shuffleList, 'function');
    t.end();
});

test('should do nothing', function(t) {
    t.equal(shuffleList(), undefined);
    t.equal(shuffleList({}), undefined);
    t.equal(shuffleList(123), undefined);
    t.equal(shuffleList("abc"), undefined);
    t.equal(shuffleList(NaN), undefined);
    t.end();
});

test('should shuffleList the list', function(t) {
    var orgList = [1, 2, 3, 4, 5];
    var list = orgList;
    list = shuffleList(list);
    t.equal(list.length, 5);
    t.notDeepEqual(list, orgList);
    orgList.forEach(function(value) {
        t.assert(list.indexOf(value) > -1);
    });
    t.end();
});
