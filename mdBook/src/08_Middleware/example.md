# Example: Comprehensive Middleware Usage in an Express.js Application

## Step 1: Setting Up the Project

First, create a new directory for your project and initialize a new Node.js project.

```bash
mkdir express-middleware-example
cd express-middleware-example
npm init -y
```

## Step 2: Installing Required Packages

Install Express.js and Morgan (a third-party middleware for logging HTTP requests).

```bash
npm install express morgan
```

## Step 3: Creating the Server

Create a file named `server.js` and add the following code to set up the Express.js server and demonstrate middleware usage.

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Third-party middleware for logging requests
app.use(morgan('dev'));

// Custom middleware for logging request details
app.use((req, res, next) => {
    console.log(`Request Details - Method: ${req.method}, URL: ${req.url}`);
    next();
});

// Built-in middleware for serving static files
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

// 404 handler middleware
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

## Step 4: Adding Static Files

Create a directory named `public` in the root of your project. Inside this directory, create a file named `styles.css` with the following content:

```css
body {
    background-color: lightblue;
    font-family: Arial, sans-serif;
}
```

## Step 5: Testing the Application

To run the server, use the following command:

```bash
node server.js
```

Open a web browser and navigate to `http://localhost:3000/`. You should see the "Home Page" message. The console should log request details for each request made to the server.

If you navigate to `http://localhost:3000/about`, you should see the "About Page" message. Additionally, if you navigate to `http://localhost:3000/styles.css`, you should see the CSS content.

## Step 6: Demonstrating Middleware Flow

Modify the `server.js` file to add more custom middleware and demonstrate the flow of middleware execution.

```javascript
// Additional custom middleware
app.use((req, res, next) => {
    console.log('First custom middleware executed');
    next();
});

app.use((req, res, next) => {
    console.log('Second custom middleware executed');
    next();
});
```

Now, the console should log the execution of each middleware in the order they are defined when a request is made to the server.

## Complete Code: `server.js`

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Third-party middleware for logging requests
app.use(morgan('dev'));

// Custom middleware for logging request details
app.use((req, res, next) => {
    console.log(`Request Details - Method: ${req.method}, URL: ${req.url}`);
    next();
});

// Additional custom middleware
app.use((req, res, next) => {
    console.log('First custom middleware executed');
    next();
});

app.use((req, res, next) => {
    console.log('Second custom middleware executed');
    next();
});

// Built-in middleware for serving static files
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

// 404 handler middleware
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

By following these steps, you will have a comprehensive example of middleware usage in an Express.js application, demonstrating custom middleware, built-in middleware for static files, and third-party middleware for logging. This example provides a solid foundation for understanding how middleware works and how to use it effectively in your applications.