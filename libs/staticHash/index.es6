const fs = require('fs');
const path = require('path');

function read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(data);
        });
    });
}

function readSync(file) {
    try{
        let data = fs.readFileSync(file, 'utf8');
        return data;
    }catch(ex){
        return null;
    }
}

module.exports = {
    read: read,
    readSync: readSync
}