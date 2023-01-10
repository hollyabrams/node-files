const fs = require('fs'); 
const process = require('process');

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

cat(process.argv[2]);

// COMMAND LINE
// node step1.js one.txt
// This is file one.

// node step1.js huh.txt
// Error reading huh.txt: Error: ENOENT: no such file or directory, open 'huh.txt'