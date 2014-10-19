/*
 *
 * https://github.com/davidcaseria/hash-object
 *
 * Copyright (c) 2014 David Caseria
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require('crypto');

Object.prototype.isEmpty = function () {
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

function stringify(obj) {
    try {
        var keys = Object.keys(obj);
        keys.sort();

        var str = '';
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (obj[key] && typeof obj[key] === 'object' && !obj[key].isEmpty()) {
                if (Array.isArray(obj[key]) && obj[key].length > 0) {
                    var elements = [];
                    for (var j = 0; j < obj[key].length; j++) {
                        var s = stringify(obj[key][j]);
                        if (s) {
                            elements.push(s);
                        }
                    }
                    if (elements.length > 0) {
                        str += key + ':[' + elements.join(',') + ']';
                    }
                } else if (!Array.isArray(obj[key])) {
                    str += '|' + key + ':' + stringify(obj[key]) + '|';
                }
            } else if ((obj[key] && !obj[key].isEmpty()) || obj[key] === 0 || obj[key] === false) {
                str += '|' + key + ':' + obj[key] + '|';
            }
        }

        return str;
    } catch (error) {
        return null;
    }
}

module.exports = function (obj, opts) {
    opts = typeof opts === 'undefined' ? {} : opts;

    if (typeof obj !== 'object' || !obj) {
        return null;
    }

    try {
        var hash = crypto.createHash(opts.algorithm ? opts.algorithm : 'sha1');
        //console.log(stringify(obj));
        hash.update(stringify(obj));
        return hash.digest('hex');
    } catch (err) {
        return null;
    }
};