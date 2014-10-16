/*
 *
 * https://github.com/davidcaseria/hash-object
 *
 * Copyright (c) 2014 David Caseria
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require('crypto');

function stringify (obj) {
    var keys = Object.keys(obj);
    keys.sort();

    var str = '';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof obj[key] === 'object') {
            str += key + ':' + stringify(obj[key]) + ';';
        } else if (Array.isArray(obj[key])) {
            str += key + ':[' + obj[key].toString() + '];';
        } else {
            str += '|' + key + ':' + obj[key] + '|';
        }
    }

    return str;
}

module.exports = function (obj, opts) {
    opts = typeof opts === 'undefined' ? {} : opts;
    
    if(typeof obj !== 'object' || !obj) {
        return null;
    }
    
    try {
        var hash = crypto.createHash(opts.algorithm ? opts.algorithm : 'sha1');
        hash.update(stringify(obj));
        return hash.digest('hex');
    } catch (err) {
        return null;
    }
};
