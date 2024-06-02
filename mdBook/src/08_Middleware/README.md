# Node.js - Middleware

In this tutorial, we will explore the concept of middleware in Express.js, a popular web application framework for Node.js. Middleware is a fundamental aspect of Express.js and understanding it is crucial for building robust and scalable applications.

## What is Middleware?

Middleware refers to any function that runs on the server between receiving a request and sending a response. These functions can perform various tasks such as logging, authentication, data parsing, and error handling. In Express.js, middleware functions have access to the request and response objects, and they can modify them as needed.

## Using Middleware in Express.js

The `app.use()` method is commonly used to apply middleware to an Express.js application. Middleware functions can be applied globally to all routes or specifically to certain routes.

```javascript
const express = require('express');
const app = express();

// Example of a simple middleware function
app.use((req, res, next) => {
    console.log('Middleware function executed');
    next(); // Pass control to the next middleware function
});

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In the example above, the middleware function logs a message to the console for every incoming request before passing control to the next middleware function or route handler using the `next()` function.

## Middleware Execution Order

Middleware functions are executed in the order they are defined in the code. This sequential execution is crucial because it allows you to control the flow of request handling and ensure that necessary operations are performed before sending a response.

```javascript
app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
    console.log('Second middleware');
    next();
});

app.get('/', (req, res) => {
    res.send('Home Page');
});
```

When a request is made to the root route (`/`), the console will log:

```
First middleware
Second middleware
```

## Creating Custom Middleware

Custom middleware functions can perform specific tasks, such as logging request details or handling errors.

### Logging Middleware

```javascript
app.use((req, res, next) => {
    console.log(`New request to: ${req.url}`);
    next();
});
```

### Error Handling Middleware

Error handling middleware is defined with four parameters: `err`, `req`, `res`, and `next`.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
```

## Built-in Middleware

Express.js includes several built-in middleware functions for common tasks.

### Static Middleware

The `express.static` middleware serves static files such as CSS, JavaScript, and images.

```javascript
app.use(express.static('public'));
```

In the example above, files in the `public` directory are served as static files. For instance, a file located at `public/styles.css` would be accessible at `http://localhost:3000/styles.css`.

## Third-Party Middleware

There are many third-party middleware libraries available for Express.js. One popular example is `morgan`, a HTTP request logger middleware.

### Installing Morgan

```bash
npm install morgan
```

### Using Morgan

```javascript
const morgan = require('morgan');
app.use(morgan('dev'));
```

The `dev` option configures Morgan to log requests in a concise format.

## Example: Comprehensive Middleware Usage

Let's create a comprehensive example that uses custom middleware, built-in middleware, and third-party middleware.

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware for logging requests
app.use(morgan('dev'));

// Custom middleware for logging request details
app.use((req, res, next) => {
    console.log(`Request Details - Method: ${req.method}, URL: ${req.url}`);
    next();
});

// Middleware for serving static files
app.use(express.static('public'));

// Route handlers
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example:
- Morgan logs request details.
- A custom middleware function logs additional request details.
- Static files are served from the `public` directory.
- Error handling middleware catches and handles errors.


