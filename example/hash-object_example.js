'use strict';

var hashObject = require('../lib/hash-object.js');

var hash1 = hashObject({
    a: 'b',
    c: 'd',
    e: 'f'
});
var hash2 = hashObject({
    a: 'b',
    e: 'f',
    c: 'd'
});
// hash1 === hash2

var hash3 = hashObject({
    a: 'b',
    b: ['c', 'd'],
    c: {
        d: 'e',
        f: {
            g: 'h'
        }
    }
});
var hash4 = hashObject({
    a: 'b',
    c: {
        f: {
            g: 'h'
        },
        d: 'e'
    },
    b: ['c', 'd']
});

// hash3 === hash4