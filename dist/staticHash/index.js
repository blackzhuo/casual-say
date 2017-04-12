'use strict';

var fs = require('fs');
var path = require('path');

function read(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(data);
        });
    });
}

function readSync(file) {
    try {
        var data = fs.readFileSync(file, 'utf8');
        return data;
    } catch (ex) {
        return null;
    }
}

module.exports = {
    read: read,
    readSync: readSync
};