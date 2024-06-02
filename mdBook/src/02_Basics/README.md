# Node.js Basics

## Introduction

In this tutorial, we will explore the basics of Node.js, focusing on running JavaScript code on the server side. We will delve into fundamental concepts such as the global object, modules, file system interactions, and streams. This tutorial aims to provide a thorough understanding of these core features, ensuring a strong foundation for further learning and development in Node.js.

## Running JavaScript Files with Node.js

To begin, we will run a simple JavaScript file using Node.js. This will help us understand how to execute JavaScript code on the server side.

1. Create a file named `test.js` with the following content:

```javascript
function greet(name) {
    console.log(`Hello, ${name}`);
}

greet('Mario');
greet('Jasha');
```

2. Open a terminal in the directory containing `test.js` and run the file with the following command:

```bash
node test.js
```

You should see the following output:

```
Hello, Mario
Hello, Jasha
```

This demonstrates how easy it is to run JavaScript files using Node.js. The syntax and language constructs are the same as those used in the browser, allowing for seamless transition between client-side and server-side development.

## The Global Object

In Node.js, the global object is different from the `window` object in browsers. The global object in Node.js is called `global`, and it provides several methods and properties that can be used out of the box.

1. Create a file named `global.js` with the following content:

```javascript
console.log(global);

setTimeout(() => {
    console.log('In the timeout');
}, 3000);

const interval = setInterval(() => {
    console.log('In the interval');
}, 1000);

setTimeout(() => {
    clearInterval(interval);
    console.log('Interval cleared');
}, 3000);
```

2. Run the file with the following command:

```bash
node global.js
```

You should see the global object logged to the console, followed by "In the interval" logged every second, and "Interval cleared" logged after three seconds.

## Working with Modules

Node.js uses a module system to organize code into reusable pieces. Modules can be created and imported using the `require` function.

1. Create two files, `people.js` and `modules.js`, with the following content:

`people.js`:

```javascript
const people = ['Mario', 'Luigi', 'Peach', 'Toad'];
const ages = [25, 30, 28, 32];

module.exports = {
    people,
    ages
};
```

`modules.js`:

```javascript
const { people, ages } = require('./people');

console.log(people, ages);
```

2. Run `modules.js` with the following command:

```bash
node modules.js
```

You should see the arrays logged to the console. This demonstrates how to export and import multiple values from a module.

## File System Operations

Node.js provides the `fs` module for interacting with the file system. This includes reading and writing files, as well as creating and deleting directories.

1. Create a file named `files.js` with the following content:

```javascript
const fs = require('fs');

// Reading files
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

// Writing files
fs.writeFile('./docs/blog1.txt', 'Hello, world!', () => {
    console.log('File was written');
});

// Creating directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder created');
    });
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder deleted');
    });
}

// Deleting files
if (fs.existsSync('./docs/delete-me.txt')) {
    fs.unlink('./docs/delete-me.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('File deleted');
    });
}
```

2. Run `files.js` with the following command:

```bash
node files.js
```

This script demonstrates how to read and write files, create and delete directories, and delete files using the `fs` module.

## Working with Streams

For efficient handling of large files, Node.js provides streams. Streams allow reading and writing data in chunks, rather than loading the entire file into memory.

1. Create a file named `streams.js` with the following content:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data', (chunk) => {
    console.log('New chunk:', chunk);
    writeStream.write('\nNEW CHUNK:\n');
    writeStream.write(chunk);
});

// Piping
readStream.pipe(writeStream);
```

2. Run `streams.js` with the following command:

```bash
node streams.js
```

This script demonstrates how to create read and write streams and how to use the `pipe` method to efficiently transfer data from one stream to another.
