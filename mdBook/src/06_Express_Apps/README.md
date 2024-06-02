# Node.js - Express Apps

## Introduction

In this tutorial, we will delve into the creation of Express applications. Express is a minimalist web framework for Node.js that simplifies the process of building robust web applications and APIs. By using Express, we can manage routing, requests, server-side logic, and responses more efficiently and elegantly. While it is possible to achieve the same outcomes with raw Node.js, Express streamlines the process, resulting in cleaner, more maintainable code.

## Installing Express

Before we begin, ensure you have Node.js and npm installed on your system. To install Express, open your terminal and navigate to your project directory. Run the following command:

```bash
npm install express
```

This will add Express to your project dependencies. If you are using an older version of npm, you may need to use the `--save` flag to ensure it is saved to your dependencies list.

```bash
npm install express --save
```

## Creating an Express Application

To start, create a new file named `app.js`. We will retain the `server.js` file to compare our Express code with raw Node.js code later. Inside `app.js`, begin by requiring Express and setting up an instance of an Express application.

```javascript
const express = require('express');
const app = express();
```

Next, we need to set up the application to listen for incoming requests on a specific port. For this tutorial, we will use port 3000.

```javascript
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

## Handling Routes

## Responding to GET Requests

To handle GET requests, we use the `app.get()` method. This method takes two arguments: the URL path and a callback function that handles the request and response.

```javascript
app.get('/', (req, res) => {
  res.send('<p>Homepage</p>');
});
```

In this example, when a GET request is made to the root URL (`/`), the server responds with a simple HTML message.

## Handling Multiple Routes

We can define multiple routes by chaining `app.get()` calls. For example, to handle requests to both the root URL and an "About" page:

```javascript
app.get('/', (req, res) => {
  res.send('<p>Homepage</p>');
});

app.get('/about', (req, res) => {
  res.send('<p>About Page</p>');
});
```

## Sending HTML Files

Instead of sending strings of HTML, we can send HTML files. First, ensure you have the required HTML files in your project directory. For instance, create `index.html` and `about.html` inside a `views` folder.

```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});
```

In the above example, `__dirname` refers to the directory of the currently executing script, ensuring that the paths to the HTML files are correct.

## Redirecting Requests

To redirect requests, use the `res.redirect()` method. For instance, to redirect requests from `/about-us` to `/about`:

```javascript
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});
```

## Handling 404 Errors

To handle 404 errors (i.e., requests to unknown routes), use the `app.use()` method. This method defines middleware that executes if no previous route handlers match the request.

```javascript
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});
```

The `app.use()` method without a path argument catches all requests that fall through the previous route handlers. We also set the status code to 404 to indicate a "Not Found" error.

## Complete Example

Here is a complete example of an Express application that handles multiple routes, redirects, and 404 errors:

```javascript
const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

In this example, we define three routes: the root URL, the "About" page, and a redirect from `/about-us` to `/about`. We also handle 404 errors by serving a custom 404 page.
