const fs = require('fs'); 
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf-8', (err) => {
            if (err) {
                console.error(`Could not write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
        handleOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}


// COMMAND LINE
// node step3.js one.txt
// This is file one.

// node step3.js http://google.com
// <!doctype html><html ...

// However, if --out follows your script name, it should take the next argument and use that as the path to write to.

// node step3.js --out new.txt one.txt
// # no output, but new.txt contains contents of one.txt

// node step3.js --out new.txt  http://google.com
// # no output, but new.txt contains google's HTML

// Make sure to handle errors trying to write to the file.
// node step3.js --out /no/dir/new.txt one.txt
// Couldn't write /no/dir/new.txt: Error: ENOENT: no such file or directory, open '/no/dir/new.txt'