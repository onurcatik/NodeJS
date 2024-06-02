# Node.js  - Requests & Responses

In this tutorial, we will delve into handling requests and responses in a Node.js server. We will critically address key aspects of creating a robust server and implementing basic routing. Let's begin by creating a server that listens for requests and sends appropriate responses.

## Setting Up the Server

First, ensure you have Node.js installed. Create a file named `server.js` and add the following code:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Request made');
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

To run the server, use the command:

```bash
node server.js
```

The server listens on `localhost` at port `3000`. Any request to this server triggers the function that logs "Request made" to the console.

## Logging the Request Object

The request object contains crucial information about the incoming request. Modify the function to log the request object:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

After saving the file, restart the server and refresh your browser to observe the logged request object. To handle server restarts efficiently during development, consider using `nodemon`.

Install `nodemon` globally:

```bash
npm install -g nodemon
```

Run the server using `nodemon`:

```bash
nodemon server.js
```

## Extracting Request Details

We can extract specific details from the request object such as the URL and the request method:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

## Sending Responses

To send a response, we use the response object. We must set the response headers and the response body:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, world!');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

## Sending HTML Responses

To send an HTML response, change the content type to `text/html` and send HTML content:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Hello, World!</h1></body></html>');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

## Serving HTML Files

Storing HTML content in separate files is cleaner. Use the `fs` module to read files:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

## Implementing Basic Routing

Use a switch statement to handle different routes and serve corresponding HTML files:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

## Setting Response Status Codes

Set appropriate response status codes to inform the browser about the request outcome:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```

## Redirecting Requests

To handle redirects, use the `Location` header and a 301 status code:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    if (res.statusCode !== 301) {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
```
