/*
 *
 * https://github.com/davidcaseria/hash-object
 *
 * Copyright (c) 2014 David Caseria
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require('crypto');

Object.prototype.toString = function () {
    var keys = Object.keys(this);
    keys.sort();

    var str = '';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof this[key] === 'object') {
            str += key + ':' + this[key].toString() + ';';
        } else if (Array.isArray(this[key])) {
            str += key + ':[' + this[key].toString() + '];';
        } else {
            str += '|' + key + ':' + this[key] + '|';
        }
    }

    return str;
};

module.exports = function (obj, opts) {
    opts = typeof opts === 'undefined' ? {} : opts;
    
    if(!obj) {
        return null;
    }
    
    var hash = crypto.createHash(opts.algorithm ? opts.algorithm : 'sha1');
    hash.update(obj.toString());
    return hash.digest('hex');
};
