# Example: Basic Node.js Server

## Prerequisites

Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org).

## Step 1: Create a Project Directory

Create a new directory for your project and navigate into it.

```bash
mkdir nodejs-server-example
cd nodejs-server-example
```

## Step 2: Initialize a Node.js Project

Initialize a new Node.js project.

```bash
npm init -y
```

## Step 3: Create the Server File

Create a file named `server.js`.

```bash
touch server.js
```

## Step 4: Write the Server Code

Open `server.js` in your preferred code editor and add the following code:

```javascript
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Handle GET request
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Hello, World!</h1>');
        } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>About Page</h1>');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
    } else if (req.method === 'POST') {
        // Handle POST request
        if (req.url === '/data') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log('Received POST data:', body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data received', data: body }));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('<h1>Method Not Allowed</h1>');
    }
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, 'localhost', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
```

## Step 5: Run the Server

Run the server using Node.js.

```bash
node server.js
```

## Step 6: Test the Server

### Test GET Requests

1. Open your browser and navigate to `http://localhost:3000`. You should see "Hello, World!" displayed.
2. Navigate to `http://localhost:3000/about`. You should see "About Page" displayed.
3. Navigate to a non-existent route like `http://localhost:3000/nonexistent`. You should see "Page Not Found" displayed.

### Test POST Requests

1. Use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test POST requests.
2. Send a POST request to `http://localhost:3000/data` with some JSON data.

   ```bash
   curl -X POST http://localhost:3000/data -d '{"name": "Node.js"}' -H "Content-Type: application/json"
   ```

   You should see the response with the message "Data received" and the data you sent.

## Explanation of the Code

- **Creating the Server**:

    ```javascript
    const server = http.createServer((req, res) => {
        ...
    });
    ```

    The `createServer` method creates an HTTP server and sets up a request listener.

- **Handling GET Requests**:

    ```javascript
    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Hello, World!</h1>');
        } else if (req.url === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>About Page</h1>');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
    }
    ```

    This code checks the request method and URL, and responds with appropriate HTML content or a 404 error if the URL is not found.

- **Handling POST Requests**:

    ```javascript
    else if (req.method === 'POST') {
        if (req.url === '/data') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log('Received POST data:', body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data received', data: body }));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
    }
    ```

    This code handles POST requests by collecting data chunks, logging the received data, and responding with a JSON message.

- **Listening on a Port**:

    ```javascript
    server.listen(PORT, 'localhost', () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
    ```

    The `listen` method starts the server on the specified port and hostname, and logs a message when the server is ready.

This example demonstrates a basic Node.js server that can handle different request methods and respond accordingly. By extending this foundation, you can build more complex and feature-rich servers for various applications.
