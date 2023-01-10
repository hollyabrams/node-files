const fs = require('fs'); 
const process = require('process');
const axios = require('axios');

// read file at path and print it out

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
        console.log(data);
        }
    });
}

// read page at url and print it out.

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}


// COMMAND LINE
// node step2.js one.txt
// This is file one.

// node step2.js http://google.com
// <!doctype html><html ...

// If there is an error getting the page, it should print that.
// node step2.js http://rithmschool.com/no-such-path
// Error fetching http://rithmschool.com/no-such-path: Error: Request failed with status code 404