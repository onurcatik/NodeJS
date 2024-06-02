# Example: Creating a Basic HTTP Server with Node.js

In this section, we will create a basic HTTP server using Node.js. This example will demonstrate how to set up a server that responds to HTTP requests.

## Step-by-Step Guide

1. **Create a Project Directory**: Open your terminal and create a new directory for your project.

   ```bash
   mkdir node-http-server
   cd node-http-server
   ```

2. **Initialize a Node.js Project**: Initialize a new Node.js project using `npm`.

   ```bash
   npm init -y
   ```

   This command will create a `package.json` file with default settings.

3. **Create the Server File**: Create a new file named `server.js` in your project directory.

4. **Write the Server Code**: Open `server.js` in your text editor and add the following code:

   ```javascript
   // Import the HTTP module
   const http = require('http');

   // Define the hostname and port
   const hostname = '127.0.0.1';
   const port = 3000;

   // Create the server
   const server = http.createServer((req, res) => {
     // Set the response header
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     // Send the response body
     res.end('Hello, World!\n');
   });

   // Listen on the specified port and hostname
   server.listen(port, hostname, () => {
     console.log(`Server running at http://${hostname}:${port}/`);
   });
   ```

5. **Run the Server**: In the terminal, run the server using the `node` command.

   ```bash
   node server.js
   ```

6. **Test the Server**: Open a web browser and navigate to `http://127.0.0.1:3000/`. You should see the message "Hello, World!" displayed in the browser.

## Detailed Explanation

- **HTTP Module**: The `http` module is a core Node.js module that allows us to create an HTTP server.

  ```javascript
  const http = require('http');
  ```

- **Hostname and Port**: We define the hostname and port where the server will listen for incoming requests.

  ```javascript
  const hostname = '127.0.0.1';
  const port = 3000;
  ```

- **Create Server**: The `http.createServer()` method creates a new HTTP server and takes a callback function that is executed every time the server receives a request.

  ```javascript
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  });
  ```

  - **Request and Response**: The callback function has two parameters: `req` (request) and `res` (response). We set the response status code to `200` (OK) and the content type to `text/plain`. Finally, we send the response body with the message "Hello, World!".

- **Listen Method**: The `server.listen()` method starts the server, making it listen for incoming connections on the specified port and hostname.

  ```javascript
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  ```

## Code Snippet

Here is the complete code snippet for creating a basic HTTP server:

```javascript
// Import the HTTP module
const http = require('http');

// Define the hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Set the response header
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // Send the response body
  res.end('Hello, World!\n');
});

// Listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

By following these steps, you have created a simple HTTP server using Node.js. This server listens for requests on port 3000 and responds with "Hello, World!". This example serves as a foundation for building more complex server-side applications with Node.js.
